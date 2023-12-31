//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
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
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';

import {getScreenDimensions} from '../../Helper/ScreenDimension';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {
  saveUserData,
  setBusinessDetail,
  setToken,
} from '../../redux/reducers/user/UserReducer';
import {useTranslation} from 'react-i18next';
import {CheckBox} from 'react-native-elements';
import ImagePickerComponent from '../../CustomComponent/ImagePickerComponent';
import {Image} from 'react-native';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;

function SignUpScreen({navigation}: any): JSX.Element {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user);
  const {t, i18n} = useTranslation();

  const [activeSlide, setActiveSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [terms, setTerms] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const pages = [{index: 1}, {index: 2}, {index: 3}];
  const [openModal, setOpenModal] = useState(false);
  const [BusinessImage, setBusinessImage] = useState(null);

  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };

  const addInfo = async () => {
    try {
      const payload: any = {
        name: businessName,
        email: email,
        phone_number: phoneNumber,
        address1: address1,
        address2: address2,
        address3: address3,
        business_logo: BusinessImage,
      };

      dispatch(setBusinessDetail(payload));
    } catch (error) {}
  };

  const handlePrevious = () => {
    if (activeSlide === 0) {
      navigation.goBack();
    } else {
      carouselRef.current.snapToPrev();
    }
  };

  const handleNext = () => {
    if (activeSlide === 2) {
      // if (email.trim() !== '') {
      //   validation();
      // } else {
      addInfo();
      dispatch(setToken('Guest'));
      dispatch(saveUserData({email: 'Guest'}));
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard'}],
      });
      // }
    } else {
      carouselRef.current.snapToNext();
    }
  };

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError(t('businessInfo.emailError'));
    } else {
      setEmailError('');
    }
    setEmail(text);
  };

  const isPasswordValid = (password: any) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/;
    return passwordRegex.test(password);
  };

  const validation = () => {
    if (emailError.trim() !== '') {
      Alert.alert('', t('businessInfo.enterEmail'));
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('', t('businessInfo.confirmPasswordError'));

      setErrorConfirmPassword(t('businessInfo.confirmPasswordError'));
      return;
    }

    if (!isPasswordValid(password)) {
      Alert.alert('', t('businessInfo.verifyPassword'));

      setErrorPassword(t('businessInfo.passwordFormat'));
      return;
    }
    apiCall();
  };

  const validatePassword = (password: any) => {
    setPassword(password);
    if (!isPasswordValid(password)) {
      setErrorPassword(t('businessInfo.passwordFormat'));
    } else {
      setErrorPassword('');
    }
  };

  const validateConfirmPassword = (confirmPassword: any) => {
    setConfirmPassword(confirmPassword);
    if (password !== confirmPassword) {
      setErrorConfirmPassword(t('businessInfo.confirmPasswordError'));
    } else {
      setErrorConfirmPassword('');
    }
  };

  const apiCall = async () => {
    setLoading(true);
    try {
      const payload: any = {
        email: email,
        password: password,
      };
      const data = await FetchAPI('post', endpoint.register, payload);
      if (data.status === 'success') {
        dispatch(saveUserData(data.data));
        dispatch(setToken(data.token));
        navigation.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        });
        setLoading(false);
      }
    } catch (error: any) {
      Alert.alert('', error.message);
      setLoading(false);
    }
  };

  const renderItem = ({item}: any) => {
    if (item.index === 1) {
      return (
        <View style={{alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="email-edit-outline"
            color={'#fff'}
            size={45}
          />
          <Text style={styles.title}>{t('businessInfo.title')}</Text>
          <Text style={styles.paragraph}>
            {t('businessInfo.optionalFields')}
          </Text>
          <View style={{height: 15}} />
          <TextInput
            value={businessName}
            onChangeText={setBusinessName}
            style={[styles.input, styles.businessName]}
            placeholder={'Business Name'}
            placeholderTextColor={'grey'}
            onEndEditing={addInfo}
          />

          <TextInput
            value={email}
            style={[styles.input, styles.emailInput]}
            placeholder={t('businessInfo.email')}
            keyboardType={'email-address'}
            onChangeText={validateEmail}
            placeholderTextColor={'grey'}
            onEndEditing={addInfo}
          />
          {/* {emailError.trim() !== '' && (
            <View style={styles.errorView}>
              <Text style={styles.errorTxt}>{emailError}</Text>
            </View>
          )}
          <View style={[styles.input2]}>
            <TextInput
              value={password}
              onChangeText={validatePassword}
              style={[styles.input]}
              placeholder={t('businessInfo.password')}
              placeholderTextColor={'grey'}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={!showPassword ? 'eye-off' : 'eye'}
                color={'#000'}
                size={15}
              />
            </TouchableOpacity>
          </View>
          {errorPassword.trim() !== '' && (
            <View style={styles.errorView}>
              <Text style={styles.errorTxt}>{errorPassword}</Text>
            </View>
          )}
          <View
            style={[
              styles.input2,
              styles.phoneInput,
              errorConfirmPassword
                ? {borderBottomRightRadius: 0, borderBottomLeftRadius: 0}
                : null,
              {borderTopWidth: 0, marginBottom: 0},
            ]}>
            <TextInput
              value={confirmPassword}
              onChangeText={validateConfirmPassword}
              style={[styles.input]}
              placeholder={t('businessInfo.confirmPassword')}
              placeholderTextColor={'grey'}
              secureTextEntry={!showPassword1}
            />
            <TouchableOpacity onPress={() => setShowPassword1(!showPassword1)}>
              <Ionicons
                name={!showPassword ? 'eye-off' : 'eye'}
                color={'#000'}
                size={15}
              />
            </TouchableOpacity>
          </View>
          {errorConfirmPassword.trim() !== '' && (
            <View
              style={[
                styles.errorView,
                styles.phoneInput,
                {borderTopWidth: 0, marginBottom: 0},
              ]}>
              <Text style={styles.errorTxt}>{errorConfirmPassword}</Text>
            </View>
          )} */}
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={[styles.input, styles.phoneInput]}
            placeholder={'Phone'}
            placeholderTextColor={'grey'}
            keyboardType={'phone-pad'}
            onEndEditing={addInfo}
          />
          <TextInput
            value={address1}
            onChangeText={setAddress1}
            style={[styles.input, styles.addressInput1]}
            placeholder={'Address Line 1'}
            placeholderTextColor={'grey'}
            onEndEditing={addInfo}
          />
          <TextInput
            value={address2}
            onChangeText={setAddress2}
            style={[styles.input, styles.addressInput]}
            placeholder={'Address Line 2'}
            placeholderTextColor={'grey'}
            onEndEditing={addInfo}
          />
          <TextInput
            value={address3}
            onChangeText={setAddress3}
            style={[styles.input, styles.lastAddressInput]}
            placeholder={'Address Line 3'}
            placeholderTextColor={'grey'}
            onEndEditing={addInfo}
          />
          <View
            style={{
              justifyContent: 'center',
              width: '50%',
              flexDirection: 'row',
              marginTop: 10,
            }}>
            <CheckBox
              containerStyle={{
                backgroundColor: Colors.landingColor,
                borderWidth: 0,
                margin: 0,
                padding: 0,
                marginTop: 1,
              }}
              checked={terms}
              onPress={() => {
                setTerms(!terms);
              }}
              checkedColor={'#fff'}
              uncheckedColor="#fff"
              size={25}
            />
            <Text
              style={{
                color: '#fff',
                fontSize: 11,
                fontWeight: '400',
              }}>
              {
                'I want to receive calls and emails from Invoice Simple and its Affiliates about'
              }
              {!showMore && '...'}
              {showMore &&
                ' their products, services, news, events, and promotions. Read our'}{' '}
              {showMore ? (
                <Text
                  style={{textDecorationLine: 'underline'}}
                  onPress={() => {}}>
                  {'Privacy Policy'}
                </Text>
              ) : (
                <Text
                  style={{textDecorationLine: 'underline'}}
                  onPress={() => {
                    setShowMore(!showMore);
                  }}>
                  {'show more'}
                </Text>
              )}
            </Text>
          </View>
        </View>
      );
    } else if (item.index === 2) {
      return (
        <View style={{alignItems: 'center'}}>
          <Ionicons name="ios-images-outline" color={'#fff'} size={45} />
          <Text style={styles.title}>{t('businessLogo.title')}</Text>
          <Text style={styles.paragraph}>{t('businessLogo.description')}</Text>
          {BusinessImage ? (
            <Image
              source={{uri: BusinessImage}}
              resizeMode="contain"
              style={styles.businessImage}
            />
          ) : null}
          <TouchableOpacity
            onPress={() => setOpenModal(true)}
            style={styles.btn}>
            <Text style={styles.btnTxt}>
              {t('businessLogo.chooseImageBtn')}
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={{alignItems: 'center'}}>
          <Ionicons
            name="ios-checkmark-circle-outline"
            color={'#fff'}
            size={45}
          />
          <Text style={styles.title}>{t('allSet.title')}</Text>
          <Text style={styles.paragraph}>{t('allSet.description')}</Text>
          <TouchableOpacity onPress={navigateToAddInvoice} style={styles.btn}>
            <Text style={styles.btnTxt}>{t('allSet.createInvoiceBtn')}</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const saveImage = image => {
    setBusinessImage(image);
  };
  
  const navigateToAddInvoice = () => {
    dispatch(setToken('Guest'));
    dispatch(saveUserData({email: 'Guest'}));
    navigation.reset({
      index: 0,
      routes: [{name: 'Dashboard'}],
    });
    setTimeout(() => {
      navigation.navigate('InvoiceCreation', {status: 'create'});
    }, 1000);
  };
  return (
    <>
      <ModalActivityIndicator
        visible={loading}
        size="large"
        color={Colors.landingColor}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={Colors.landingColor} />

        <View style={styles.header}>
          <View style={{width: '20%'}}>
            <TouchableOpacity onPress={handlePrevious}>
              <Ionicons name="arrow-back" color={'#fff'} size={20} />
            </TouchableOpacity>
          </View>
          <View style={{width: '60%'}}>
            <Pagination
              dotsLength={3}
              activeDotIndex={activeSlide}
              containerStyle={styles.paginationContainer}
              dotStyle={styles.paginationDot}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
          <View style={{width: '20%'}}>
            <Text onPress={handleNext} style={styles.finishTxt}>
              {activeSlide !== 2 ? 'Next' : 'Finish'}
            </Text>
          </View>
        </View>
        <Carousel
          ref={carouselRef}
          data={pages}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth}
          onSnapToItem={(index: number) => setActiveSlide(index)}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
        />
        <ImagePickerComponent
          openModal={openModal}
          closeBottomSheet={closeBottomSheet}
          setImage={saveImage}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.landingColor,
  },
  paragraph: {
    marginVertical: 10,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  btnTxt: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.landingColor,
  },
  btn: {
    backgroundColor: '#fff',
    padding: 10,
    alignSelf: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 15,
    paddingVertical: 15,
  },

  input: {
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
    height: 45,
    padding: 5,
    fontSize: 15,
    color: '#000',
    paddingHorizontal: 8,
    // paddingVertical:15
  },
  emailInput: {
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 4,
  },
  phoneInput: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    marginBottom: 10,
  },
  addressInput1: {
    padding: 4,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  addressInput: {
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    padding: 4,
  },
  lastAddressInput: {
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    marginBottom: 10,
    padding: 4,
  },
  businessName: {marginBottom: 10, borderRadius: 5},
  paginationContainer: {
    paddingVertical: 8,
  },
  paginationDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginHorizontal: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  finishTxt: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 10,
  },
  errorView: {
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
    paddingHorizontal: 4,
  },
  errorTxt: {fontSize: 10, fontWeight: '600', color: 'red'},
  input2: {
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
    height: 40,
    fontSize: 15,
    color: '#000',
    paddingRight: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  businessImage: {
    width: 200,
    height: 200,
  },
});

export default SignUpScreen;
