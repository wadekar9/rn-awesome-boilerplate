import { useCallback } from 'react';
import { generateMediaFileSchema } from '$helpers/files.helper';
import { IMediaFile, MEDIA_TYPE } from '$dto/common';
import { types, pick, isErrorWithCode } from '@react-native-documents/picker';


export const useDocumentPicker = (onSelect: (response: IMediaFile[]) => void) => {
    const openPicker = useCallback(async (mediaType: MEDIA_TYPE[]) => {
        try {
            const response = await pick({
                type: mediaType.map((type) => types[type] as any),
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
    }, [onSelect]);

    return { openPicker };
};
