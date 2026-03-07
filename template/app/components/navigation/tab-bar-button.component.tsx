import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs'
import { EFonts, moderateScale } from '$constants/styles.constants';
import { ITheme } from '$types/common.types';

interface TabBarButtonProps extends BottomTabBarButtonProps {
    theme: ITheme;
    icons: {
        focused: () => React.ReactNode;
        unfocused: () => React.ReactNode;
    }
}

const TabBarButton: React.FC<TabBarButtonProps> = (props: any) => {

    const {
        icons,
        style,
        theme,
        delayLongPress,
        disabled,
        onLongPress,
        onBlur,
        onFocus,
        pressRetentionOffset,
        pressOpacity,
        ...remainingProps
    } = props;

    const isFocused = remainingProps.accessibilityState?.selected;

    return (
        <TouchableOpacity
            activeOpacity={0.65}
            {...remainingProps}
            disabled={disabled ?? undefined}
            onLongPress={onLongPress ?? undefined}
            delayLongPress={delayLongPress ?? undefined}
            onBlur={onBlur ?? undefined}
            onFocus={onFocus ?? undefined}
            pressRetentionOffset={pressRetentionOffset ?? undefined}
            style={[styles.container, style]}
        >
            {isFocused ? icons.focused() : icons.unfocused()}
        </TouchableOpacity>
    )
}

export default TabBarButton

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontFamily: EFonts.BOLD,
        fontSize: moderateScale(12),
        textAlign: 'center',
        lineHeight: moderateScale(20)
    }
})