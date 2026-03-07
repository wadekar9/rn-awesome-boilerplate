import { StyleSheet, TouchableOpacity, Animated, StyleProp, TextStyle, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { EFonts, moderateScale } from '$constants/styles.constants';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import { ThemeText } from '../themed';

interface BaseRadioButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  value: boolean;
  onValueChange: (e: boolean) => void;
  size?: number;
}

interface BaseLabelRadioButtonProps extends BaseRadioButtonProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}

const BaseRadioButton: React.FC<BaseRadioButtonProps> = ({
  disabled = false,
  size = 22,
  value,
  onValueChange,
  ...props
}) => {

  const { theme } = useAppTheme();
  const styles = styling(theme);

  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [value]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      {...props}
      style={[
        styles.wrapper,
        disabled && { opacity: 0.7 },
        { width: moderateScale(size), height: moderateScale(size), borderRadius: moderateScale(size / 2) }
      ]}
      onPress={(e) => {
        onValueChange(!value);
        if (props.onPress) props.onPress(e);
      }}
      disabled={disabled}
      accessibilityRole={props.accessibilityRole || "radio"}
      accessibilityState={{ ...props.accessibilityState, checked: value, disabled }}
    >
      <Animated.View
        style={[
          styles.container,
          { opacity, width: moderateScale(size / 1.8), height: moderateScale(size / 1.8) }
        ]}
      />
    </TouchableOpacity>
  )
}

export const BaseLabelRadioButton: React.FC<BaseLabelRadioButtonProps> = ({
  label,
  ...props
}) => {

  const { theme } = useAppTheme();
  const styles = styling(theme);

  return (
    <TouchableOpacity
      style={[styles.flexWrapper, props.disabled && { opacity: 0.7 }]}
      activeOpacity={0.7}
      onPress={() => props.onValueChange(!props.value)}
      disabled={props.disabled}
      accessibilityRole="radio"
      accessibilityState={{ checked: props.value, disabled: props.disabled }}
      accessibilityLabel={label}
    >
      <View pointerEvents="none">
        <BaseRadioButton {...props} />
      </View>
      <ThemeText style={[styles.label, props.labelStyle]}>{label}</ThemeText>
    </TouchableOpacity>
  )
}

export default React.memo(BaseRadioButton);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderWidth: moderateScale(2),
    borderColor: COLORS[theme]['brand-primary'],
    borderRadius: moderateScale(11),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: moderateScale(12),
    height: moderateScale(12),
    backgroundColor: COLORS[theme]['brand-primary'],
    borderRadius: moderateScale(100),
  },
  flexWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10)
  },
  label: {
    fontFamily: EFonts.MEDIUM,
    textTransform: 'capitalize',
    color: COLORS[theme]['text-primary'],
    fontSize: moderateScale(14)
  }
})