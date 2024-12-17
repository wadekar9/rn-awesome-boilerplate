declare module 'react-native-config' {
    export interface NativeConfig {
        BASE_URL: string;
        API_URL: string;
    }

    export const Config: NativeConfig
    export default Config
}