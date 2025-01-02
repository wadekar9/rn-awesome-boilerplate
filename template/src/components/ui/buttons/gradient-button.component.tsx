import { StyleProp, StyleSheet, Text, TextStyle, ViewStyle, Pressable, PressableProps, PressableStateCallbackType } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '$constants/colors.constants';
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';

interface GradientButtonProps extends PressableProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  RightAccessory?: React.ReactNode;
  LeftAccessory?: React.ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  label,
  labelStyle,
  containerStyle,
  disabled,
  RightAccessory,
  LeftAccessory,
  ...props
}) => {

  function $wrapperStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      styles.wrapper,
      !!pressed && { opacity: 0.85 },
      !!disabled && { opacity: 0.5 }
    ]
  }

  return (
    <Pressable
      {...props}
      accessibilityRole='button'
      role='button'
      disabled={disabled}
      style={$wrapperStyle}
    >
      <LinearGradient
        colors={[Colors.dark.primary, Colors.dark.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.container, containerStyle]}
      >
        {!!LeftAccessory && LeftAccessory}
        <Text style={[styles.label, labelStyle]}>{label}</Text>
        {!!RightAccessory && RightAccessory}
      </LinearGradient>
    </Pressable>
  )
}

export default React.memo(GradientButton);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%'
  },
  container: {
    width: '100%',
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: moderateScale(5),
    gap: moderateScale(10)
  },
  label: {
    fontFamily: EFonts.MEDIUM,
    fontSize: EFontSize.LG,
    color: Colors.light.white,
    textTransform: 'capitalize'
  }
})