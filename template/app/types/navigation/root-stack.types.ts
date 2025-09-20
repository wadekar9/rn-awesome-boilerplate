import { ERootStackScreens } from '$constants/screen.constants';
import { createNavigationContainerRef } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamsList = {
    [ERootStackScreens.SPLASH]: undefined;
    [ERootStackScreens.AUTH_STACK]: undefined;
    [ERootStackScreens.PRIVATE_STACK]: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamsList> = NativeStackScreenProps<RootStackParamsList, T>;
export type RootStackNavigationProps = NativeStackNavigationProp<RootStackParamsList>;

export const rootStackNavigationRef = createNavigationContainerRef<RootStackParamsList>();
