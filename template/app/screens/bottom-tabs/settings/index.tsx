import React from 'react';
import { Text } from 'react-native';
import { BottomTabStackScreenProps } from '$types/navigation';
import { EBottomTabScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { ThemeText } from '$components/ui';

const Settings: React.FC<BottomTabStackScreenProps<EBottomTabScreens.SETTINGS>> = () => {

    return (
        <ThemedView>
            <ThemeText>Settings</ThemeText>
        </ThemedView>
    );
};

export default Settings;
