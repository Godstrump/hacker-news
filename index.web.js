import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
if (module.hot) {
  module.hot.accept();
}

const APP_NAME = appName + 'Web';

AppRegistry.registerComponent(APP_NAME, () => App);
AppRegistry.runApplication(APP_NAME, {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});
