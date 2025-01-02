import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useAppTheme } from '$hooks/common';

interface ThemedViewProps {
    children: React.ReactNode;
}

const ThemedView: React.FC<ThemedViewProps> = ({ children }) => {
    const { colors } = useAppTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {children}
        </View>
    )
}

export default ThemedView

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})