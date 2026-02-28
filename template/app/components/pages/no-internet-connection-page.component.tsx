import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { ThemedView } from '$components/containers'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { ITheme } from '$types/common.types'
import { useAppTheme } from '$hooks/common'
import { COLORS } from '$constants/colors.constants'
import { BaseButton, ThemeText } from '$components/ui'
import { useNetInfoInstance } from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native'
import { IMAGES } from '$assets/images'
import { RotateCcw } from 'lucide-react-native'

const NoInternetConnectionPage: React.FC = () => {

  const { netInfo: { type, isConnected }, refresh } = useNetInfoInstance();
  const navigation = useNavigation();
  const { theme, colors } = useAppTheme();
  const styles = styling(theme);

  React.useEffect(() => {
    if (isConnected) {
      if (navigation.canGoBack()) {
        navigation.goBack();
        return;
      };

      // If there's no back stack, navigate to a default screen, e.g., Home
    }
  }, [isConnected])

  return (
    <ThemedView>
      <View style={styles.container}>
        <Image
          source={IMAGES.NETWORK_CONNECTION}
          style={{ width: moderateScale(150), height: moderateScale(150) }}
        />

        <View style={styles.content}>
          <ThemeText style={styles.label}>No internet connection!</ThemeText>
          <ThemeText style={styles.description}>Please check your network connection!</ThemeText>
          <BaseButton
            label='Try Again'
            LeftAccessory={<RotateCcw width={moderateScale(20)} height={moderateScale(20)} color={colors.primary} />}
            containerStyle={styles.buttonContainer}
            labelStyle={{ color: colors.text }}
            onPress={refresh}
          />
        </View>
      </View>
    </ThemedView>
  )
}

export default NoInternetConnectionPage

const styling = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(50),
    padding: moderateScale(20),
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: moderateScale(15),
    width: '100%'
  },
  label: {
    fontFamily: EFonts.SEMI_BOLD,
    fontSize: EFontSize['2XL'],
    color: COLORS[theme].text
  },
  description: {
    fontFamily: EFonts.MEDIUM,
    fontSize: EFontSize.LG,
    color: COLORS[theme].gray
  },
  buttonContainer: {
    width: 'auto',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(22),
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: 'transparent',
  }
})