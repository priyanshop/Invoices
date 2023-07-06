import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../Helper/Colors';

function SignInScreen(): JSX.Element {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [Password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
    setEmail(text);
  };

  const validatePassword = (text: string) => {
    if (!(text.length >= 8)) {
      setPasswordError('Invalid Password');
    } else {
      setPasswordError('');
    }
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.landingColor} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={email}
        style={[styles.input, styles.addressInput1]}
        placeholder={'Email'}
        onChangeText={validateEmail}
        placeholderTextColor={'grey'}
      />
      {emailError.trim() !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorTxt}>{emailError}</Text>
        </View>
      )}
      <TextInput
        value={Password}
        style={styles.input}
        placeholder={'Password'}
        onChangeText={validatePassword}
        placeholderTextColor={'grey'}
      />
      {passwordError.trim() !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorTxt}>{passwordError}</Text>
        </View>
      )}
      <TouchableOpacity style={[styles.input, styles.lastAddressInput]}>
        <Text style={styles.loginBtnTxt}>Login</Text>
      </TouchableOpacity>

      <View style={styles.hyperlinkView}>
        <Text style={styles.hyperlink}>Forgot Password?</Text>
        <Text style={styles.hyperlink}>Contact Support</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.landingColor,
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '75%',
    alignSelf: 'center',
    height: 40,
    padding: 5,
    fontSize: 15,
    color: '#000',
  },
  errorView: {
    backgroundColor: '#fff',
    width: '75%',
    alignSelf: 'center',
    paddingHorizontal: 4,
  },
  addressInput1: {
    padding: 4,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  lastAddressInput: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    marginBottom: 10,
    padding: 4,
    justifyContent: 'center',
  },
  hyperlink: {
    fontSize: 13,
    fontWeight: '700',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  hyperlinkView: {
    width: '75%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  errorTxt: {fontSize: 10, fontWeight: '600', color: 'red'},
  loginBtnTxt: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});

export default SignInScreen;
