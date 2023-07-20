/**
 * @format
 */
import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './src/Language/i18next';

if (__DEV__) {
    import("./config/ReactotronConfig").then(() => { });
}

AppRegistry.registerComponent(appName, () => App);
