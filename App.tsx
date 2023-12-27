/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import MainNavigator from './src/Navigation/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-native-paper';
import SplashScreen from 'react-native-splash-screen';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/redux/store';
import Purchases from 'react-native-purchases';
import {Alert, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {StyleSheet} from 'react-native';
import {Pressable} from 'react-native';

function App(): JSX.Element {
  const [packages, setPackages] = useState<any>([]);

  useEffect(() => {
    SplashScreen.hide();
    Purchases.configure({apiKey: ''});
    getPackages();
  }, []);

  const getPackages = async () => {
    try {
      const offerings = await Purchases.getOfferings();
      console.log(
        '🚀 ~ file: App.tsx:33 ~ getPackages ~ offerings:',
        offerings,
      );

      if (
        offerings.current !== null &&
        offerings.current.availablePackages.length !== 0
      ) {
        // Display packages for sale
        setPackages(offerings.current.availablePackages);
      }
    } catch (e: any) {
      console.log('e ->', e);

      Alert.alert('Error getting offers', e.message);
    }
  };

  const onSelection = async (item: any) => {
    // setIsPurchasing(true);

    try {
      const {customerInfo, productIdentifier} = await Purchases.purchasePackage(
        item,
      );

      console.log('customerInfo ->', JSON.stringify(customerInfo));
      console.log('productIdentifier ->', JSON.stringify(productIdentifier));

      // if (typeof customerInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
      //   // Unlock that great "pro" content
      // }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert('Error purchasing package', e.message);
      }
    } finally {
      // setIsPurchasing(false);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {packages.map((item: any, index: number) => {
        const {
          product: {title, description, priceString},
        } = item;
        return (
          <TouchableOpacity
            key={index + ''}
            onPress={() => {
              onSelection(item);
            }}
            style={styles.container}>
            <View style={{}}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.terms}>{description}</Text>
            </View>
            <Text style={styles.title}>{priceString}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
  // return (
  //   <NavigationContainer>
  //     <ReduxProvider store={store}>
  //       <Provider>
  //         <MainNavigator />
  //       </Provider>
  //     </ReduxProvider>
  //   </NavigationContainer>
  // );
}
export default App;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#242424',
    marginHorizontal: 10,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  terms: {
    color: 'darkgrey',
  },
});
