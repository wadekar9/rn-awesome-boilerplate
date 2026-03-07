import { StyleSheet, View, ViewProps, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { moderateScale } from '$constants/styles.constants';
import { useAppTheme, useSafeAreaInsetsStyle } from '$hooks/common';
import { IconButton, ThemeText } from '$components/ui';
import { ArrowLeft } from 'lucide-react-native';
import { ITheme } from '$types/common.types';
import { COLORS } from '$constants/colors.constants';

export interface AppHeaderProps extends Omit<ViewProps, 'style'> {
    title?: string;
    leftComponent?: React.ReactNode;
    rightComponent?: React.ReactNode;
    showBackButton?: boolean;
    onBackPress?: () => void;
    theme?: ITheme;
    containerStyle?: ViewProps['style'];
}

const AppHeader: React.FC<AppHeaderProps> = ({
    title,
    leftComponent,
    rightComponent,
    showBackButton = true,
    onBackPress,
    theme,
    containerStyle,
    ...props
}) => {
    const { paddingTop } = useSafeAreaInsetsStyle(['top']);
    const navigation = useNavigation();
    const { theme: appTheme } = useAppTheme();

    const activeTheme = theme || appTheme;
    const colors = COLORS[activeTheme];

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else if (navigation.canGoBack()) {
            navigation.goBack();
        }
    };

    const renderLeft = () => {
        if (leftComponent) return leftComponent;
        if (showBackButton) {
            return (
                <IconButton
                    onPress={handleBack}
                    style={styles.icon}
                    accessibilityLabel="Go back"
                >
                    <ArrowLeft width={moderateScale(22)} height={moderateScale(22)} color={colors['icon-default']} />
                </IconButton>
            );
        }
        return <View style={styles.iconPlaceholder} />;
    };

    return (
        <View
            {...props}
            accessibilityRole="header"
            style={[
                styles.wrapper,
                { paddingTop, backgroundColor: colors.background },
                containerStyle
            ]}
        >
            <View style={styles.container}>
                <View style={styles.leftSection}>
                    {renderLeft()}
                </View>

                <View style={styles.titleWrapper}>
                    {title && (
                        <ThemeText variant='h4' numberOfLines={1} style={styles.title}>
                            {title}
                        </ThemeText>
                    )}
                </View>

                <View style={styles.rightSection}>
                    {rightComponent}
                </View>
            </View>
        </View>
    )
}

export default React.memo(AppHeader);

const styles = StyleSheet.create({
    wrapper: {
        zIndex: 5000,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'transparent', // Default no border, can be overridden
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: moderateScale(50),
        paddingHorizontal: moderateScale(4),
    },
    leftSection: {
        width: moderateScale(60),
        justifyContent: 'center',
        zIndex: 1,
    },
    rightSection: {
        width: moderateScale(60),
        alignItems: 'flex-end',
        justifyContent: 'center',
        zIndex: 1,
        paddingRight: moderateScale(12),
    },
    titleWrapper: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(70),
    },
    title: {
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    icon: {
        width: moderateScale(44),
        height: moderateScale(44),
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconPlaceholder: {
        width: moderateScale(44),
    }
})
