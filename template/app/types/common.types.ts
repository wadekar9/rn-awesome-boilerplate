export type ITheme = 'dark' | 'light';
export type IBaseTheme = 'default' | 'dark' | 'light';

export interface AppThemeContextProps {
  theme: ITheme;
  selectedTheme: IBaseTheme;
  changeTheme: (theme: IBaseTheme) => void;
}

export interface IMediaFile {
    name: string;
    type: string;
    uri: string;
}

export interface BottomSheetRef {
    open: () => void;
    close: () => void;
}