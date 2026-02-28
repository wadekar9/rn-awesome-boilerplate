import React from 'react';
import { Text } from 'react-native';
import { AuthStackScreenProps } from '$types/navigation';
import { EAuthStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';
import { ThemeText } from '$components/ui';

const Login: React.FC<AuthStackScreenProps<EAuthStackScreens.LOGIN>> = () => {
    return (
        <ThemedView>
            <ThemeText>Login</ThemeText>
        </ThemedView>
    );
};

export default Login;
