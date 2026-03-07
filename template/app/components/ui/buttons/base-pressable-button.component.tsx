import { Animated, Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { ITheme } from '$types/common.types';
import { EFonts, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';

interface BasePressableButtonProps extends PressableProps {
    theme?: ITheme;
    label: string;
    labelStyle?: StyleProp<TextStyle>;
    containerStyle?: StyleProp<ViewStyle>;
    RightAccessory?: React.ReactNode;
    LeftAccessory?: React.ReactNode;
    outline?: boolean;
}

const BasePressableButton: React.FC<BasePressableButtonProps> = ({
    theme = 'light',
    label,
    labelStyle,
    containerStyle,
    RightAccessory,
    LeftAccessory,
    disabled,
    outline = false,
    ...props
}) => {

    const styles = styling(theme);
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = (e: any) => {
        Animated.timing(scaleAnim, {
            toValue: 0.95,
            duration: 100,
            useNativeDriver: true,
        }).start();
        if (props.onPressIn) props.onPressIn(e);
    };

    const handlePressOut = (e: any) => {
        Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
        if (props.onPressOut) props.onPressOut(e);
    };

    return (
        <Animated.View style={[{ transform: [{ scale: scaleAnim }], width: '100%' }, containerStyle]}>
            <Pressable
                {...props}
                disabled={disabled}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[
                    styles.wrapper,
                    outline && styles.outlineWrapper,
                    disabled && { opacity: 0.5 }
                ]}
                accessibilityRole={props.accessibilityRole || "button"}
                accessibilityState={{ ...props.accessibilityState, disabled: !!disabled }}
            >
                {!!LeftAccessory && LeftAccessory}
                <Text style={[styles.label, outline && styles.outlineLabel, labelStyle]}>{label}</Text>
                {!!RightAccessory && RightAccessory}
            </Pressable>
        </Animated.View>
    )
}

export default React.memo(BasePressableButton);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        width: '100%',
        height: moderateScale(50),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: moderateScale(5),
        gap: moderateScale(10),
        backgroundColor: COLORS[theme]['brand-primary']
    },
    outlineWrapper: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS[theme]['brand-primary']
    },
    label: {
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(15),
        color: COLORS[theme].surface,
        textTransform: 'capitalize'
    },
    outlineLabel: {
        color: COLORS[theme]['brand-primary']
    }
})  