import { StyleSheet, View } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import { waitForSeconds } from '$helpers/utils.helper';
import { MediaType } from 'react-native-image-picker';
import { BottomSheetRef, IMediaFile, ITheme } from '$types/common.types';
import { useAppTheme, useDocumentPicker, useImagePicker } from '$hooks/common';
import { IconButton, ThemeText } from '$components/ui';
import { AskPermissionModal } from '$components/modals';
import { Camera, Folder, Images } from 'lucide-react-native';
import BaseBottomSheet from './base-bottom-sheet.component';

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
    const sheetRef = React.useRef<BottomSheetRef>(null);

    const { openGallery, openCamera } = useImagePicker(props.onChooseFile, () => permissionRef.current?.open('media'));
    const { openPicker } = useDocumentPicker(props.onChooseFile);

    const OPTIONS = React.useMemo(() => ([
        {
            title: 'Camera',
            icon: <Camera width={moderateScale(38)} height={moderateScale(38)} color={colors['brand-primary']} />,
            onPress: () => {
                sheetRef.current?.close();
                waitForSeconds(() => openCamera(mediaType), 800);
            }
        },
        {
            title: 'Gallery',
            icon: <Images width={moderateScale(38)} height={moderateScale(38)} color={colors['brand-primary']} />,
            onPress: () => {
                sheetRef.current?.close();
                waitForSeconds(() => openGallery('mixed', 1), 800);
            }
        },
        {
            title: 'Files',
            icon: <Folder width={moderateScale(38)} height={moderateScale(38)} color={colors['brand-primary']} />,
            onPress: () => {
                sheetRef.current?.close();
                waitForSeconds(() => openPicker(['allFiles']), 800);
            }
        },
    ]), [mediaType, colors, openCamera, openGallery, openPicker]);

    React.useImperativeHandle(ref, () => ({
        open: () => sheetRef.current?.open(),
        close: () => sheetRef.current?.close()
    }), [])

    return (
        <>
            <BaseBottomSheet
                ref={sheetRef}
                sheetHeight={moderateScale(200)}
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
                            <ThemeText style={styles.label}>{option.title}</ThemeText>
                        </IconButton>
                    ))}
                </View>
            </BaseBottomSheet>

            <AskPermissionModal
                ref={permissionRef}
                theme={theme}
            />
        </>
    )
})

export default React.memo(MediaUploadOptionsSheet);

const styling = (theme: ITheme) => StyleSheet.create({
    sheetWrapper: {
        backgroundColor: COLORS[theme].surface
    },
    dragHandleStyle: {
        backgroundColor: COLORS[theme]['text-primary'],
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
        borderColor: COLORS[theme]['brand-primary']
    },
    label: {
        fontFamily: EFonts.MEDIUM,
        fontSize: EFontSize.LG,
        color: COLORS[theme]['text-primary'],
    },
    container: {
        flex: 1,
        backgroundColor: COLORS[theme].background,
    },
    contentContainer: {
        flex: 1,
        padding: 36,
        height: 250,
        alignItems: 'center',
    },
})