import React from 'react';
import { Text } from 'react-native';
import { ThemedView, ThemeText } from '$components/ui';
import { AppStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const Login: React.FC<AppStackScreenProps<EStackScreens.LOGIN>> = () => {
    return (
        <ThemedView>
            <ThemeText>Login</ThemeText>
        </ThemedView>
    );
};

export default Login;
