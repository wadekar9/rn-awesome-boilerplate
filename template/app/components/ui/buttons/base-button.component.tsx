import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import { EFonts, moderateScale } from '$constants/styles.constants'
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';

interface BaseButtonProps extends PressableProps {
  theme?: ITheme;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  RightAccessory?: React.ReactNode;
  LeftAccessory?: React.ReactNode;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  theme = 'light',
  label = 'Button Text',
  labelStyle,
  containerStyle,
  RightAccessory,
  LeftAccessory,
  disabled,
  ...props
}) => {

  const styles = styling(theme);

  function $wrapperStyle({ pressed }: PressableStateCallbackType): StyleProp<ViewStyle> {
    return [
      styles.wrapper,
      !!pressed && { opacity: 0.85 },
      !!disabled && { opacity: 0.5 },
      containerStyle
    ]
  }

  return (
    <Pressable
      {...props}
      role='button'
      accessibilityRole='button'
      style={$wrapperStyle}
    >
      {!!LeftAccessory && LeftAccessory}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      {!!RightAccessory && RightAccessory}
    </Pressable>
  )
}

export default React.memo(BaseButton);

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
    backgroundColor: COLORS[theme].primary
  },
  label: {
    fontFamily: EFonts.MEDIUM,
    fontSize: moderateScale(15),
    color: COLORS[theme].white,
    textTransform: 'capitalize'
  }
})