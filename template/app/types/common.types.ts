export type ITheme = 'dark' | 'light';
export type IBaseTheme = 'default' | 'dark' | 'light';

export interface AppThemeContextProps {
    currentTheme: ITheme;
    baseTheme: IBaseTheme;
    changeTheme: (theme: ITheme) => void;
}

export interface IMediaFile {
    name: string;
    type: string;
    uri: string;
}
