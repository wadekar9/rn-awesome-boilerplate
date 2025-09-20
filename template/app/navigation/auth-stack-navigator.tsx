import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamsList, RootStackScreenProps } from '$types/navigation';
import { PublicRoutes } from './routes';
import { EAuthStackScreens, ERootStackScreens } from '$constants/screen.constants';

const AuthStack = createNativeStackNavigator<AuthStackParamsList>();

const AuthStackNavigator: React.FC<RootStackScreenProps<ERootStackScreens.AUTH_STACK>> = () => {

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name={EAuthStackScreens.LOGIN} component={PublicRoutes.Login} />
        </AuthStack.Navigator>
    );
};

export default AuthStackNavigator;
