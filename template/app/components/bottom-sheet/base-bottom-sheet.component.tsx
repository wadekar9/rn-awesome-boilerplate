import { Keyboard, StyleSheet, View } from 'react-native'
import React, { forwardRef, useImperativeHandle } from 'react'
import ActionSheet, { ActionSheetProps, ActionSheetRef } from "react-native-actions-sheet";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '$hooks/common';
import { BottomSheetRef, ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import { moderateScale } from '$constants/styles.constants';

export interface BaseBottomSheetRef extends BottomSheetRef { }

export interface BaseBottomSheetProps {
    children: React.ReactNode;
    sheetProps?: ActionSheetProps;
    sheetHeight?: number;
}

const BaseBottomSheet = forwardRef<BaseBottomSheetRef, BaseBottomSheetProps>((props, ref) => {

    const { colors, theme } = useAppTheme();
    const sheetRef = React.useRef<ActionSheetRef>(null);
    const safeAreaInsets = useSafeAreaInsets();
    const styles = styling(theme);

    const openSheet = () => {
        sheetRef.current?.show();
    };

    const closeSheet = () => {
        Keyboard.dismiss();
        sheetRef.current?.hide();
    };

    useImperativeHandle(ref, () => ({
        open: () => openSheet(),
        close: () => closeSheet()
    }), []);

    return (
        <>
            <ActionSheet
                closeOnTouchBackdrop
                closeOnPressBack
                containerStyle={{
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: moderateScale(42),
                    borderTopRightRadius: moderateScale(42),
                    overflow: 'hidden'
                }}
                animated={true}
                gestureEnabled={false}
                ref={sheetRef}
                keyboardHandlerEnabled={true}
                statusBarTranslucent={true}
                safeAreaInsets={safeAreaInsets}
                defaultOverlayOpacity={0.8}
                {...props.sheetProps}
            >
                <View style={[styles.wrapper, { height: props.sheetHeight || moderateScale(354) }]}>
                    <View style={styles.indicatorWrapper}>
                        <View style={[styles.handleIndicatorStyle, { backgroundColor: colors.background }]} />
                    </View>
                    {props.children}
                </View>
            </ActionSheet>
        </>
    )
})

export default React.memo(BaseBottomSheet);

const styling = (theme: ITheme) => StyleSheet.create({
    wrapper: {
        backgroundColor: COLORS[theme].surface,
        gap: moderateScale(5)
    },
    contentContainer: {
        flex: 1
    },
    handleIndicatorStyle: {
        width: moderateScale(50),
        height: moderateScale(4),
        opacity: 0.25,
        borderRadius: moderateScale(10)
    },
    indicatorWrapper: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: moderateScale(18)
    }
});
