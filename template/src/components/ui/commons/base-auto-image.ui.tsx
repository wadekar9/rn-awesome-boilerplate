import React from "react";
import { moderateScale } from "$constants/styles.constants"
import { useAutoImage } from "$hooks/common";
import { Platform, StyleSheet, StyleProp, ViewStyle, View } from "react-native"
import FastImage, { FastImageProps, ImageStyle, Source } from "@d11/react-native-fast-image";
import { Colors } from "$constants/colors.constants";

export interface AutoImageProps extends Omit<FastImageProps, 'style'> {
    width?: number;
    height?: number;
    wrapperStyle?: StyleProp<ViewStyle>;
    imageStyle?: StyleProp<ImageStyle>;
}

const BaseAutoImage = (props: AutoImageProps) => {

    const { width: BASE_WIDTH, height: BASE_HEIGHT, imageStyle, wrapperStyle, ...imageProps } = props;
    const source = imageProps.source as Source;
    const headers = source?.headers;

    const [width, height] = useAutoImage(
        Platform.select({
            web: (source?.uri as string) ?? (source as string),
            default: source?.uri as string,
        }),
        headers,
        [BASE_WIDTH, BASE_HEIGHT],
    )

    return (
        <View style={[styles.wrapper, { width, height }, wrapperStyle]}>
            <FastImage
                {...imageProps}
                style={[styles.image, imageStyle]}
            />
        </View>
    )
}

export default React.memo(BaseAutoImage);

const styles = StyleSheet.create({
    wrapper: {
        width: moderateScale(100),
        height: moderateScale(100),
        backgroundColor: Colors.light.grey,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    }
})