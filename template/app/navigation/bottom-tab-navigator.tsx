import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsRoutes } from './routes';
import { PrivateStackScreenProps } from '$types/navigation';
import { EBottomTabScreens, EPrivateStackScreens } from '$constants/screen.constants';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator: React.FC<PrivateStackScreenProps<EPrivateStackScreens.BOTTOM_TAB_NAVIGATOR>> = () => {

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <BottomTab.Screen name={EBottomTabScreens.HOME} component={BottomTabsRoutes.Home} />
            <BottomTab.Screen name={EBottomTabScreens.SETTINGS} component={BottomTabsRoutes.Settings} />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
