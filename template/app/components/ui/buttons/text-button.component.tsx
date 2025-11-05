import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native'
import React from 'react'
import { EFonts, EFontSize } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';

interface TextButtonProps {
  disabled?: boolean;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({
  label = 'text-button',
  labelStyle,
  disabled,
  onPress
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.65}
      accessibilityRole={'button'}
      role={'button'}
      disabled={disabled}
      onPress={onPress}
    >
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default React.memo(TextButton);

const styles = StyleSheet.create({
  label : {
    fontFamily : EFonts.MEDIUM,
    fontSize : EFontSize.BASE,
    color : COLORS.light.primary,
    textDecorationLine : 'underline'
  }
})