import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getData, storeData } from '$utils/storage';
import { EStorageKeys } from '$constants/storage.constants';
import { AppThemeContextProps, ITheme } from '$types/common';
import { useColorScheme, Appearance } from 'react-native';

export const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined);

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const systemTheme = useColorScheme() ?? 'light';
    const [appTheme, setAppTheme] = useState<ITheme>(systemTheme);

    const changeTheme = useCallback((theme: ITheme) => {
        try {
            setAppTheme(theme);
            storeData(EStorageKeys.APP_THEME, theme);
        } catch (err) {
            console.log('ERROR: ', err);
        }
    }, []);

    useEffect(() => {
        (async () => {
            const result = await getData(EStorageKeys.APP_THEME);
            if (result) {
                if (result === 'default') {
                    setAppTheme(systemTheme);
                } else {
                    setAppTheme(result as ITheme);
                }
            }
        })();
    }, [systemTheme]);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            storeData(EStorageKeys.APP_THEME, colorScheme);
            setAppTheme(colorScheme as ITheme);
        });
        return () => listener.remove();
    }, [systemTheme]);

    const contextValue = useMemo(() => ({ currentTheme: appTheme, changeTheme }), [appTheme, changeTheme]);

    return (
        <AppThemeContext.Provider value={contextValue}>
            {children}
        </AppThemeContext.Provider>
    );
};

export default AppThemeProvider;
