import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { getData, storeData } from '$utils/storage';
import { EStorageKeys } from '$constants/storage.constants';
import { useColorScheme, Appearance } from 'react-native';
import { AppThemeContextProps, IBaseTheme, ITheme } from '$types/common.types';

export const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined);

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const systemTheme = useColorScheme() ?? 'light';
    const [baseTheme, setBaseTheme] = useState<IBaseTheme>('default');
    const [appTheme, setAppTheme] = useState<ITheme>(systemTheme);

    const changeTheme = useCallback((theme: IBaseTheme) => {
        try {
            setBaseTheme(theme);
            if (theme === 'default') {
                setAppTheme(systemTheme);
            } else {
                setAppTheme(theme);
            }
            storeData(EStorageKeys.APP_THEME, theme);
        } catch (err) {
            console.log('ERROR:[changeTheme]', err);
        }
    }, [systemTheme]);

    useEffect(() => {
        (async () => {
            const result = await getData(EStorageKeys.APP_THEME);
            if (result) {
                if (result === 'default') {
                    setAppTheme(Appearance.getColorScheme() ?? 'light');
                } else {
                    setAppTheme(result as ITheme);
                }
            }
        })();
    }, []);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => {
            if (baseTheme === 'default') {
                setAppTheme(colorScheme as ITheme);
            }
        });
        return () => listener.remove();
    }, [baseTheme]);

    const contextValue = useMemo(() => ({ currentTheme: appTheme, baseTheme, changeTheme }), [appTheme, baseTheme, changeTheme]);

    return (
        <AppThemeContext.Provider value={contextValue}>
            {children}
        </AppThemeContext.Provider>
    );
};

export default AppThemeProvider;
