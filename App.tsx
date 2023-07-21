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
import SwipeApp from './src/Screens/SwipeScreen';
import SwipeAppWithImages from './src/Screens/SwipeScreen/WithImages';
import SwipeAppWithCarousel from './src/Screens/SwipeScreen/WithCarousel';

function App(): JSX.Element {
  

  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <Provider>
          <SwipeAppWithCarousel />
        </Provider>
      </ReduxProvider>
    </NavigationContainer>
  );
}
export default App;
