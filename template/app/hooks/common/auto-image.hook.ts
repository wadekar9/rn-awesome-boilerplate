import { useLayoutEffect, useState } from "react"
import { Image, PixelRatio } from "react-native"

export function useAutoImage(
    remoteUri: string,
    headers?: {
        [key: string]: string
    },
    dimensions?: [maxWidth?: number, maxHeight?: number],
): [width: number, height: number] {
    const [[remoteWidth, remoteHeight], setRemoteImageDimensions] = useState([0, 0])
    const remoteAspectRatio = remoteWidth / remoteHeight
    const [maxWidth, maxHeight] = dimensions ?? []

    useLayoutEffect(() => {
        if (!remoteUri) return

        if (!headers) {
            Image.getSize(remoteUri, (w, h) => setRemoteImageDimensions([w, h]))
        } else {
            Image.getSizeWithHeaders(remoteUri, headers, (w, h) => setRemoteImageDimensions([w, h]))
        }
    }, [remoteUri, headers])

    if (Number.isNaN(remoteAspectRatio)) return [100, 100]

    if (maxWidth && maxHeight) {
        const aspectRatio = Math.min(maxWidth / remoteWidth, maxHeight / remoteHeight)
        return [
            PixelRatio.roundToNearestPixel(remoteWidth * aspectRatio),
            PixelRatio.roundToNearestPixel(remoteHeight * aspectRatio),
        ]
    } else if (maxWidth) {
        return [maxWidth, PixelRatio.roundToNearestPixel(maxWidth / remoteAspectRatio)]
    } else if (maxHeight) {
        return [PixelRatio.roundToNearestPixel(maxHeight * remoteAspectRatio), maxHeight]
    } else {
        return [remoteWidth, remoteHeight]
    }
}