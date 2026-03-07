import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { EFonts, EFontSize } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import { ThemeText } from '../themed';

interface TextButtonProps extends TouchableOpacityProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}

const TextButton: React.FC<TextButtonProps> = ({
  label = 'text-button',
  labelStyle,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      {...props}
      accessibilityRole={props.accessibilityRole || 'button'}
      role={props.role || 'button'}
      accessibilityState={{ ...props.accessibilityState, disabled: !!disabled }}
      disabled={disabled}
    >
      <ThemeText numberOfLines={1} style={[styles.label, labelStyle]}>{label}</ThemeText>
    </TouchableOpacity>
  )
}

export default React.memo(TextButton);

const styles = StyleSheet.create({
  label: {
    fontFamily: EFonts.MEDIUM,
    fontSize: EFontSize.BASE,
    color: COLORS.light['brand-primary'],
    textDecorationLine: 'underline'
  }
})