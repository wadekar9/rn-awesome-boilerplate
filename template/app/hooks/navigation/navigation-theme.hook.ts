import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';
import { useAppTheme } from '$hooks/common';
import { useMemo } from 'react';

/**
 * Custom hook to generate a React Navigation theme based on the app's theme.
 */
export const useNavigationTheme = (): Theme => {
    const { theme, colors } = useAppTheme();

    return useMemo(() => {
        const isDark = theme === 'dark';
        const baseTheme = isDark ? DarkTheme : DefaultTheme;

        return {
            ...baseTheme,
            colors: {
                ...baseTheme.colors,
                primary: colors['brand-primary'],
                background: colors.background,
                card: colors.surface,
                text: colors['text-primary'],
                border: colors.border,
                notification: colors['brand-primary'],
            },
        };
    }, [theme, colors]);
};
