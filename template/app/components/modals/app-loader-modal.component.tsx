import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { COLORS } from '$constants/colors.constants';

const AppLoaderModal: React.FC = () => {

    return (
        <Modal
            transparent
            animationType='fade'
            visible={true}
            statusBarTranslucent
        >
            <View style={[styles.container, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                <ActivityIndicator size={'large'} color={COLORS.light.primary} />
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