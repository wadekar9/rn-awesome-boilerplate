import { StyleSheet, TextInput, View, TextInputProps, StyleProp, ViewStyle } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { COLORS } from '$constants/colors.constants'
import { useAppTheme, useDebounce } from '$hooks/common';
import { Search, X } from 'lucide-react-native';
import { ITheme } from '$types/common.types';
import { IconButton } from '../buttons';

interface BaseSearchbarRef {
    clear: () => void;
    blur: () => void;
    focus: () => void;
}

interface BaseSearchbarProps extends Omit<TextInputProps, 'style' | 'editable' | 'multiline' | 'onChange'> {
    value?: string;
    onChange?: (e: string) => void;
    disabled?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
}

const BaseSearchbar = React.forwardRef<BaseSearchbarRef, BaseSearchbarProps>(({
    value,
    onChange,
    disabled = false,
    containerStyle,
    autoComplete = 'off',
    autoCorrect = false,
    clearButtonMode = 'while-editing',
    placeholder = 'Search...',
    returnKeyType = 'search',
    ...props
}, ref) => {

    const { theme, colors } = useAppTheme();
    const styles = styling(theme);

    const inputRef = React.useRef<TextInput>(null);

    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState(value || '');
    const debouncedSearch = useDebounce(search);

    React.useImperativeHandle(ref, () => ({
        clear: () => {
            inputRef.current?.clear();
            setSearch('');
        },
        blur: () => inputRef.current?.blur(),
        focus: () => inputRef.current?.focus()
    }), [])

    React.useEffect(() => {
        onChange && onChange(debouncedSearch)
    }, [debouncedSearch])

    const handleClear = () => {
        setSearch('');
        inputRef.current?.focus();
    }

    return (
        <View style={[styles.container, isFocused && { borderColor: colors['brand-primary'] }, containerStyle]}>
            <View style={styles.icon}>
                <Search width={moderateScale(24)} height={moderateScale(24)} color={colors['icon-default']} />
            </View>
            <View style={{ flex: 1, height: '100%' }}>
                <TextInput
                    {...props}
                    ref={inputRef}
                    value={search}
                    onChangeText={setSearch}
                    placeholder={placeholder}
                    placeholderTextColor={colors['text-muted']}
                    style={styles.input}
                    returnKeyType={returnKeyType}
                    blurOnSubmit
                    numberOfLines={1}
                    editable={!disabled}
                    multiline={false}
                    autoCorrect={autoCorrect}
                    autoComplete={autoComplete}
                    clearButtonMode={clearButtonMode}
                    keyboardAppearance={theme}
                    cursorColor={colors['brand-primary']}
                    selectionColor={colors['brand-primary']}
                    importantForAutofill="no"
                    onFocus={(e) => {
                        setIsFocused(true);
                        props.onFocus?.(e);
                    }}
                    onBlur={(e) => {
                        setIsFocused(false);
                        props.onBlur?.(e);
                    }}
                />
            </View>
            {search.length > 0 && (
                <IconButton
                    onPress={handleClear}
                    style={styles.icon}
                    accessibilityLabel="Clear search"
                >
                    <X width={moderateScale(20)} height={moderateScale(20)} color={colors['icon-default']} />
                </IconButton>
            )}
        </View>
    )
})

export default React.memo(BaseSearchbar)

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        width: '100%',
        height: moderateScale(50),
        borderRadius: moderateScale(8),
        backgroundColor: COLORS[theme]['surface-alt'],
        paddingLeft: moderateScale(12),
        gap: moderateScale(10),
        borderWidth: moderateScale(1),
        borderColor: COLORS[theme].border,
        flexDirection: 'row',
        alignItems: 'stretch',
        overflow: 'hidden'
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(4)
    },
    input: {
        flex: 1,
        padding: 0,
        fontFamily: EFonts.REGULAR,
        fontSize: EFontSize.LG,
        color: COLORS[theme]['text-primary'],
        height: '100%'
    }
})