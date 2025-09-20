import { EBottomTabScreens } from '$constants/screen.constants';
import { BottomTabNavigationProp, BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type BottomTabStackParamsList = {
    [EBottomTabScreens.HOME]: undefined;
    [EBottomTabScreens.SETTINGS]: undefined;
}

export type BottomTabStackScreenProps<T extends keyof BottomTabStackParamsList> = BottomTabScreenProps<BottomTabStackParamsList, T>;
export type BottomTabStackNavigationProps = BottomTabNavigationProp<BottomTabStackParamsList>;
