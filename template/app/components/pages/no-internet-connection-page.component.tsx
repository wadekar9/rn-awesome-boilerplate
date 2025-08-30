import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '$components/containers'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { ICONS } from '$assets/images'
import { ITheme } from '$types/common'
import { useAppTheme } from '$hooks/common'
import { Colors } from '$constants/colors.constants'
import { BaseButton } from '$components/ui'
import { ReloadOutlineIcon } from '$assets/icons'
import { useNetInfoInstance } from "@react-native-community/netinfo";
import { useNavigation } from '@react-navigation/native'

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

      navigation.navigate('Home');
    }
  }, [isConnected])

  return (
    <ThemedView>
      <View style={styles.container}>
        <Image
          source={ICONS.NETWORK_CONNECTION}
          style={{ width: moderateScale(150), height: moderateScale(150) }}
        />

        <View style={styles.content}>
          <Text style={styles.label}>No internet connection!</Text>
          <Text style={styles.description}>Please check your network connection!</Text>
          <BaseButton
            label='Try Again'
            LeftAccessory={<ReloadOutlineIcon width={moderateScale(20)} height={moderateScale(20)} />}
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

const styling = (theme : ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(50),
    padding : moderateScale(20),
  },
  content : {
    alignItems : 'center',
    justifyContent : 'center',
    gap : moderateScale(15),
    width : '100%'
  },
  label : {
    fontFamily : EFonts.SEMI_BOLD,
    fontSize : EFontSize['2XL'],
    color : Colors[theme].text
  },
  description : {
    fontFamily : EFonts.MEDIUM,
    fontSize : EFontSize.LG,
    color : Colors[theme].grey
  },
  buttonContainer : {
    width : 'auto',
    alignSelf : 'center',
    paddingHorizontal : moderateScale(22),
    borderWidth : StyleSheet.hairlineWidth,
    backgroundColor : 'transparent',
  }
})