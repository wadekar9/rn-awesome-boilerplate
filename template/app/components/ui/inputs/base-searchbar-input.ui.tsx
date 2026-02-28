import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { COLORS } from '$constants/colors.constants'
import { useAppTheme, useDebounce } from '$hooks/common';
import { Search } from 'lucide-react-native';
import { ITheme } from '$types/common.types';

interface BaseSearchbarRef {
    clear: () => void;
    blur: () => void;
    focus: () => void;
}

interface BaseSearchbarProps {
    value?: string;
    onChange?: (e: string) => void;
    disabled?: boolean;
}

const BaseSearchbar = React.forwardRef<BaseSearchbarRef, BaseSearchbarProps>((props, ref) => {

    const { theme, colors } = useAppTheme();
    const styles = styling(theme);

    const inputRef = React.useRef<TextInput>(null);

    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const [search, setSearch] = React.useState(props.value || '');
    const debouncedSearch = useDebounce(search);

    React.useImperativeHandle(ref, () => ({
        clear: () => inputRef.current?.clear(),
        blur: () => inputRef.current?.blur(),
        focus: () => inputRef.current?.focus()
    }), [])

    React.useEffect(() => {
        props.onChange && props.onChange(debouncedSearch)
    }, [debouncedSearch])

    return (
        <View style={[styles.container, isFocused && { borderColor: colors['brand-primary'] }]}>
            <View style={styles.icon}>
                <Search width={moderateScale(24)} height={moderateScale(24)} color={colors['icon-default']} />
            </View>
            <View style={{ flex: 1, height: '100%' }}>
                <TextInput
                    ref={inputRef}
                    value={search}
                    onChangeText={setSearch}
                    placeholder='Search....'
                    placeholderTextColor={colors['text-muted']}
                    style={styles.input}
                    returnKeyType={'search'}
                    returnKeyLabel={'Search'}
                    blurOnSubmit
                    numberOfLines={1}
                    editable={!props.disabled}
                    multiline={false}
                    autoCorrect
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                />
            </View>
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
        paddingHorizontal: moderateScale(12),
        gap: moderateScale(10),
        borderWidth: moderateScale(1),
        borderColor: COLORS[theme].border,
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    icon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        fontFamily: EFonts.REGULAR,
        fontSize: EFontSize.LG,
        color: COLORS[theme]['text-primary'],
        height: '100%'
    }
})