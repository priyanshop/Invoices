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
import {I18nextProvider, useTranslation} from 'react-i18next';
import i18n from './src/Language/i18n';

function App(): JSX.Element {
  const {t, i18n} = useTranslation();

  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <Provider>
            <MainNavigator />
          </Provider>
        </I18nextProvider>
      </ReduxProvider>
    </NavigationContainer>
  );
}
export default App;
