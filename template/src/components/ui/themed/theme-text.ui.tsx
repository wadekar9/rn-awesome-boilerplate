import { typography, TypographyVariant } from '$styles/typography';
import React from 'react';
import { Text, TextStyle, StyleProp, TextProps } from 'react-native';

interface ThemeTextProps extends Omit<TextProps, 'style'> {
  variant?: TypographyVariant;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

const ThemeText: React.FC<ThemeTextProps> = ({ 
  variant = 'body1',
  style,
  children,
  ...props 
}) => {
  return (
    <Text
      {...props}
      style={[typography[variant], style]}
    >
      {children}
    </Text>
  );
};

export default ThemeText;