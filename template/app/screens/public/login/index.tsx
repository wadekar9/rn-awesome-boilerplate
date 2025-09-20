import React from 'react';
import { Text } from 'react-native';
import { AuthStackScreenProps } from '$types/navigation';
import { EAuthStackScreens } from '$constants/screen.constants';
import { ThemedView } from '$components/containers';

const Login: React.FC<AuthStackScreenProps<EAuthStackScreens.LOGIN>> = () => {
    return (
        <ThemedView>
            <Text>Login</Text>
        </ThemedView>
    );
};

export default Login;
