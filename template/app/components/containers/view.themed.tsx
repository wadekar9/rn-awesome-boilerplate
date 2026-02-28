import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useAppTheme, useSafeAreaInsetsStyle } from '$hooks/common';

interface ThemedViewProps {
    children: React.ReactNode;
}

const ThemedView: React.FC<ThemedViewProps> = ({ children }) => {
    const { colors } = useAppTheme();
    const { paddingTop } = useSafeAreaInsetsStyle(['top']);

    return (
        <View style={[styles.container, { backgroundColor: colors.background, paddingTop }]}>
            {children}
        </View>
    )
}

export default ThemedView;

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})