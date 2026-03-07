import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabsRoutes } from './routes';
import { TabBarNavigator } from '$components/navigation';
import { useAppTheme } from '$hooks/common';
import { BottomTabParamsList, AppStackScreenProps } from '$types/navigation.types';
import { EBottomScreens, EStackScreens } from '$constants/screen.constants';

const BottomTab = createBottomTabNavigator<BottomTabParamsList>();

const BottomTabNavigator: React.FC<AppStackScreenProps<EStackScreens.BOTTOM_TAB_NAVIGATOR>> = () => {

    const { theme, colors } = useAppTheme();

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors['brand-primary'],
                tabBarInactiveTintColor: colors['text-secondary'],
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    borderTopWidth: 0,
                    backgroundColor: 'transparent',
                    elevation: 0,
                    shadowOpacity: 0,
                },
            }}
            tabBar={(props) => <TabBarNavigator theme={theme} {...props} />}
        >
            <BottomTab.Screen
                name={EBottomScreens.HOME}
                component={BottomTabsRoutes.Home}
                options={{
                    tabBarLabel: 'Home',
                    // tabBarIcon: ({ color, size }) => <Icon name="home" color={color} size={size} />,
                }}
            />
            <BottomTab.Screen
                name={EBottomScreens.SETTINGS}
                component={BottomTabsRoutes.Settings}
                options={{
                    tabBarLabel: 'Settings',
                    // tabBarIcon: ({ color, size }) => <Icon name="settings" color={color} size={size} />,
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigator;
