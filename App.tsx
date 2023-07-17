/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import MainNavigator from './src/Navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {Provider as ReduxProvider} from 'react-redux';
import { store } from './src/redux/store';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <Provider>
          <MainNavigator />
        </Provider>
      </ReduxProvider>
    </NavigationContainer>
  );
}
export default App;
