import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Images} from '../../assets';
import {Colors} from '../../Helper/Colors';
import SplashScreen from 'react-native-splash-screen';

// Define a functional component named Greeting
const SplashScreenLoading: React.FC = ({navigation}: any) => {
  // Return a React element
  const selector = useSelector(state => state.user);
  useEffect(() => {
    // SplashScreen.hide(); //hides the splash screen on app load.
  }, []);
  useEffect(() => {
    console.log('USER');

    if (selector.token) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard'}],
      });
      SplashScreen.hide();
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'LandingPage'}],
      });
      SplashScreen.hide();
    }
  }, [selector.token]);

  return (
    <View style={styles.container}>
      <Image source={Images.appLogo} style={[styles.image]} />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appColor,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
});
// Export the component
export default SplashScreenLoading;
