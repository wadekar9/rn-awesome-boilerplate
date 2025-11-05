import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { Storage } from '$utils/storage';
import { EStorageKeys } from '$constants/storage.constants';
import { Appearance } from 'react-native';
import { AppThemeContextProps, IBaseTheme, ITheme } from '$types/common.types';

export const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined);

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const [theme, setTheme] = useState<ITheme>('light');
    const [systemTheme, setSystemTheme] = useState<ITheme>(Appearance.getColorScheme() || 'light');
    const [selectedTheme, setSelectedTheme] = useState<IBaseTheme>('light');

    const applyTheme = useCallback((theme: IBaseTheme) => {
        setSelectedTheme(theme);
        setTheme(theme === 'default' ? systemTheme : theme);
        Storage.set(EStorageKeys.APP_THEME, theme);
    }, [systemTheme]);

    useEffect(() => {
        (async () => {
            const savedTheme = Storage.getString(EStorageKeys.APP_THEME);
            applyTheme(savedTheme as IBaseTheme || 'default');
        })();
    }, [applyTheme]);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            setSystemTheme(colorScheme as ITheme)
            if(selectedTheme == 'default'){
                setTheme(colorScheme || 'light');
            }
        });
        return () => listener.remove();
    }, [selectedTheme]);

    const contextValue = useMemo(
        () => ({
            theme,
            selectedTheme,
            changeTheme: applyTheme,
        }),
        [selectedTheme, theme, applyTheme]
    );

    return (
        <AppThemeContext.Provider value={contextValue}>
            {children}
        </AppThemeContext.Provider>
    );
};

export default AppThemeProvider;
