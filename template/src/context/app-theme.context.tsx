import React, { createContext, useEffect, useMemo, useState } from 'react'
import { getData, storeData, storage } from '$utils/storage';
import { EStorageKeys } from '$constants/storage.constants';
import { AppThemeContextProps, ITheme } from '$types/common';
import { useColorScheme, Appearance } from 'react-native';

export const AppThemeContext = createContext<AppThemeContextProps | undefined>(undefined)

const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const systemTheme = useColorScheme() ?? 'light'
    const [appTheme, setAppTheme] = useState<ITheme>(systemTheme);

    function changeTheme(theme: ITheme) {
        try {
            setAppTheme(theme)
            storeData(EStorageKeys.APP_THEME, theme);
        } catch (err) {
            console.log("ERROR: ", err);
        }
    }

    useEffect(() => {
        (async () => {
            const result = await getData(EStorageKeys.APP_THEME);
            if (result) {
                setAppTheme(result as ITheme);
            }
        })()
    }, []);

    useEffect(() => {
        const listener = Appearance.addChangeListener(({ colorScheme }) => setAppTheme(colorScheme as ITheme));
        return () => listener.remove();
    }, [])

    const contextValue = useMemo(() => ({ currentTheme: appTheme, changeTheme }), [appTheme, changeTheme]);

    return (
        <AppThemeContext.Provider value={contextValue}>
            {children}
        </AppThemeContext.Provider>
    )
}

export default AppThemeProvider