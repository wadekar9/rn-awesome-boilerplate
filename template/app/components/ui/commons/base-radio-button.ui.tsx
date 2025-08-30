import { StyleSheet, Text, TouchableOpacity, Animated, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { EFonts, moderateScale } from '$constants/styles.constants';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common';
import { Colors } from '$constants/colors.constants';

interface BaseRadioButtonProps {
  value: boolean;
  onValueChange: (e: boolean) => void;
  disabled?: boolean;
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
  onValueChange
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
      style={[styles.wrapper, disabled && { opacity: 0.7 }]}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
    >
      <Animated.View
        style={[styles.container, { opacity }]}
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
    >
      <BaseRadioButton {...props} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default React.memo(BaseRadioButton);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderWidth: moderateScale(2),
    borderColor: Colors[theme].primary,
    borderRadius: moderateScale(11),
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: moderateScale(12),
    height: moderateScale(12),
    backgroundColor: Colors[theme].primary,
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
    color: Colors[theme].text,
    fontSize: moderateScale(14)
  }
})