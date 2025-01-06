import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EFontSize, moderateScale } from '$constants/styles.constants';
import { Colors } from '$constants/colors.constants';
import { waitForSeconds } from '$helpers/utils.helper';
import { Portal } from 'react-native-portalize';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { MediaType } from 'react-native-image-picker';
import { IMediaFile, ITheme } from '$types/common';
import { useAppTheme, useDocumentPicker, useImagePicker } from '$hooks/common';
import { IconButton } from '$components/ui';
import { AskPermissionModal } from '$components/modals';
import { CameraOutlineIcon, GalleryImagesOutlineIcon } from '$assets/icons';

interface MediaUploadOptionsSheetProps {
    onChooseImage: (e: IMediaFile[]) => void;
    mediaType?: MediaType;
    maxFiles?: number;
}

interface MediaUploadOptionsSheetRef {
    open: () => void;
    close: () => void;
}

const MediaUploadOptionsSheet = React.forwardRef<MediaUploadOptionsSheetRef, MediaUploadOptionsSheetProps>((
    { maxFiles = 1, mediaType = 'photo', ...props },
    ref
) => {

    const { theme, colors } = useAppTheme();

    const permissionRef = React.useRef<any>(null);
    const sheetRef = React.useRef<BottomSheetMethods>(null);
    const { openGallery, openCamera } = useImagePicker(props.onChooseImage, () => permissionRef.current?.open('media'));
    // const {  } = useDocumentPicker(props.onChooseImage, () => permissionRef.current?.open(''));

    const styles = styling(theme);

    React.useImperativeHandle(ref, () => ({
        open: () => sheetRef.current?.open(),
        close: () => sheetRef.current?.close()
    }), [])

    return (
        <Portal>
            <BottomSheet
                ref={sheetRef}
                height={moderateScale(180)}
                closeOnBackdropPress
                closeOnDragDown
                style={styles.sheetWrapper}
                dragHandleStyle={styles.dragHandleStyle}
            >
                <View style={styles.options}>
                    <IconButton
                        style={styles.option}
                        activeOpacity={0.8}
                        onPress={() => {
                            sheetRef.current.close();
                            waitForSeconds(() => openCamera(mediaType), 800);
                        }}
                    >
                        <View style={styles.icon}>
                            <CameraOutlineIcon width={moderateScale(35)} height={moderateScale(35)} fill={colors.text} />
                        </View>
                        <Text style={styles.label}>Camera</Text>
                    </IconButton>
                    <IconButton
                        style={styles.option}
                        activeOpacity={0.8}
                        onPress={() => {
                            sheetRef.current.close();
                            waitForSeconds(() => openGallery(mediaType, maxFiles), 800);
                        }}
                    >
                        <View style={styles.icon}>
                            <GalleryImagesOutlineIcon width={moderateScale(35)} height={moderateScale(35)} fill={colors.text} />
                        </View>

                        <Text style={styles.label}>Gallery</Text>
                    </IconButton>
                </View>
            </BottomSheet>

            <AskPermissionModal
                ref={permissionRef}
                theme={theme}
            />
        </Portal>
    )
})

export default React.memo(MediaUploadOptionsSheet);

const styling = (theme: ITheme) => StyleSheet.create({
    sheetWrapper: {
        backgroundColor: Colors[theme].surface
    },
    dragHandleStyle: {
        backgroundColor: Colors[theme].text,
    },
    options : {
        width: '100%',
        flexDirection: 'row',
        alignItems : 'center',
        justifyContent : 'center',
        gap: moderateScale(20)
    },
    option : {
        alignItems : 'center',
        justifyContent : 'center',
        gap: moderateScale(10)
    },
    icon : {
        width : moderateScale(80),
        height : undefined,
        aspectRatio : 1,
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : moderateScale(40),
        borderWidth :moderateScale(1),
        borderColor : Colors[theme].border
    },
    label : {
        fontSize : EFontSize.LG,
        color : Colors[theme].text,
    }
})