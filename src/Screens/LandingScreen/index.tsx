import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import {Images} from '../../assets';

function LandingScreen({navigation}: any): JSX.Element {
  function navigateToSignIn() {
    navigation.navigate('SignIn');
  }

  function navigateToSignUP() {
    navigation.navigate('SignUp');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.landingColor} />
      <Image
        source={Images.appLogo}
        resizeMode="contain"
        style={{height: 100, width: 100, alignSelf: 'center'}}
      />
      <Text style={styles.title}>Invoices Simple</Text>
      <Text style={styles.paragraph}>
        Create professional invoices in secounds!
      </Text>
      <TouchableOpacity onPress={navigateToSignUP} style={styles.btn}>
        <Text style={styles.btnTxt}>GET STARTED</Text>
      </TouchableOpacity>
      <Text style={styles.paragraph}>
        Already have an account?{' '}
        <Text onPress={navigateToSignIn} style={styles.underLine}>
          Login
        </Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.landingColor,
    padding: 8,
  },
  paragraph: {
    marginVertical: 10,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  underLine: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  btnTxt: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.landingColor,
  },
  btn: {
    backgroundColor: '#fff',
    padding: 8,
    alignSelf: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});

export default LandingScreen;
