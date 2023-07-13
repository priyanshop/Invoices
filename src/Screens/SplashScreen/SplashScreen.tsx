import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Images} from '../../assets';
import {Colors} from '../../Helper/Colors';

// Define a functional component named Greeting
const SplashScreen: React.FC = ({navigation}: any) => {
  // Return a React element
  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'LandingPage'}],
      });
    }, 1000);
  }, []);

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
export default SplashScreen;
