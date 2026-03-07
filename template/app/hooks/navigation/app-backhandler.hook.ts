import { useCallback, useRef } from 'react';
import { BackHandler, ToastAndroid, Platform, Alert } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

/**
 * Custom hook to handle hardware back button press on Android.
 * - If the navigator can go back, it performs the default back action.
 * - If on the root screen, it requires a double press within 2 seconds to exit the app.
 * 
 * @param exitMessage Optional message to show when back is pressed once on root screen.
 */
export const useAppBackHandler = (exitMessage: string = 'Press back again to exit') => {

    const navigation = useNavigation();
    const backPressedOnce = useRef(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showToast = useCallback((message: string) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(message, ToastAndroid.SHORT);
        } else {
            // Toast fallback for non-android if needed, though hardware back is Android specific
            Alert.alert('', message, [{ text: 'OK' }]);
        }
    }, []);

    const handleBackPress = useCallback(() => {
        // If navigation can go back, let the default behavior happen (e.g., pop screen)
        if (navigation.canGoBack()) {
            return false;
        }

        if (backPressedOnce.current) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            BackHandler.exitApp();
            return true;
        }

        backPressedOnce.current = true;
        showToast(exitMessage);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            backPressedOnce.current = false;
        }, 2000);

        return true;
    }, [navigation, showToast, exitMessage]);

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

            return () => {
                backHandler.remove();
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
                backPressedOnce.current = false;
            };
        }, [handleBackPress])
    );

};