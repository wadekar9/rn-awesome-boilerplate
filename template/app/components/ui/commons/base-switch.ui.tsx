import React, { useRef, useEffect } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Animated
} from 'react-native';
import { moderateScale } from '$constants/styles.constants';
import { useAppTheme } from '$hooks/common';
import { Colors } from '$constants/colors.constants';
import { ITheme } from '$types/common.types';

interface BaseSwitchProps {
    value: boolean;
    onValueChange: (value: boolean) => void;
    disabled?: boolean;
}

const DEFAULT_DIMENSIONS = {
    width: moderateScale(70),
    height: moderateScale(40),
    radius: moderateScale(20),
    circleSize: moderateScale(32),
    circleRadius: moderateScale(100),
};

const BaseSwitch: React.FC<BaseSwitchProps> = ({
    value,
    onValueChange,
    disabled = false,
}) => {
    const { theme } = useAppTheme();
    const styles = createStyles(theme);

    const opacityAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
    const translateXAnim = useRef(new Animated.Value(value ? DEFAULT_DIMENSIONS.circleSize : 2)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacityAnim, {
                toValue: value ? 1 : 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(translateXAnim, {
                toValue: value ? DEFAULT_DIMENSIONS.circleSize : 2,
                duration: 200,
                useNativeDriver: false,
            }),
        ]).start();
    }, [value, opacityAnim, translateXAnim]);

    const handlePress = () => {
        if (!disabled) {
            onValueChange(!value);
        }
    };

    return (
        <TouchableOpacity
            activeOpacity={0.75}
            style={[styles.wrapper, disabled && styles.disabledWrapper]}
            onPress={handlePress}
            disabled={disabled}
        >
            <Animated.View style={[styles.background, { opacity: opacityAnim }]} />
            <Animated.View style={[styles.circle, { transform: [{ translateX: translateXAnim }] }]} />
        </TouchableOpacity>
    );
};

export default React.memo(BaseSwitch);

const createStyles = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        width: DEFAULT_DIMENSIONS.width,
        height: DEFAULT_DIMENSIONS.height,
        backgroundColor: Colors[theme].grey,
        borderRadius: DEFAULT_DIMENSIONS.radius,
        borderWidth: moderateScale(2),
        borderColor: Colors[theme].grey,
        overflow: 'hidden',
    },
    disabledWrapper: {
        opacity: 0.5,
    },
    background: {
        position: 'absolute',
        backgroundColor: Colors[theme].primary,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    circle: {
        height: DEFAULT_DIMENSIONS.circleSize,
        width: DEFAULT_DIMENSIONS.circleSize,
        backgroundColor: Colors[theme].white,
        borderRadius: DEFAULT_DIMENSIONS.circleRadius,
        marginVertical: 2,
        zIndex: 1,
    }
});