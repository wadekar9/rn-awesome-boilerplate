import React from 'react';
import { ThemedView, ThemeText } from '$components/ui';
import { AppStackScreenProps } from '$types/navigation.types';
import { EStackScreens } from '$constants/screen.constants';

const Splash: React.FC<AppStackScreenProps<EStackScreens.SPLASH>> = () => {
    return (
        <ThemedView>
            <ThemeText>Splash</ThemeText>
        </ThemedView>
    );
};

export default Splash;
