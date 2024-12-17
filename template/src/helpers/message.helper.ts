import { Colors } from "$constants/colors.constants"
import { EFonts, moderateScale } from "$constants/styles.constants"
import { getI18n } from "react-i18next"
import { StatusBar } from "react-native"
import { MessageOptions, showMessage } from "react-native-flash-message"
import { fetch } from '@react-native-community/netinfo';

export function showFlashMessage(props: MessageOptions){

    showMessage({
        ...props,
        animated: true,
        duration: 3000,
        position: 'top',
        statusBarHeight: StatusBar.currentHeight || 30,
        hideOnPress: true,
        textStyle: {
            fontFamily: EFonts.MEDIUM,
            fontSize: moderateScale(14),
            color: Colors.light.white,
            letterSpacing: 0.5
        },
        titleStyle: {
            fontFamily: EFonts.SEMI_BOLD,
            fontSize: moderateScale(15),
            color: Colors.light.white,
            letterSpacing: 0.5
        },
        textProps : { numberOfLines : 2 },
        titleProps : { numberOfLines : 2 }
    })
}

export const showErrorFlashMessage = async (error: any) => {

    const { t } = getI18n();
    const isConnected = (await fetch()).isConnected

    if (!isConnected) {
        showFlashMessage({
            message: t('messages:UNABLE_PROCEED'),
            description : t('messages:INTERNET_CONNECTION'),
            type: 'danger'
        })
        return;
    }

    if (error) {
        if (error?.message) {
            let message : string = (typeof error?.message === 'string' && (error?.message.includes('Rejected') || error?.message == 'Rejected')) ? t('messages:WENT_WRONG') : error.message
            if (!message.includes('Aborted') || message !== 'Aborted') {
                showFlashMessage({
                    message: t('messages:UNABLE_PROCEED'),
                    description : message.toLowerCase().includes('unauthenticated') ? t('messages:SESSION_EXPIRED') : message,
                    type: 'danger'
                })
            }
        } else if (typeof error === 'string') {
            let message : string = (error.includes('Rejected') || error == 'Rejected') ? t('messages:WENT_WRONG') : error;
            if (!message.includes('Aborted') || message !== 'Aborted') {
                showFlashMessage({
                    message: t('messages:UNABLE_PROCEED'),
                    description : message.toLowerCase().includes('unauthenticated') ? t('messages:SESSION_EXPIRED') : message,
                    type: 'danger'
                })
            }
        } else {
            showFlashMessage({
                message: t('messages:UNABLE_PROCEED'),
                description: t('messages:WENT_WRONG'),
                type: 'danger'
            })
        }
    } else {
        showFlashMessage({
            message: t('messages:UNABLE_PROCEED'),
            description: t('messages:WENT_WRONG'),
            type: 'danger'
        })
    }
}