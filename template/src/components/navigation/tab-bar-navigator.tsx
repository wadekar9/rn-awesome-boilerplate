import { Colors } from '$constants/colors.constants';
import { DEVICE_WIDTH, moderateScale } from '$constants/styles.constants';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DropShadow from "react-native-drop-shadow";
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ITheme } from '$types/common';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';

interface TabBarNavigatorProps extends BottomTabBarProps {
    theme: ITheme;
}

const TAB_BAR_WIDTH = DEVICE_WIDTH - moderateScale(48)

const TabBarNavigator: React.FC<TabBarNavigatorProps> = ({ state, descriptors, navigation, theme }) => {

    const insets = useSafeAreaInsets();
    const styles = styling(theme);
    const TAB_WIDTH = TAB_BAR_WIDTH / state.routes.length;

    const translateAnimation = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: withTiming(TAB_WIDTH * state.index) }],
        };
    });

    return (
        <DropShadow style={[styles.wrapper, { bottom: insets.bottom || moderateScale(24) }]}>
            <View style={styles.container}>

                <Animated.View style={[styles.indicatorWrapper, { width: TAB_WIDTH }, translateAnimation]} />


                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    const TabBarButton = options.tabBarButton as any;

                    return (
                        <TabBarButton
                            key={index.toString()}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1 }}
                        />
                    )
                })}
            </View>
        </DropShadow>
    );
}

export default TabBarNavigator;

const styling = (theme: ITheme) => StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        backgroundColor: Colors[theme].surface,
        borderRadius: moderateScale(50),
        overflow: 'hidden'
    },
    wrapper: {
        width: TAB_BAR_WIDTH,
        height: moderateScale(55),
        alignSelf: 'center',
        position: 'absolute',
        borderRadius: moderateScale(50),
        borderWidth: moderateScale(1),
        borderColor: Colors[theme].border,
        shadowColor: Colors[theme].black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 2
    },
    indicatorWrapper: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: Colors[theme].primary
    },
    indicator: {
        width: moderateScale(24),
        height: moderateScale(2),
        backgroundColor: 'red',
        bottom: moderateScale(6)
    }
});