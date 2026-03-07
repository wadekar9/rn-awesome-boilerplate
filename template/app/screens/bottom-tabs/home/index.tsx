import React from 'react';
import { Text } from 'react-native';
import { BottomTabStackScreenProps } from '$types/navigation.types';
import { EBottomScreens } from '$constants/screen.constants';
import { ThemedView, ThemeText } from '$components/ui';

const Home: React.FC<BottomTabStackScreenProps<EBottomScreens.HOME>> = () => {

    return (
        <ThemedView>
            <ThemeText>Home</ThemeText>
        </ThemedView>
    );
};

export default Home;
