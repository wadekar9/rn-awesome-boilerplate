import { EAuthScreens } from "$constants/screen.constants";
import BootSplash from 'react-native-bootsplash';
import { getData } from '$utils/storage';
import { EStorageKeys } from '$constants/storage.constants';
import { showFlashMessage } from "$helpers/message.helper";
import { useAppTranslation } from "$hooks/common";
import { useNavigation } from '@react-navigation/native';

export const useAuthenticationFlow = () => {

    const { messages_t } = useAppTranslation();
    const navigation = useNavigation<any>();

    const hideSplashScreen = async () => {
        const isVisible = await BootSplash.isVisible();
        if(isVisible){
            BootSplash.hide();
        }
    }

    const navigateToLogin = () => {
        navigation.replace(EAuthScreens.LOGIN);
        hideSplashScreen();
    };

    const handleAuthentication = async () => {
        try {
            const token = await getData(EStorageKeys.ACCESS_TOKEN);

            if (!token) {
                navigateToLogin();
                return;
            }

            const profile : any = null; /// fetch profile details from server via api

            if (!profile) {
                navigateToLogin();
            } else {
                // set auth token to global storage // redux, zustand etc.
                showFlashMessage({
                    message: messages_t('SUCCESS'),
                    description: messages_t('LOGIN_SUCCESS'),
                    type: 'success'
                })
            }
        } catch (error) {
            console.error('Authentication flow error:', error);
            navigateToLogin();
        }
    };

    return { handleAuthentication };
};