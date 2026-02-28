import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { useAppTheme } from '$hooks/common';

const AppLoaderModal: React.FC = () => {

    const { colors } = useAppTheme();

    return (
        <Modal
            transparent
            animationType='fade'
            visible={true}
            statusBarTranslucent
        >
            <View style={[styles.container, { backgroundColor: colors.shadow }]}>
                <ActivityIndicator size={'large'} color={colors['brand-primary']} />
            </View>
        </Modal>
    )
}

export default memo(AppLoaderModal);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})