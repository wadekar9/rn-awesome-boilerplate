import { Image, StyleSheet, View } from 'react-native'
import React from 'react'
import { ThemedView } from '$components/ui'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants'
import { useAppTheme } from '$hooks/common'
import { ITheme } from '$types/common.types'
import { COLORS } from '$constants/colors.constants'
import { IMAGES } from '$assets/images'
import { ThemeText } from '$components/ui'
import { ImageSourcePropType } from 'react-native'

export interface EmptyStatePageProps {
  title?: string;
  description?: string;
  image?: ImageSourcePropType;
}

const EmptyStatePage: React.FC<EmptyStatePageProps> = ({
  title = "Oops!",
  description = "Data not found",
  image = IMAGES.EMPTY_STATE
}) => {

  const { theme } = useAppTheme();
  const styles = styling(theme);

  return (
    <ThemedView>
      <View style={styles.container}>
        <Image
          source={image}
          style={{ width: moderateScale(150), height: moderateScale(150) }}
          accessibilityRole="image"
          accessible={true}
          accessibilityLabel="Empty State Illustration"
        />

        <View style={styles.content}>
          <ThemeText style={styles.label}>{title}</ThemeText>
          <ThemeText style={styles.description}>{description}</ThemeText>
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
    color: COLORS[theme]['text-primary']
  },
  description: {
    fontFamily: EFonts.MEDIUM,
    fontSize: EFontSize.LG,
    color: COLORS[theme]['text-secondary']
  }
})