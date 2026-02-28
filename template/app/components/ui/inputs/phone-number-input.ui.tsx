import React from 'react';
import { View, Text, StyleSheet, TextInputProps } from 'react-native';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import PhoneInput from "react-native-phone-number-input";
import { removeCountryCode } from '$helpers/utils.helper';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import { ChevronDown } from 'lucide-react-native';

interface PhoneNumberInputRef {
    clear: () => void;
    blur: () => void;
    focus: () => void;
}

interface PhoneNumberInputProps extends Omit<TextInputProps, 'style' | 'editable' | 'multiline'> {
    countryCode: string;
    label?: string;
    error?: string;
    disabled?: boolean;
    onChangeFormattedText?: (text: string) => void;
}

const PhoneNumberInput = React.forwardRef<PhoneNumberInputRef, PhoneNumberInputProps>(({
    label,
    countryCode,
    error,
    disabled = false,
    ...props
}, ref) => {

    const { colors, theme } = useAppTheme();
    const styles = styling(theme);

    const inputRef = React.useRef<any>(null);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        clear: () => inputRef.current?.clear(),
        blur: () => inputRef.current?.blur(),
        focus: () => inputRef.current?.focus(),
    }), [])

    const handleFocus = React.useCallback((e: any) => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus(e);
    }, [props]);

    const handleBlur = React.useCallback((e: any) => {
        setIsFocused(false);
        if (props.onBlur) props.onBlur(e);
    }, [props]);

    const handleSubmitEditing = React.useCallback((e: any) => {
        if (!props.onSubmitEditing) {
            inputRef.current?.blur();
            return
        }
        props.onSubmitEditing(e);
    }, [props]);

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <PhoneInput
                ref={inputRef}
                defaultValue={props.value}
                defaultCode={countryCode as any || 'GB'}
                layout="first"
                onChangeText={props.onChangeText}
                onChangeFormattedText={props.onChangeFormattedText}
                withDarkTheme={theme == 'dark'}
                withShadow={false}
                autoFocus={false}
                placeholder={props.placeholder || "Enter Contact Number"}
                disabled={disabled}
                textInputProps={{
                    value: removeCountryCode(props.value || ''),
                    placeholderTextColor: colors.gray5,
                    editable: !disabled,
                    cursorColor: colors.primary,
                    onFocus: handleFocus,
                    onBlur: handleBlur,
                    onSubmitEditing: handleSubmitEditing,
                    keyboardType: 'number-pad',
                    returnKeyType: props.returnKeyType || 'done',
                    blurOnSubmit: props.blurOnSubmit || false,
                    autoFocus: false,
                    keyboardAppearance: theme,
                    multiline: false,
                    numberOfLines: 1
                }}
                containerStyle={[styles.containerWrapper, { opacity: disabled ? 0.6 : 1 }, isFocused && { borderColor: colors.primary }]}
                textContainerStyle={{ height: moderateScale(50), backgroundColor: COLORS[theme].background }}
                codeTextStyle={{
                    fontFamily: EFonts.REGULAR,
                    fontSize: EFontSize.XL,
                    color: COLORS[theme].text3
                }}
                textInputStyle={{
                    flex: 1,
                    height: '100%',
                    fontFamily: EFonts.REGULAR,
                    fontSize: EFontSize.XL,
                    color: COLORS[theme].text3,
                    backgroundColor: COLORS[theme].background
                }}
                flagButtonStyle={{
                    borderRightWidth: moderateScale(1.5),
                    borderRightColor: COLORS[theme].border
                }}
                renderDropdownImage={() => (
                    <View style={{ height: '100%', justifyContent: 'center' }}>
                        <ChevronDown width={moderateScale(12)} height={moderateScale(7)} color={colors.text3} />
                    </View>
                )}
            />

            {error && (
                <View style={styles.errorContainer}>
                    <Text numberOfLines={3} style={styles.errorText}>{error}</Text>
                </View>
            )}
        </View>
    );
});

export default React.memo(PhoneNumberInput);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    label: {
        color: COLORS[theme].text,
        fontFamily: EFonts.BOLD,
        fontSize: EFontSize.BASE,
        textAlign: 'left',
        letterSpacing: 0.25,
        marginBottom: moderateScale(8),
    },
    containerWrapper: {
        borderWidth: moderateScale(1.5),
        borderRadius: moderateScale(6),
        backgroundColor: COLORS[theme].background,
        borderColor: COLORS[theme].border,
        height: moderateScale(50),
        overflow: 'hidden',
        padding: 0,
        width: '100%'
    },
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        height: moderateScale(50),
    },
    textInput: {
        flex: 1,
        height: '100%',
        fontFamily: EFonts.REGULAR,
        fontSize: EFontSize.XL,
        color: COLORS[theme].text,
    },
    errorContainer: {
        marginTop: moderateScale(8),
    },
    errorText: {
        fontFamily: EFonts.REGULAR,
        fontSize: EFontSize.SM,
        color: COLORS[theme].red,
        flexWrap: 'wrap',
    },
    icon: {
        height: moderateScale(50),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
});
