import { AppStackParamsList } from '$types/navigation.types';
import { LinkingOptions } from '@react-navigation/native';
import { EStackScreens, EBottomScreens } from '$constants/screen.constants';

/**
 * Deep linking configuration for the application.
 */
export const linking: LinkingOptions<AppStackParamsList> = {
    prefixes: ['awesome://app'], // Replace with actual scheme
    config: {
        screens: {
            [EStackScreens.SPLASH]: 'splash',
            [EStackScreens.LOGIN]: 'login',
            [EStackScreens.NOTIFICATIONS]: 'notifications',
            [EStackScreens.BOTTOM_TAB_NAVIGATOR]: {
                screens: {
                    [EBottomScreens.HOME]: 'home',
                    [EBottomScreens.SETTINGS]: 'settings',
                },
            },
        },
    },
};
