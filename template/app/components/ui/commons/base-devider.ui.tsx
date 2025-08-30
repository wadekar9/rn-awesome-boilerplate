import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'
import { moderateScale } from '$constants/styles.constants';

interface BaseDeviderProps {
  wrapperStyle?: StyleProp<ViewStyle>;
}

const BaseDevider: React.FC<BaseDeviderProps> = ({ wrapperStyle }) => {
  return (
    <View style={[styles.wrapper, wrapperStyle]} />
  )
}

export default React.memo(BaseDevider);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: moderateScale(1),
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: moderateScale(5)
  }
})