import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PrivateStackParamsList, RootStackScreenProps } from '$types/navigation';
import { PrivateRoutes } from './routes';
import { EPrivateStackScreens, ERootStackScreens } from '$constants/screen.constants';
import BottomTabNavigator from './bottom-tab-navigator';

const PrivateStack = createNativeStackNavigator<PrivateStackParamsList>();

const PrivateStackNavigator: React.FC<RootStackScreenProps<ERootStackScreens.PRIVATE_STACK>> = () => {

    return (
        <PrivateStack.Navigator>
            <PrivateStack.Screen name={EPrivateStackScreens.BOTTOM_TAB_NAVIGATOR} component={BottomTabNavigator} />
            <PrivateStack.Screen name={EPrivateStackScreens.NOTIFICATIONS} component={PrivateRoutes.Notifications} />
        </PrivateStack.Navigator>
    );
};

export default PrivateStackNavigator;
