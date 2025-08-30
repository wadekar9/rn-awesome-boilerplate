import { generateMediaFileSchema } from '$helpers/files.helper';
import { IMediaFile } from '$types/common';
import { types, pick, isErrorWithCode } from '@react-native-documents/picker';

export type MEDIA_TYPE = keyof typeof types;

export const useDocumentPicker = (onSelect: (response: IMediaFile[]) => void) => {
    const openPicker = async (mediaType: MEDIA_TYPE[]) => {
        try {
            const response = await pick({
                type: mediaType.map((type) => types[type]),
                copyTo: 'documentDirectory',
                mode: 'open',
                allowMultiSelection: true,
            });
            if (response.length) {
                onSelect(response.map(e => generateMediaFileSchema(e)));
            }
        } catch (error) {
            if (!isErrorWithCode(error)) {
                console.error('Document Picker Error:', error);
            }
        }
    };

    return { openPicker };
};
