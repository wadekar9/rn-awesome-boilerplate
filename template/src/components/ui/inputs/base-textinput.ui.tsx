import React, { forwardRef, useState, useCallback, useMemo, useRef } from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { Colors } from '$constants/colors.constants';
import { useAppTheme } from '$hooks/common';
import { EyeOffOutlineIcon, EyeOutlineIcon } from '$assets/icons';
import { ITheme } from '$types/common';
import { IconButton } from '../buttons';

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

const BaseTextInput = forwardRef<BaseTextInputRef, BaseTextInputProps>(({
    label,
    secureTextEntry,
    error,
    disabled = false,
    RightAccessory,
    LeftAccessory,
    ...props
}, ref) => {

    const { colors, theme } = useAppTheme();
    const styles = styling(theme);

    const inputRef = useRef<TextInput>(null);

    const [isSecure, setIsSecure] = useState<boolean>(secureTextEntry || false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    React.useImperativeHandle(ref, () => ({
        clear: () => null,
        blur: () => null,
        focus: () => null,
    }), [])

    const handleFocus = useCallback((e: any) => {
        setIsFocused(true);
        if (props.onFocus) props.onFocus(e);
    }, [props]);

    const handleBlur = useCallback((e: any) => {
        setIsFocused(false);
        if (props.onBlur) props.onBlur(e);
    }, [props]);

    const handleSubmitEditing = useCallback((e : any) => {
        if (!props.onSubmitEditing){
            inputRef.current?.blur();
            return
        }
        props.onSubmitEditing(e);
    }, [props]);

    const $EXTRA_STYLES = useMemo((): StyleProp<ViewStyle> => {
        if (!!!LeftAccessory && !!!RightAccessory) {
            return { paddingHorizontal: moderateScale(12) }
        } else if (!LeftAccessory) {
            return { paddingLeft: moderateScale(12) }
        } else if (!RightAccessory || !secureTextEntry) {
            return { paddingRight: moderateScale(12) }
        }
    }, [LeftAccessory, RightAccessory, secureTextEntry])

    return (
        <View style={styles.wrapper}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.containerWrapper, { opacity: disabled ? 0.6 : 1 }, isFocused && { borderColor: colors.primary }]}>
                <View style={[styles.container, $EXTRA_STYLES]}>
                    {!!LeftAccessory && (<View style={styles.icon}>{LeftAccessory}</View>)}
                    <TextInput
                        {...props}
                        ref={inputRef}
                        numberOfLines={1}
                        multiline={false}
                        style={styles.textInput}
                        placeholder={props.placeholder || "Type Something here..."}
                        placeholderTextColor={colors.grey}
                        secureTextEntry={isSecure}
                        cursorColor={colors.primary}
                        editable={!disabled}
                        keyboardAppearance={theme}
                        returnKeyType={props.returnKeyType || 'done'}
                        blurOnSubmit={props.blurOnSubmit || false}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        onSubmitEditing={handleSubmitEditing}
                    />
                    {secureTextEntry && (
                        <IconButton
                            style={styles.icon}
                            onPress={() => setIsSecure(prev => !prev)}
                        >
                            {!isSecure ? (
                                <EyeOutlineIcon height={moderateScale(22)} width={moderateScale(22)} />
                            ) : (
                                <EyeOffOutlineIcon height={moderateScale(22)} width={moderateScale(22)} />
                            )}
                        </IconButton>
                    )}
                    {!!RightAccessory && (<View style={styles.icon}>{RightAccessory}</View>)}
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

export default React.memo(BaseTextInput);

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
        alignItems: 'center',
        height: moderateScale(50)
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
        alignSelf: 'stretch',
        backgroundColor: 'red'
    }
});