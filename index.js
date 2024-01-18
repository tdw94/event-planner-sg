/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import './i18n';
import 'react-native-gesture-handler';
import { backgroundNotificationHandler } from './app/services/firebase/notification';

backgroundNotificationHandler(() => {
  // handle Quit state notifications here
});

AppRegistry.registerComponent(appName, () => App);
