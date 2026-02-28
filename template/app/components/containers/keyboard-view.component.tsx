import React from 'react'
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-controller'

interface KeyboardViewProps extends KeyboardAwareScrollViewProps {
    children: React.ReactNode;
}

const KeyboardView: React.FC<KeyboardViewProps> = (props) => {
    return (
        <KeyboardAwareScrollView
            bounces={false}
            overScrollMode={'never'}
            bouncesZoom={false}
            keyboardDismissMode={'interactive'}
            bottomOffset={25}
            automaticallyAdjustKeyboardInsets={false}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            {...props}
        >
            {props.children}
        </KeyboardAwareScrollView>
    )
}

export default React.memo(KeyboardView);