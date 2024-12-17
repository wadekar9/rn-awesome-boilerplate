/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/dev/i18n-config.dev';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
