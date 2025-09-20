import React from 'react';
import { Text } from 'react-native';
import { BottomTabStackScreenProps } from '$types/navigation';
import { EBottomTabScreens } from '$constants/screen.constants';
import { ThemedSafeAreaView } from '$components/containers';

const Settings: React.FC<BottomTabStackScreenProps<EBottomTabScreens.SETTINGS>> = () => {

    return (
        <ThemedSafeAreaView>
            <Text>Settings</Text>
        </ThemedSafeAreaView>
    );
};

export default Settings;
