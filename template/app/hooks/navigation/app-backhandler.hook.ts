import React from "react";
import { BackHandler, ToastAndroid } from "react-native";

export const useAppBackHandler = () => {
    const isBackPressedOnce = React.useRef(false);

    React.useEffect(() => {
        const onBackPress = () => {
            if (isBackPressedOnce.current) {
                BackHandler.exitApp();
                return true;
            }

            isBackPressedOnce.current = true;
            ToastAndroid.show("Press back again to exit", ToastAndroid.SHORT);

            setTimeout(() => isBackPressedOnce.current = false, 2000);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress
        );

        return () => backHandler.remove();
    }, [isBackPressedOnce]);

    return null;
};