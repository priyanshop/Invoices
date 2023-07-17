import React, {useEffect, useRef, useState} from 'react';
import {
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
import {saveUserData, setToken} from '../../redux/reducers/user/UserReducer';
const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;

function SignUpScreen({navigation}: any): JSX.Element {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.user);

  const [activeSlide, setActiveSlide] = useState(0);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const pages = [{index: 1}, {index: 2}, {index: 3}];

  const handlePrevious = () => {
    if (activeSlide === 0) {
      navigation.goBack();
    } else {
      carouselRef.current.snapToPrev();
    }
  };

  const handleNext = () => {
    if (activeSlide === 2) {
      // navigation.navigate('Dashboard');
      apiCall();
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'Dashboard'}],
      // });
    } else {
      carouselRef.current.snapToNext();
    }
  };
useEffect(() => {
  console.log(selector.userData);
  
}, [selector.userData])

  const validateEmail = (text: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(text)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
    setEmail(text);
  };

  const apiCall = async () => {
    try {
      const payload = {
        email: email,
        password: 'nitish@123',
      };
      const data = await FetchAPI('post', endpoint.register, payload);
      if (data.status === 'success') {
        dispatch(saveUserData(data.data));
        dispatch(setToken(data.token));
      }
    } catch (error) {}
  };

  const renderItem = ({item}) => {
    if (item.index === 1) {
      return (
        <View style={{alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="email-edit-outline"
            color={'#fff'}
            size={45}
          />
          <Text style={styles.title}>Business Info</Text>
          <Text style={styles.paragraph}>(All fields are optional)</Text>
          <TextInput
            value={businessName}
            onChangeText={setBusinessName}
            style={[styles.input, styles.businessName]}
            placeholder={'Business Name'}
            placeholderTextColor={'grey'}
          />

          <TextInput
            value={email}
            style={[styles.input, styles.emailInput]}
            placeholder={'Email'}
            keyboardType={'email-address'}
            onChangeText={validateEmail}
            placeholderTextColor={'grey'}
          />
          {emailError.trim() !== '' && (
            <View style={styles.errorView}>
              <Text style={styles.errorTxt}>{emailError}</Text>
            </View>
          )}
          <TextInput
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={[styles.input, styles.phoneInput]}
            placeholder={'Phone'}
            placeholderTextColor={'grey'}
            keyboardType={'phone-pad'}
          />
          <TextInput
            value={address1}
            onChangeText={setAddress1}
            style={[styles.input, styles.addressInput1]}
            placeholder={'Address Line 1'}
            placeholderTextColor={'grey'}
          />
          <TextInput
            value={address2}
            onChangeText={setAddress2}
            style={[styles.input, styles.addressInput]}
            placeholder={'Address Line 2'}
            placeholderTextColor={'grey'}
          />
          <TextInput
            value={address3}
            onChangeText={setAddress3}
            style={[styles.input, styles.lastAddressInput]}
            placeholder={'Address Line 3'}
            placeholderTextColor={'grey'}
          />
        </View>
      );
    } else if (item.index === 2) {
      return (
        <View style={{alignItems: 'center'}}>
          <Ionicons name="ios-images-outline" color={'#fff'} size={45} />
          <Text style={styles.title}>Business Logo</Text>
          <Text style={styles.paragraph}>
            Appears on all invoices. Can be edited ny time
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>CHOOSE IMAGE</Text>
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
          <Text style={styles.title}>All Set!</Text>
          <Text style={styles.paragraph}>
            You're ready to create your first Invoice
          </Text>
          <TouchableOpacity style={styles.btn}>
            <Text style={styles.btnTxt}>CREATE INVOICE</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
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
    </SafeAreaView>
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
    fontSize: 15,
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
  },

  input: {
    backgroundColor: '#fff',
    width: '60%',
    alignSelf: 'center',
    height: 40,
    padding: 5,
    fontSize: 15,
    color: '#000',
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
    padding: 4,
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
});

export default SignUpScreen;
