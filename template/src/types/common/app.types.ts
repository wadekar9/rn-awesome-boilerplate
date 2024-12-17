export type ITheme = 'dark' | 'light';

export interface AppThemeContextProps {
    currentTheme: ITheme;
    changeTheme: (theme: ITheme) => void;
}