import React from 'react';
import { Text } from 'react-native';
import { BottomTabStackScreenProps } from '$types/navigation';
import { EBottomTabScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { ThemeText } from '$components/ui';

const Home: React.FC<BottomTabStackScreenProps<EBottomTabScreens.HOME>> = () => {

    return (
        <ThemedView>
            <ThemeText>Home</ThemeText>
        </ThemedView>
    );
};

export default Home;
