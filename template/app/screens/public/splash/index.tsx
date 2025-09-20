import { Text } from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '$types/navigation';
import { ERootStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';

const Splash: React.FC<RootStackScreenProps<ERootStackScreens.SPLASH>> = () => {
    return (
        <ThemedView>
            <Text>Splash</Text>
        </ThemedView>
    );
};

export default Splash;
