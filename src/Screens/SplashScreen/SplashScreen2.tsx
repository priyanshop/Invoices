import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Images} from '../../assets';
import {Colors} from '../../Helper/Colors';
import SplashScreen from 'react-native-splash-screen';
import {useTranslation} from 'react-i18next';

// Define a functional component named Greeting
const SplashScreen2: React.FC = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  const selector = useSelector((state:any) => state.user);

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
    i18n.changeLanguage(selector.language);
  }, [selector.language]);

  useEffect(() => {
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'SplashScreenLoading'}],
      });
    }, 1000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Images.appLogo} style={[styles.image]} />
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
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
    marginTop: 15,
  },
});
// Export the component
export default SplashScreen2;
