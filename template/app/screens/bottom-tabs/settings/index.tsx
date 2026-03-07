import React from 'react';
import { Text } from 'react-native';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';

const Settings: React.FC<BottomTabStackScreenProps<EBottomScreens.SETTINGS>> = () => {

    return (
        <ThemedView>
            <ThemeText>Settings</ThemeText>
        </ThemedView>
    );
};

export default Settings;
