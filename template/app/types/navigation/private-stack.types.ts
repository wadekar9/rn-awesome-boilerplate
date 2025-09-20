import { EPrivateStackScreens } from '$constants/screen.constants';
import { createNavigationContainerRef } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type PrivateStackParamsList = {
    [EPrivateStackScreens.BOTTOM_TAB_NAVIGATOR]: undefined;
    [EPrivateStackScreens.NOTIFICATIONS]: undefined;
}

export type PrivateStackScreenProps<T extends keyof PrivateStackParamsList> = NativeStackScreenProps<PrivateStackParamsList, T>;
export type PrivateStackNavigationProps = NativeStackNavigationProp<PrivateStackParamsList>;

export const privateStackNavigationRef = createNavigationContainerRef<PrivateStackParamsList>();
