import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { linking } from './linking';
import { PublicRoutes, PrivateRoutes } from './routes';
import BottomTabNavigator from './bottom-tab-navigator.navigation';
import { AppStackParamsList } from '$types/navigation.types';
import { useNavigationTheme } from '$hooks/navigation';
import { appStackNavigationRef } from '$utils/navigation';
import { EStackScreens } from '$constants/screen.constants';

const AppStack = createNativeStackNavigator<AppStackParamsList>();

const AppStackNavigator = () => {

    const navigationTheme = useNavigationTheme();

    return (
        <NavigationContainer
            ref={appStackNavigationRef}
            theme={navigationTheme}
            linking={linking}
        >
            <AppStack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
                <AppStack.Screen name={EStackScreens.SPLASH} component={PublicRoutes.Splash} />
                <AppStack.Screen name={EStackScreens.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
                <AppStack.Screen name={EStackScreens.NOTIFICATIONS} component={PrivateRoutes.Notifications} />
                <AppStack.Screen name={EStackScreens.LOGIN} component={PublicRoutes.Login} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default AppStackNavigator;
