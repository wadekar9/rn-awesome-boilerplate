import { COLORS } from '$constants/colors.constants';
import { AppThemeContext } from '$context/app-theme.context';
import { useContext } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const useAppTheme = () => {
    const context = useContext(AppThemeContext);
    const insets = useSafeAreaInsets();

    if (!context) {
        throw new Error('useAppTheme must be used within an AppThemeProvider');
    }

    const { changeTheme, theme, selectedTheme } = context;

    return {
        changeTheme,
        theme,
        selectedTheme,
        colors: COLORS[theme],
        insets,
    };
};
