const palette = {
  black: '#000000',
  white: '#ffffff',
  transparent: 'rgba(0,0,0,0)',
  transparent25: 'rgba(0,0,0,0.25)',
  transparent50: 'rgba(0,0,0,0.50)',
  transparent75: 'rgba(0,0,0,0.75)',
  red: '#FF3B30',  // Errors & Alerts
  orange: '#FF9500',  // Warnings
  yellow: '#FFCC00',  // Notifications
  green: '#34C759',  // Success
  indigo: '#4B55A1',  // Alternative Accent
  purple: '#9141AC',  // Encryption Highlights
  pink: '#FF2D55',
  primary: '#4285F4',
  secondary: '#89D3DF',
} as const;

export const COLORS = {
  light: {

    gray: '#8E8E93',
    gray1: '#AEAEB2',
    gray2: '#C7C7CC',
    gray3: '#D1D1D6',
    gray4: '#E5E5EA',
    gray5: '#F2F2F7',

    text: '#262626',
    text1: '#3C3C4399',
    text2: '#3C3C434C',
    text3: '#3C3C432D',

    background: '#FFFFFF',
    background1: '#FAFAFA',
    background2: '#F5F5F5',
    background3: '#D1D1D6',

    border: "#D1D1D6",

    shadow: palette.transparent25,

    error: palette.red,
    success: palette.green,
    warning: palette.orange,
    ...palette
  },
  dark: {

    gray: '#8E8E93',
    gray1: '#636366',
    gray2: '#48484A',
    gray3: '#3A3A3C',
    gray4: '#2C2C2E',
    gray5: '#1C1C1E',

    text: '#FFFFFF',
    text1: '#EBEBF599',
    text2: '#EBEBF54C',
    text3: '#EBEBF52D',

    background: '#0D0D0D',
    background1: '#161616',
    background2: '#1B1B1B',
    background3: '#3A3A3C',

    shadow: palette.transparent50,

    border: "#4A4A4A",

    error: palette.red,
    success: palette.green,
    warning: palette.orange,
    ...palette
  }
} as const;
