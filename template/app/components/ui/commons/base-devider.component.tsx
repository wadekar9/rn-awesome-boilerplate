import { StyleProp, StyleSheet, View, ViewStyle, ViewProps } from 'react-native'
import React from 'react'
import { moderateScale } from '$constants/styles.constants';
import { useAppTheme } from '$hooks/common';

interface BaseDeviderProps extends ViewProps {
  wrapperStyle?: StyleProp<ViewStyle>;
}

const BaseDevider: React.FC<BaseDeviderProps> = ({ wrapperStyle, ...props }) => {
  const { colors } = useAppTheme();
  return (
    <View {...props} style={[styles.wrapper, { backgroundColor: colors.border }, wrapperStyle]} />
  )
}

export default React.memo(BaseDevider);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: moderateScale(1),
    backgroundColor: undefined,
    marginVertical: moderateScale(5)
  }
})