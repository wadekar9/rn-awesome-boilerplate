import { types } from '@react-native-documents/picker';

export type MEDIA_TYPE = keyof typeof types;

export interface IMediaFile {
    name: string;
    type: string;
    uri: string;
}
