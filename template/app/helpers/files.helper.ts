import { IMediaFile } from '$types/common.types';
import { DocumentPickerResponse } from '@react-native-documents/picker';
import { Asset } from 'react-native-image-picker';
import * as mime from 'react-native-mime-types';

export const generateMediaFileSchema = (file: DocumentPickerResponse): IMediaFile => {

    const fileURL = file.uri;
    const filename = fileURL.split('/').pop();

    return {
        name: filename || file.name || 'unknown',
        type: file.type || mime.lookup(fileURL) as string,
        uri: fileURL,
    };
};

export const generateImageFileSchema = (file: Asset): IMediaFile => {

    const filename = file.uri?.split('/').pop();

    return {
        name: filename || file.fileName || 'unknown',
        type: file.type || mime.lookup(file.uri!) as string,
        uri: file.uri!,
    };
};
