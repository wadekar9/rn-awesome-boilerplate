import React from 'react';
import { Text } from 'react-native';
import { PrivateStackScreenProps } from '$types/navigation';
import { EPrivateStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';

const Notifications: React.FC<PrivateStackScreenProps<EPrivateStackScreens.NOTIFICATIONS>> = () => {

    return (
        <ThemedView>
            <Text>Notifications</Text>
        </ThemedView>
    );
};

export default Notifications;
