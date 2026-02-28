import { Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '$types/navigation';
import { ERootStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { ThemeText } from '$components/ui';

const Splash: React.FC<RootStackScreenProps<ERootStackScreens.SPLASH>> = () => {
    return (
        <ThemedView>
            <ThemeText>Splash</ThemeText>
        </ThemedView>
    );
};

export default Splash;
