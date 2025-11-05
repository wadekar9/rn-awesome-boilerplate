declare module 'react-native-config' {
    export interface NativeConfig {
        ENVIRONMENT: string;
        BASE_URL : string;
    }

    export const Config: NativeConfig
    export default Config
}