import React from 'react';
import { Text } from 'react-native';
import { PrivateStackScreenProps } from '$types/navigation';
import { EPrivateStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { ThemeText } from '$components/ui';

const Notifications: React.FC<PrivateStackScreenProps<EPrivateStackScreens.NOTIFICATIONS>> = () => {

    return (
        <ThemedView>
            <ThemeText>Notifications</ThemeText>
        </ThemedView>
    );
};

export default Notifications;
