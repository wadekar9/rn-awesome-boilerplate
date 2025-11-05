import { COLORS } from '$constants/colors.constants';
import { EFonts, EFontSize } from '$constants/styles.constants';
import { TextStyle } from 'react-native';

const baseTextStyles: TextStyle = {
  color: COLORS.light.text,
  fontSize: EFontSize.BASE,
  fontFamily: EFonts.REGULAR
};

export const typography = {
  h1: {
    ...baseTextStyles,
    fontSize: EFontSize['3XL'],
    fontFamily: EFonts.BOLD
  },
  h2: {
    ...baseTextStyles,
    fontSize: EFontSize['2XL'],
    fontFamily: EFonts.SEMI_BOLD
  },
  h3: {
    ...baseTextStyles,
    fontSize: EFontSize['2XL'],
    fontFamily: EFonts.MEDIUM
  },
  h4: {
    ...baseTextStyles,
    fontSize: EFontSize.XL,
    fontFamily: EFonts.SEMI_BOLD
  },
  h5: {
    ...baseTextStyles,
    fontSize: EFontSize.XL,
    fontFamily: EFonts.MEDIUM
  },

  body1: {
    ...baseTextStyles,
    fontSize: EFontSize.XL,
    fontFamily: EFonts.SEMI_BOLD
  },
  body2: {
    ...baseTextStyles,
    fontSize: EFontSize.XL,
    fontFamily: EFonts.MEDIUM
  },
  body3: {
    ...baseTextStyles,
    fontSize: EFontSize.LG,
    fontFamily: EFonts.MEDIUM
  },
  body4: {
    ...baseTextStyles,
    fontFamily: EFonts.MEDIUM
  },
  body5: {
    ...baseTextStyles,
    fontSize: EFontSize.SM
  },
}

export type TypographyVariant = keyof typeof typography;