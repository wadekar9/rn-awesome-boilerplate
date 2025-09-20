import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { privateStackNavigationRef, RootStackParamsList } from '$types/navigation';
import { PublicRoutes } from './routes';
import AuthStackNavigator from './auth-stack-navigator';
import PrivateStackNavigator from './private-stack-navigator';
import { ERootStackScreens } from '$constants/screen.constants';
import { NavigationContainer } from '@react-navigation/native';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const RootStackNavigator = () => {
    return (
        <NavigationContainer ref={privateStackNavigationRef}>
            <RootStack.Navigator>
                <RootStack.Screen name={ERootStackScreens.SPLASH} component={PublicRoutes.Splash} />
                <RootStack.Screen name={ERootStackScreens.AUTH_STACK} component={AuthStackNavigator} />
                <RootStack.Screen name={ERootStackScreens.PRIVATE_STACK} component={PrivateStackNavigator} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
};

export default RootStackNavigator;
