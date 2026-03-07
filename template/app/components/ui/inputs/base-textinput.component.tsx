import React from 'react';
import { View, TextInput, TextInputProps, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import { useAppTheme } from '$hooks/common';
import { EyeOff, Eye } from 'lucide-react-native';
import { ITheme } from '$types/common.types';
import IconButton from '../buttons/icon-button.component';
import ThemeText from '../themed/theme-text.component';

interface BaseTextInputRef {
    clear: () => void;
    blur: () => void;
    focus: () => void;
}

interface BaseTextInputProps extends Omit<TextInputProps, 'style' | 'editable' | 'multiline'> {
    label?: string;
    error?: string;
    disabled?: boolean;
    RightAccessory?: React.ReactNode;
    LeftAccessory?: React.ReactNode;
}

const BaseTextInput = React.forwardRef<BaseTextInputRef, BaseTextInputProps>(({
    label,
    secureTextEntry,
    error,
    disabled = false,
    RightAccessory,
    LeftAccessory,
    autoComplete = 'off',
    autoCapitalize = 'none',
    spellCheck = false,
    passwordRules,
    textContentType = 'none',
    importantForAutofill = 'auto',
    selectionColor,
    clearButtonMode = 'never',
    accessible = true,
    accessibilityLabel,
    accessibilityHint,
    placeholder,
    returnKeyType = 'done',
    blurOnSubmit = true,
    ...props
}, ref) => {

    const { colors, theme } = useAppTheme();
    const styles = styling(theme);

    const inputRef = React.useRef<TextInput>(null);

    const [isSecure, setIsSecure] = React.useState<boolean>(secureTextEntry || false);
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

    const $EXTRA_STYLES = React.useMemo((): StyleProp<ViewStyle> => {
        const hasLeft = !!LeftAccessory;
        const hasRight = !!RightAccessory || secureTextEntry;

        if (!hasLeft && !hasRight) {
            return { paddingHorizontal: moderateScale(12) }
        } else if (!hasLeft && hasRight) {
            return { paddingLeft: moderateScale(12), paddingRight: 0 }
        } else if (hasLeft && !hasRight) {
            return { paddingRight: moderateScale(12), paddingLeft: 0 }
        } else {
            return { paddingHorizontal: 0 }
        }
    }, [LeftAccessory, RightAccessory, secureTextEntry])

    return (
        <View style={styles.wrapper}>
            {label && <ThemeText style={styles.label}>{label}</ThemeText>}
            <View
                style={[styles.containerWrapper, { opacity: disabled ? 0.6 : 1 }, isFocused && { borderColor: colors['brand-primary'] }]}
                accessible={accessible}
                accessibilityLabel={accessibilityLabel || label}
                accessibilityHint={accessibilityHint}
            >
                <View style={[styles.container, $EXTRA_STYLES]}>
                    {!!LeftAccessory && (<View style={styles.icon}>{LeftAccessory}</View>)}
                    <TextInput
                        {...props}
                        ref={inputRef}
                        numberOfLines={1}
                        multiline={false}
                        style={styles.textInput}
                        placeholder={placeholder}
                        placeholderTextColor={colors['text-muted']}
                        secureTextEntry={isSecure}
                        cursorColor={colors['brand-primary']}
                        selectionColor={selectionColor || colors['brand-primary']}
                        editable={!disabled}
                        keyboardAppearance={theme}
                        returnKeyType={returnKeyType || 'done'}
                        blurOnSubmit={blurOnSubmit}
                        autoComplete={autoComplete}
                        autoCapitalize={autoCapitalize}
                        spellCheck={spellCheck}
                        importantForAutofill={importantForAutofill}
                        clearButtonMode={clearButtonMode}
                        passwordRules={passwordRules}
                        textContentType={(() => {
                            if (textContentType) return textContentType;
                            if (!autoComplete) return 'none';

                            // Map autoComplete to textContentType for iOS
                            const mapping: Record<string, any> = {
                                'given-name': 'givenName',
                                'family-name': 'familyName',
                                'email': 'emailAddress',
                                'tel': 'telephoneNumber',
                                'address-line1': 'streetAddressLine1',
                                'address-line2': 'streetAddressLine2',
                                'postal-code': 'postalCode',
                                'postal-address-locality': 'addressCity',
                                'city': 'addressCity',
                                'username': 'username',
                                'password': 'password',
                                'current-password': 'password',
                                'password-current': 'password',
                                'new-password': 'newPassword',
                                'password-new': 'newPassword',
                                'one-time-code': 'oneTimeCode',
                                'organization': 'organizationName',
                            };
                            return mapping[autoComplete] || 'none';
                        })()}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onSubmitEditing={handleSubmitEditing}
                    />
                    {secureTextEntry && (
                        <IconButton
                            style={styles.icon}
                            onPress={() => setIsSecure(prev => !prev)}
                            accessibilityLabel={isSecure ? 'Show password' : 'Hide password'}
                        >
                            {!isSecure ? (
                                <Eye height={moderateScale(22)} width={moderateScale(22)} color={colors['icon-default']} />
                            ) : (
                                <EyeOff height={moderateScale(22)} width={moderateScale(22)} color={colors['icon-default']} />
                            )}
                        </IconButton>
                    )}
                    {!!RightAccessory && (<View style={styles.icon}>{RightAccessory}</View>)}
                </View>
            </View>
            {error && (
                <View style={styles.errorContainer}>
                    <ThemeText numberOfLines={3} style={styles.errorText} accessibilityRole="alert">{error}</ThemeText>
                </View>
            )}
        </View>
    );
});

export default React.memo(BaseTextInput);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        width: '100%',
    },
    label: {
        color: COLORS[theme]['text-primary'],
        fontFamily: EFonts.REGULAR,
        textAlign: 'left',
        marginBottom: moderateScale(4)
    },
    containerWrapper: {
        borderWidth: moderateScale(1),
        borderRadius: moderateScale(8),
        borderColor: COLORS[theme].border,
        overflow: 'hidden',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'stretch',
        height: moderateScale(50)
    },
    textInput: {
        flex: 1,
        height: '100%',
        padding: 0,
        fontFamily: EFonts.REGULAR,
        fontSize: EFontSize.XL,
        color: COLORS[theme]['text-primary']
    },
    errorContainer: {
        marginTop: moderateScale(8),
    },
    errorText: {
        fontFamily: EFonts.REGULAR,
        fontSize: moderateScale(13),
        color: COLORS[theme]['state-danger'],
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