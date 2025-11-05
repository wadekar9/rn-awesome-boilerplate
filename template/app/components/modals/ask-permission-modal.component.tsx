import { StyleSheet, View, Modal, Linking, Text } from 'react-native'
import React from 'react'
import { EFonts, EFontSize, moderateScale } from '$constants/styles.constants';
import { COLORS } from '$constants/colors.constants';
import { waitForSeconds } from '$helpers/utils.helper';
import { ITheme } from '$types/common.types';
import { useAppTranslation } from '$hooks/common';
import { IconButton } from '$components/ui';

interface PermissionModalProps {
    theme: ITheme;
}

type MODE = 'media' | 'camera' | 'location' | 'notification';

interface PermissionModalRef {
    open: (e: MODE) => void;
    close: () => void;
}

const AskPermissionModal = React.forwardRef<PermissionModalRef, PermissionModalProps>((props, ref) => {

    const { actions_t, common_t, messages_t } = useAppTranslation();
    const styles = styling(props.theme)

    const [visible, setVisible] = React.useState<boolean>(false);
    const [mode, setMode] = React.useState<MODE>('notification');

    React.useImperativeHandle(ref, () => ({
        open: (e: MODE) => {
            setVisible(true);
            setMode(e);
        },
        close: () => setVisible(false)
    }), []);

    function onOpenSettings() {
        setVisible(false);
        waitForSeconds(Linking.openSettings, 500);
    }

    function onCancel() {
        setVisible(false);
    }

    const MESSAGE = React.useMemo(() => {
        switch (mode) {
            case 'camera': return common_t('PERMISSIONS_LABEL', { label: mode });
            case 'media': return common_t('PERMISSIONS_LABEL', { label: mode });
            case 'location': return common_t('PERMISSIONS_LABEL', { label: mode });
            case 'notification': return common_t('PERMISSIONS_LABEL', { label: mode });
            default: return '';
        }
    }, [mode]);

    const DESCRIPTION = React.useMemo(() => {
        switch (mode) {
            case 'camera': return messages_t('CAMERA_PERMISSION');
            case 'media': return messages_t('MEDIA_PERMISSION');
            case 'location': return messages_t('LOCATION_PERMISSION');
            case 'notification': return messages_t('NOTIFICATION_PERMISSION');
            default: return '';
        }
    }, [mode]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={'fade'}
            onRequestClose={() => onCancel()}
        >
            <View style={styles.wrapper}>
                <View style={styles.container}>
                    <Text style={styles.message}>{MESSAGE}</Text>

                    <Text numberOfLines={3} style={styles.description}>{DESCRIPTION}</Text>

                    <View style={styles.actions}>
                        <IconButton onPress={onCancel}>
                            <Text style={styles.label}>{actions_t('CANCEL')}</Text>
                        </IconButton>
                        <IconButton onPress={onOpenSettings}>
                            <Text style={styles.label}>{actions_t('OPEN_SETTINGS')}</Text>
                        </IconButton>
                    </View>
                </View>
            </View>
        </Modal>
    )
})

export default React.memo(AskPermissionModal);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.55)',
        paddingHorizontal: moderateScale(20)
    },
    container: {
        width: '100%',
        height: undefined,
        padding: moderateScale(20),
        backgroundColor: COLORS[theme].background1,
        borderRadius: moderateScale(10),
        gap: moderateScale(10),
    },
    message: {
        textTransform: 'capitalize'
    },
    description: {
        fontFamily: EFonts.MEDIUM,
        fontSize: moderateScale(14),
        color: COLORS[theme].text
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: moderateScale(20)
    },
    label: {
        fontFamily: EFonts.BOLD,
        fontSize: EFontSize.LG,
        color: COLORS[theme].primary
    }
})