import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedView } from '$components/containers'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { useAppTheme } from '$hooks/common'
import { ITheme } from '$types/common'
import { Colors } from '$constants/colors.constants'
import { ICONS } from '$assets/images'

const EmptyStatePage: React.FC = () => {

  const { theme } = useAppTheme();
  const styles = styling(theme);

  return (
    <ThemedView>
      <View style={styles.container}>
        <Image
          source={ICONS.EMPTY_STATE}
          style={{ width: moderateScale(150), height: moderateScale(150) }}
        />

        <View style={styles.content}>
          <Text style={styles.label}>Oops!</Text>
          <Text style={styles.description}>Data not found</Text>
        </View>
      </View>
    </ThemedView>
  )
}

export default EmptyStatePage

const styling = (theme: ITheme) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(20),
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
    color: Colors[theme].text
  },
  description: {
    fontFamily: EFonts.MEDIUM,
    fontSize: EFontSize.LG,
    color: Colors[theme].grey
  }
})