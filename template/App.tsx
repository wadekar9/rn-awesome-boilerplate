import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppThemeProvider from '$context/app-theme.context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider as StoreProvider } from 'react-redux';
import store from '$store/redux.store';
import FlashMessage from 'react-native-flash-message';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStackNavigator from '$navigation/root-stack-navigator';
import { container } from '$styles/flexbox';

const App = () => {
  return (
    <AppThemeProvider>
      <StoreProvider store={store}>
        <KeyboardProvider>
          <SafeAreaProvider>
            <GestureHandlerRootView style={container}>
              <RootStackNavigator />
            </GestureHandlerRootView>
          </SafeAreaProvider>
        </KeyboardProvider>
      </StoreProvider>

      <FlashMessage position="top" />
    </AppThemeProvider>
  );
};

export default App;
