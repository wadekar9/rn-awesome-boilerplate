import { Colors } from '$constants/colors.constants';
import { ITheme } from '$types/common.types';
import { StyleSheet } from 'react-native';

export const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors[theme].background,
    },
});
