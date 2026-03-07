import { typography, TypographyVariant } from '$styles/typography';
import React from 'react';
import { Text, TextStyle, StyleProp, TextProps } from 'react-native';
import { useAppTheme } from '$hooks/common';
import { COLORS } from '$constants/colors.constants';

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
  const { theme } = useAppTheme();
  return (
    <Text
      accessible={true}
      numberOfLines={1}
      {...props}
      style={[{ color: COLORS[theme]['text-primary'] }, typography[variant], style]}
    >
      {children}
    </Text>
  );
};

export default ThemeText;