import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { Colors } from '$constants/colors.constants';
import { useAppTheme } from '$hooks/common';
import { IndianFlagIcon } from '$assets/icons';
import { ITheme } from '$types/common';
import { IconButton } from '../buttons';
import MaskInput, { MaskInputProps, Masks } from 'react-native-mask-input';

interface PhoneNumberInputRef {
    clear: () => void;
    blur: () => void;
    focus: () => void;
}

interface PhoneNumberInputProps extends Omit<MaskInputProps, 'style' | 'editable' | 'multiline'> {
    label?: string;
    error?: string;
    disabled?: boolean;
}

const PhoneNumberInput = React.forwardRef<PhoneNumberInputRef, PhoneNumberInputProps>(({
    label,
    secureTextEntry,
    error,
    disabled = false,
    ...props
}, ref) => {

    const { colors, theme } = useAppTheme();
    const styles = styling(theme);

    const inputRef = React.useRef<TextInput>(null);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        clear: () => null,
        blur: () => null,
        focus: () => null,
    }), [])

    const handleFocus = React.useCallback((e: any) => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus(e);
    }, [props]);

    const handleBlur = React.useCallback((e: any) => {
        setIsFocused(false);
        if (props.onBlur) props.onBlur(e);
    }, [props]);

    const handleSubmitEditing = React.useCallback((e : any) => {
        if (!props.onSubmitEditing){
            inputRef.current?.blur();
            return
        }
        props.onSubmitEditing(e);
    }, [props]);

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.containerWrapper, { opacity: disabled ? 0.6 : 1 }, isFocused && { borderColor: colors.primary }]}>
                <View style={[styles.container]}>
                    <IconButton style={styles.icon}>
                      <IndianFlagIcon />
                    </IconButton>
                    <MaskInput
                        {...props}
                        ref={inputRef}
                        numberOfLines={1}
                        multiline={false}
                        style={styles.textInput}
                        placeholder={props.placeholder || "Enter Contact Number"}
                        placeholderTextColor={colors.grey}
                        cursorColor={colors.primary}
                        secureTextEntry={false}
                        editable={!disabled}
                        keyboardAppearance={theme}
                        keyboardType={'number-pad'}
                        returnKeyType={props.returnKeyType || 'done'}
                        blurOnSubmit={props.blurOnSubmit || false}
                        maxLength={props.maxLength || 14}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onSubmitEditing={handleSubmitEditing}
                        mask={Masks.USA_PHONE}
                    />
                </View>
            </View>
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
        color: Colors[theme].text,
        fontFamily: EFonts.REGULAR,
        textAlign: 'left',
        marginBottom: moderateScale(4)
    },
    containerWrapper: {
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(8),
        borderColor: Colors[theme].border,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        height: moderateScale(50),
        gap : moderateScale(5),
        paddingRight : moderateScale(15)
    },
    textInput: {
        flex: 1,
        height: '100%',
        fontFamily: EFonts.REGULAR,
        fontSize: EFontSize.XL,
        color: Colors[theme].text
    },
    errorContainer: {
        marginTop: moderateScale(8),
    },
    errorText: {
        fontFamily: EFonts.REGULAR,
        fontSize: moderateScale(13),
        color: Colors[theme].primary,
        flexWrap: 'wrap',
    },
    icon: {
        height: moderateScale(50),
        paddingHorizontal: moderateScale(12),
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch'
    }
});