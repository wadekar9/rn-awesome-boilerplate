import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { Colors } from '$constants/colors.constants'
import { useAppTheme, useDebounce } from '$hooks/common';
import { SearchOutlineIcon } from '$assets/icons';
import { ITheme } from '$types/common';

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
        <View style={[styles.container, isFocused && { borderColor: colors.primary }]}>
            <View style={styles.icon}>
                <SearchOutlineIcon width={moderateScale(24)} height={moderateScale(24)} />
            </View>
            <View style={{ flex: 1, height: '100%' }}>
                <TextInput
                    ref={inputRef}
                    value={search}
                    onChangeText={setSearch}
                    placeholder='Search....'
                    placeholderTextColor={colors.grey}
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
        backgroundColor: Colors[theme].surface,
        paddingHorizontal: moderateScale(12),
        gap: moderateScale(10),
        borderWidth: moderateScale(1),
        borderColor: Colors[theme].border,
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
        color: Colors[theme].text,
        height: '100%'
    }
})