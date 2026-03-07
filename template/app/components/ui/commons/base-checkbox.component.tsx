import { StyleSheet, TouchableOpacity, Animated, StyleProp, TextStyle, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { EFonts, moderateScale } from '$constants/styles.constants';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import { Check } from 'lucide-react-native';
import { ThemeText } from '../themed';

interface BaseCheckboxProps extends Omit<TouchableOpacityProps, 'style'> {
  value: boolean;
  onValueChange: (e: boolean) => void;
}

interface BaseLabelCheckboxProps extends BaseCheckboxProps {
  label: string;
  labelStyle?: StyleProp<TextStyle>;
}

const BaseCheckbox: React.FC<BaseCheckboxProps> = ({
  disabled = false,
  value,
  onValueChange,
  ...props
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
      {...props}
      style={[styles.wrapper, disabled && { opacity: 0.7 }]}
      onPress={(e) => {
        onValueChange(!value);
        if (props.onPress) props.onPress(e);
      }}
      disabled={disabled}
      accessibilityRole={props.accessibilityRole || "checkbox"}
      accessibilityState={{ ...props.accessibilityState, checked: value, disabled }}
    >
      <Animated.View
        style={[styles.container, { opacity }]}
      >
        <Check width={moderateScale(18)} height={moderateScale(18)} color={COLORS[theme].surface} />
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
      accessibilityRole="checkbox"
      accessibilityState={{ checked: props.value, disabled: props.disabled }}
      accessibilityLabel={label}
    >
      <View pointerEvents="none">
        <BaseCheckbox {...props} />
      </View>
      <ThemeText style={[styles.label, props.labelStyle]}>{label}</ThemeText>
    </TouchableOpacity>
  )
}

export default React.memo(BaseCheckbox);

const styling = (theme: ITheme) => StyleSheet.create({
  wrapper: {
    width: moderateScale(22),
    height: moderateScale(22),
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS[theme].border,
    borderRadius: moderateScale(5),
    overflow: 'hidden'
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS[theme]['brand-primary'],
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
    color: COLORS[theme]['text-primary'],
    fontSize: moderateScale(14)
  }
})