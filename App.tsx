/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import LandingScreen from './src/Screens/LandingScreen';
import SignInScreen from './src/Screens/Auth/SignInScreen';
import SignUpScreen from './src/Screens/Auth/SignUpScreen';
import InvoicesScreen from './src/Screens/Dashboard/Invoices';
import MainNavigator from './src/Navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Provider>
        <MainNavigator />
      </Provider>
    </NavigationContainer>
  );
}
export default App;
