const palette = {
  black: '#000000',
  white: '#ffffff',
  transparent: 'rgba(0,0,0,0)',
  transparent25: 'rgba(0,0,0,0.25)',
  transparent50: 'rgba(0,0,0,0.50)',
  transparent75: 'rgba(0,0,0,0.75)',
  success: '#0F9D58',
  danger: '#DB4437',
  warning: '#F4B400',
  primary: '#4285F4',
  secondary: '#89D3DF',
  grey: '#737373',
} as const;

export const Colors = {
  light: {
    ...palette,
    text: palette.black,
    border: palette.grey,
    surface: palette.white,
    background: palette.white,
    icon: palette.black,
    shadow: palette.transparent25
  },
  dark: {
    ...palette,
    text: palette.white,
    border: palette.grey,
    surface: palette.black,
    background: palette.black,
    icon: palette.black,
    shadow: palette.white
  }
} as const;
