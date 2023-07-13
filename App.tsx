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
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';
import {Text} from 'react-native';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <NavigationContainer>
      <Provider>
        <ReduxProvider store={store}>
          <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
            <MainNavigator />
          </PersistGate>
        </ReduxProvider>
      </Provider>
    </NavigationContainer>
  );
}
export default App;
