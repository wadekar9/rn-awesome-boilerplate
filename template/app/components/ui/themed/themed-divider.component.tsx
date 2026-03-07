import React from 'react';
import { StyleSheet, View, ViewProps, ViewStyle, DimensionValue } from 'react-native';
import { useAppTheme } from '$hooks/common';
import { COLORS } from '$constants/colors.constants';
import { ITheme } from '$types/common.types';

interface ThemedDividerProps extends ViewProps {
    theme?: ITheme;
    thickness?: number;
    orientation?: 'horizontal' | 'vertical';
}

const ThemedDivider: React.FC<ThemedDividerProps> = ({
    style,
    theme,
    thickness = StyleSheet.hairlineWidth,
    orientation = 'horizontal',
    ...props
}) => {
    const { theme: appTheme } = useAppTheme();
    const activeTheme = theme || appTheme;
    const colors = COLORS[activeTheme];

    const dividerStyle: ViewStyle = orientation === 'horizontal'
        ? { width: '100%' as DimensionValue, height: thickness }
        : { width: thickness, height: '100%' as DimensionValue };

    return (
        <View
            style={[
                dividerStyle,
                { backgroundColor: colors.border },
                style
            ]}
            {...props}
        />
    );
};

export default React.memo(ThemedDivider);
