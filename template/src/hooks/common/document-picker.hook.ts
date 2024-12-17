import { generateMediaFileSchema } from '$helpers/files.helper';
import { IMediaFile } from '$types/common';
import DocumentPicker, { types } from 'react-native-document-picker';

export type MEDIA_TYPE = keyof typeof types;

export const useDocumentPicker = (onSelect: (response: IMediaFile[]) => void) => {
    const openPicker = async (mediaType: MEDIA_TYPE[]) => {
        try {
            const response = await DocumentPicker.pick({
                type: mediaType.map((type) => types[type]),
                copyTo: 'documentDirectory',
                mode: 'open',
                allowMultiSelection : true
            });
            if (response.length) onSelect(response.map(e => generateMediaFileSchema(e)));
        } catch (error) {
            if (!DocumentPicker.isCancel(error)) {
                console.error("Document Picker Error:", error);
            }
        }
    };

    return { openPicker };
};