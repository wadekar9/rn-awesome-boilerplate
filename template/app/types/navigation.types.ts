import { EBottomScreens, EStackScreens } from '$constants/screen.constants';
import { createNavigationContainerRef } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type AppStackParamsList = {
    [EStackScreens.SPLASH]: undefined;
    [EStackScreens.LOGIN]: undefined;
    [EStackScreens.NOTIFICATIONS]: undefined;
    [EStackScreens.BOTTOM_TAB_NAVIGATOR]: undefined;
}

export type BottomTabParamsList = {
    [EBottomScreens.HOME]: undefined;
    [EBottomScreens.SETTINGS]: undefined;
}

export type BottomTabStackScreenProps<T extends keyof BottomTabParamsList> = BottomTabScreenProps<BottomTabParamsList, T>;
export type BottomTabStackNavigationProps = BottomTabNavigationProp<BottomTabParamsList>;

export type AppStackScreenProps<T extends keyof AppStackParamsList> = NativeStackScreenProps<AppStackParamsList, T>;
export type AppStackNavigationProps = NativeStackNavigationProp<AppStackParamsList>;
