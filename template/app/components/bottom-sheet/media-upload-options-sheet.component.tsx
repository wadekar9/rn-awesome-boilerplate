import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { Colors } from '$constants/colors.constants';
import { waitForSeconds } from '$helpers/utils.helper';
import { Portal } from 'react-native-portalize';
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import { MediaType } from 'react-native-image-picker';
import { IMediaFile, ITheme } from '$types/common.types';
import { useAppTheme, useDocumentPicker, useImagePicker } from '$hooks/common';
import { IconButton } from '$components/ui';
import { AskPermissionModal } from '$components/modals';
import { CameraOutlineIcon, FolderOpenOutlineIcon, GalleryImagesOutlineIcon } from '$assets/icons';

interface MediaUploadOptionsSheetProps {
    onChooseFile: (e: IMediaFile[]) => void;
    mediaType?: MediaType;
    maxFiles?: number;
}

interface MediaUploadOptionsSheetRef {
    open: () => void;
    close: () => void;
}

const MediaUploadOptionsSheet = React.forwardRef<MediaUploadOptionsSheetRef, MediaUploadOptionsSheetProps>((
    { mediaType = 'photo', ...props },
    ref
) => {

    const { theme, colors } = useAppTheme();
    const styles = styling(theme);

    const permissionRef = React.useRef<any>(null);
    const sheetRef = React.useRef<BottomSheetMethods>(null);

    const { openGallery, openCamera } = useImagePicker(props.onChooseFile, () => permissionRef.current?.open('media'));
    const { openPicker } = useDocumentPicker(props.onChooseFile);

    const OPTIONS = React.useMemo(() => ([
        {
            title: 'Camera',
            icon: <CameraOutlineIcon width={moderateScale(38)} height={moderateScale(38)} stroke={colors.primary} />,
            onPress: () => {
                sheetRef.current?.close();
                waitForSeconds(() => openCamera(mediaType), 800);
            }
        },
        {
            title: 'Gallery',
            icon: <GalleryImagesOutlineIcon width={moderateScale(38)} height={moderateScale(38)} stroke={colors.primary} />,
            onPress: () => {
                sheetRef.current?.close();
                waitForSeconds(() => openGallery('mixed', 1), 800);
            }
        },
        {
            title: 'Files',
            icon: <FolderOpenOutlineIcon width={moderateScale(38)} height={moderateScale(38)} stroke={colors.primary} />,
            onPress: () => {
                sheetRef.current?.close();
                waitForSeconds(() => openPicker(['allFiles']), 800);
            }
        },
    ]), [mediaType, colors, openCamera, openGallery, openPicker]);

    React.useImperativeHandle(ref, () => ({
        open: () => sheetRef.current?.open(0),
        close: () => sheetRef.current?.close()
    }), [])

    return (
        <Portal>
            <BottomSheet
                ref={sheetRef}
                height={moderateScale(200)}
                closeOnBackdropPress
                closeOnDragDown
                style={styles.sheetWrapper}
                dragHandleStyle={styles.dragHandleStyle}
            >
                <View style={styles.options}>
                    {OPTIONS.map((option, idx) => (
                        <IconButton
                            style={styles.option}
                            key={`${idx}`}
                            activeOpacity={0.8}
                            onPress={option.onPress}
                        >
                            <View style={styles.icon}>
                                {option.icon}
                            </View>
                            <Text style={styles.label}>{option.title}</Text>
                        </IconButton>
                    ))}
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
        backgroundColor: Colors[theme].background1
    },
    dragHandleStyle: {
        backgroundColor: Colors[theme].text,
    },
    options: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(20)
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        gap: moderateScale(10)
    },
    icon: {
        width: moderateScale(80),
        height: undefined,
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: moderateScale(40),
        borderWidth: moderateScale(1),
        borderColor: Colors[theme].primary
    },
    label: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.LG,
        color: Colors[theme].text,
    },
    container: {
        flex: 1,
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        height: 250,
        alignItems: 'center',
    },
})