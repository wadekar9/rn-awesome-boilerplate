import React from 'react';
import { StatusBar, StyleSheet, View, ViewProps } from 'react-native';
import { useAppTheme } from '$hooks/common';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';
import AppHeader, { AppHeaderProps } from '$components/navigation/app-header.component';
import { ThemedView, KeyboardView } from '$components/ui';
import { KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller';

interface ThemedScreenProps {
    children: React.ReactNode;
    theme?: ITheme;
    preset?: 'fixed' | 'scroll';
    headerComponent?: React.ReactNode;
    headerProps?: AppHeaderProps;
    showStatusBar?: boolean;
    statusBarProps?: React.ComponentProps<typeof StatusBar>;
    containerStyle?: ViewProps['style'];
    keyboardViewProps?: KeyboardAwareScrollViewProps;
}

const ThemedScreen: React.FC<ThemedScreenProps> = ({
    children,
    theme,
    preset = 'fixed',
    headerComponent,
    headerProps,
    showStatusBar = true,
    statusBarProps,
    containerStyle,
    keyboardViewProps,
}) => {
    const { theme: appTheme } = useAppTheme();
    const activeTheme = theme || appTheme;
    const colors = COLORS[activeTheme];

    const Container = preset === 'scroll' ? KeyboardView : ThemedView;

    return (
        <View style={[styles.root, { backgroundColor: colors.background }]}>
            {showStatusBar && (
                <StatusBar
                    barStyle={activeTheme === 'dark' ? 'light-content' : 'dark-content'}
                    backgroundColor="transparent"
                    translucent
                    {...statusBarProps}
                />
            )}

            {headerComponent ? headerComponent : headerProps ? (
                <AppHeader theme={activeTheme} {...headerProps} />
            ) : null}

            <Container
                theme={activeTheme}
                style={[styles.container, containerStyle]}
                {...(preset === 'scroll' ? keyboardViewProps : {})}
            >
                {children}
            </Container>
        </View>
    );
};

export default React.memo(ThemedScreen);

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
});
