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
import {store} from './src/redux/store';
import Purchases from 'react-native-purchases';
import { API_KEY } from './src/Constant';

function App(): JSX.Element {
  useEffect(() => {
    /* Enable debug logs before calling `setup`. */
    Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

    /*
      Initialize the RevenueCat Purchases SDK.

      - appUserID is nil, so an anonymous ID will be generated automatically by the Purchases SDK. Read more about Identifying Users here: https://docs.revenuecat.com/docs/user-ids

      - observerMode is false, so Purchases will automatically handle finishing transactions. Read more about Observer Mode here: https://docs.revenuecat.com/docs/observer-mode

      - useAmazon is false, so it will use the Play Store in Android and App Store in iOS by default.
      */
    Purchases.configure({ apiKey: API_KEY, appUserID: null, observerMode: false, useAmazon: false });
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
