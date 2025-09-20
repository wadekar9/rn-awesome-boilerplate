import React from 'react';
import { Text } from 'react-native';
import { BottomTabStackScreenProps } from '$types/navigation';
import { EBottomTabScreens } from '$constants/screen.constants';
import { ThemedSafeAreaView } from '$components/containers';

const Home: React.FC<BottomTabStackScreenProps<EBottomTabScreens.HOME>> = () => {

    return (
        <ThemedSafeAreaView>
            <Text>Home</Text>
        </ThemedSafeAreaView>
    );
};

export default Home;
