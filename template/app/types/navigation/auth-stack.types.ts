import { EAuthStackScreens } from '$constants/screen.constants';
import { createNavigationContainerRef } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackParamsList = {
    [EAuthStackScreens.LOGIN]: undefined;
}

export type AuthStackScreenProps<T extends keyof AuthStackParamsList> = NativeStackScreenProps<AuthStackParamsList, T>;
export type AuthStackNavigationProps = NativeStackNavigationProp<AuthStackParamsList>;

export const authStackNavigationRef = createNavigationContainerRef<AuthStackParamsList>();
