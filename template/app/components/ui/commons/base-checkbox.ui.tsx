import { StyleSheet, TouchableOpacity, Animated, StyleProp, TextStyle } from 'react-native'
import React from 'react'
import { EFonts, moderateScale } from '$constants/styles.constants';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import { Check } from 'lucide-react-native';
import { ThemeText } from '../themed';

interface BaseCheckboxProps {
  value: boolean;
  onValueChange: (e: boolean) => void;
  disabled?: boolean;
}

interface BaseLabelCheckboxProps extends BaseCheckboxProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}

const BaseCheckbox: React.FC<BaseCheckboxProps> = ({
  disabled = false,
  value,
  onValueChange
}) => {

  const { theme } = useAppTheme();
  const styles = styling(theme);

  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(opacity, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false
    }).start();
  }, [value]);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.wrapper, disabled && { opacity: 0.7 }]}
      onPress={() => onValueChange(!value)}
      disabled={disabled}
    >
      <Animated.View
        style={[styles.container, { opacity }]}
      >
        <Check width={moderateScale(18)} height={moderateScale(18)} color={COLORS[theme].white} />
      </Animated.View>
    </TouchableOpacity>
  )
}

export const BaseLabelCheckbox: React.FC<BaseLabelCheckboxProps> = ({
  label,
  ...props
}) => {

  const { theme } = useAppTheme();
  const styles = styling(theme);

  return (
    <TouchableOpacity
      style={[styles.flexWrapper, props.disabled && { opacity: 0.7 }]}
      activeOpacity={0.7}
      onPress={() => props.onValueChange(!props.value)}
      disabled={props.disabled}
    >
      <BaseCheckbox {...props} />
      <ThemeText style={styles.label}>{label}</ThemeText>
    </TouchableOpacity>
  )
}

export default React.memo(BaseCheckbox);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS[theme].gray,
    borderRadius: moderateScale(5),
    overflow: 'hidden'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS[theme].primary,
    alignItems: 'center',
    justifyContent: 'center'
  },
  flexWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(10)
  },
  label: {
    fontFamily: EFonts.MEDIUM,
    textTransform: 'capitalize',
    color: COLORS[theme].text,
    fontSize: moderateScale(14)
  }
})