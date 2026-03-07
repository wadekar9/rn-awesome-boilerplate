import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import BootSplash from 'react-native-bootsplash';
import { EStackScreens } from "$constants/screen.constants";
import { Storage } from '$utils/storage';
import { EStorageKeys } from '$constants/storage.constants';
import { showFlashMessage } from "$helpers/message.helper";
import { useAppTranslation } from "$hooks/common";

/**
 * Custom hook to manage the initial authentication flow.
 * Handles token validation, profile fetching, and initial navigation.
 */
export const useAuthenticationFlow = () => {
    const { messages_t } = useAppTranslation();
    const navigation = useNavigation<any>();

    /**
     * Hides the splash screen if it's currently visible.
     */
    const hideSplashScreen = useCallback(async () => {
        try {
            const isVisible = await BootSplash.isVisible();
            if (isVisible) {
                await BootSplash.hide({ fade: true });
            }
        } catch (error) {
            console.warn('BootSplash hide error:', error);
        }
    }, []);

    /**
     * Navigates to the login screen and ensures the splash screen is hidden.
     */
    const navigateToLogin = useCallback(() => {
        navigation.replace(EStackScreens.LOGIN);
        hideSplashScreen();
    }, [navigation, hideSplashScreen]);

    /**
     * Main handler for determining initial application state based on authentication.
     */
    const handleAuthentication = useCallback(async () => {
        try {
            const token = Storage.getString(EStorageKeys.ACCESS_TOKEN);

            if (!token) {
                navigateToLogin();
                return;
            }

            // TODO: Replace with actual API call to fetch profile
            // const profile = await api.getProfile();
            const profile: any = null;

            if (!profile) {
                // If token exists but profile cannot be fetched, we might want to clear token or just login again
                navigateToLogin();
            } else {
                // TODO: Set auth state to global storage (Redux/Zustand)
                // dispatch(setAuthData({ token, profile }));

                showFlashMessage({
                    message: messages_t('SUCCESS'),
                    description: messages_t('LOGIN_SUCCESS'),
                    type: 'success'
                });

                // Hide splash after successful logic
                hideSplashScreen();
            }
        } catch (error) {
            console.error('Authentication flow error:', error);
            navigateToLogin();
        }
    }, [messages_t, navigateToLogin, hideSplashScreen]);

    return { handleAuthentication };
};
