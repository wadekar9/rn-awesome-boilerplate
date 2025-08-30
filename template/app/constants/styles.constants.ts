import { Dimensions } from "react-native";

const { width : DEVICE_WIDTH, height : DEVICE_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 430;

const scale = (size: number) => DEVICE_WIDTH / guidelineBaseWidth * size;
const moderateScale = (size: number, factor: number = 0.5) => size + (scale(size) - size) * factor;

export { moderateScale, DEVICE_WIDTH, DEVICE_HEIGHT };

export enum EFonts {
    BLACK = 'Poppins-Black',
    BOLD = 'Poppins-Bold',
    EXTRA_BOLD = 'Poppins-ExtraBold',
    EXTRA_LIGHT = 'Poppins-ExtraLight',
    LIGHT = 'Poppins-Light',
    MEDIUM = 'Poppins-Medium',
    REGULAR = 'Poppins-Regular',
    SEMI_BOLD = 'Poppins-SemiBold',
    THIN = 'Poppins-Thin'
}

export enum EFontSize {
    '3XL' = 26,
    '2XL' = 18,
    XL = 16,
    LG = 15,
    BASE = 14,
    SM = 13,
    XS = 12
}