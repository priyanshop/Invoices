import React, {useState} from 'react';
import {
  Alert,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '../../Helper/Colors';
import {saveUserData, setToken} from '../../redux/reducers/user/UserReducer';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {useTranslation} from 'react-i18next';

function SignInScreen({navigation}: any): JSX.Element {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [Password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError(t('businessInfo.emailError'));
    } else {
      setEmailError('');
    }
    setEmail(text);
  };

  const validatePassword = (text: string) => {
    if (!(text.length >= 8)) {
      setPasswordError(t('businessInfo.passwordError'));
    } else {
      setPasswordError('');
    }
    setPassword(text);
  };

  const handleNext = () => {
    // navigation.navigate('Dashboard');
    apiCall();
  };

  const apiCall = async () => {
    try {
      const payload = {
        email: email,
        password: 'nitish@123',
      };
      const data = await FetchAPI('post', endpoint.login, payload);
      if (data.status === 'success') {
        dispatch(saveUserData(data.data));
        dispatch(setToken(data.token));
        navigation.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        });
      }
    } catch (error) {
      Alert.alert('', error.message);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.landingColor} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        value={email}
        style={[styles.input, styles.addressInput1]}
        placeholder={t('businessInfo.email')}
        onChangeText={validateEmail}
        placeholderTextColor={'grey'}
        keyboardType={'email-address'}
      />
      {emailError.trim() !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorTxt}>{emailError}</Text>
        </View>
      )}
      <TextInput
        value={Password}
        style={styles.input}
        placeholder={t('businessInfo.password')}
        onChangeText={validatePassword}
        placeholderTextColor={'grey'}
      />
      {passwordError.trim() !== '' && (
        <View style={styles.errorView}>
          <Text style={styles.errorTxt}>{passwordError}</Text>
        </View>
      )}
      <TouchableOpacity
        onPress={handleNext}
        style={[styles.input, styles.lastAddressInput]}>
        <Text style={styles.loginBtnTxt}>{t('login')}</Text>
      </TouchableOpacity>

      <View style={styles.hyperlinkView}>
        <Text style={styles.hyperlink}>{t('ForgotPassword')}</Text>
        <Text style={styles.hyperlink}>{t('ContactSupport')}</Text>
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
