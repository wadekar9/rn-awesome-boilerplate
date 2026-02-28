import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '$constants/styles.constants';
import { useAppTheme, useSafeAreaInsetsStyle } from '$hooks/common';
import { IconButton, ThemeText } from '$components/ui';
import { ArrowLeft } from 'lucide-react-native';

interface BackHeaderProps {
  label?: string;
  RightAccessory?: React.ReactNode;
}

const BackHeader: React.FC<BackHeaderProps> = ({
  label,
  RightAccessory
}) => {

  const { paddingTop } = useSafeAreaInsetsStyle(['top']);
  const navigation = useNavigation();
  const { colors } = useAppTheme();

  return (
    <View style={[styles.wrapper, { height: moderateScale(45 + paddingTop), paddingTop, backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <IconButton
          onPress={() => navigation.goBack()}
          style={styles.icon}
        >
          <ArrowLeft width={moderateScale(20)} height={moderateScale(20)} color={colors['icon-default']} />
        </IconButton>
        {label && (
          <View style={styles.labelWrapper}>
            <ThemeText variant='h4' style={styles.label}>{label}</ThemeText>
          </View>
        )}
        {!!RightAccessory && RightAccessory}
      </View>
    </View>
  )
}

export default BackHeader

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5000
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingRight: moderateScale(18),
    paddingBottom: moderateScale(16)
  },
  icon: {
    width: undefined,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(10)
  },
  rightIcon: {
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(0)
  },
  label: {
    textTransform: 'capitalize',
    textAlign: 'center',
    marginLeft: moderateScale(-25)
  },
  labelWrapper: {
    maxWidth: '95%',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})