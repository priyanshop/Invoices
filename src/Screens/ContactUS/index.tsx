import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StatusBar,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../Helper/Colors';
import {useTranslation} from 'react-i18next';
import MessageButton from '../../CustomComponent/MessageButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import ToastService from '../../Helper/ToastService';
import Loader from '../../CustomComponent/Loader';

const ContactUs = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const selector = useSelector((state: any) => state.user);
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    name: '',
    email: '',
    message: '',
    contactNo: '',
  });

  const setTrue = () => setIsLoading(true);
  const setFalse = () => setIsLoading(false);
  const handleKeyboardShow = () => setKeyboardVisible(true);
  const handleKeyboardHide = () => setKeyboardVisible(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const addInfo = async () => {
    try {
      const payload: any = {
        name: Name,
        email: email,
        contact: contactNo,
        message: message,
      };
      if (selector.token === 'Guest') {
        // dispatch(changeCustomize(payload));
      } else {
        const data = await FetchAPI('post', endpoint.contactUs, payload, {
          Authorization: 'Bearer ' + selector.token,
        });
        if (data.status === 'success') {
          successMessage();
        }
      }
    } catch (error) {
      setFalse();
    }
  };
  const successMessage = () => {
    setIsLoading(false);
    ToastService.showToast('Message sent successfully');
    navigation.goBack();
  };
  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
  };

  const validateFields = () => {
    let isValid = true;
    const newError = {
      name: '',
      email: '',
      message: '',
      contactNo: '',
    };

    if (!Name.trim()) {
      isValid = false;
      newError.name = 'Name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(Name)) {
      isValid = false;
      newError.name =
        'Name can only contain alphabetical characters and spaces.';
    }

    // Email validation
    if (!email.trim()) {
      isValid = false;
      newError.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
      newError.email = 'Please enter a valid email address.';
    }

    // Message validation
    if (!message.trim()) {
      isValid = false;
      newError.message = 'Message is required.';
    } else if (message.length > 200) {
      isValid = false;
      newError.message = 'Message should not exceed 200 characters.';
    }

    // Contact Number validation
    if (!contactNo.trim()) {
      isValid = false;
      newError.contactNo = 'Contact Number is required.';
    } else if (!/^[0-9]+$/.test(contactNo)) {
      isValid = false;
      newError.contactNo =
        'Contact Number should only contain numeric characters.';
    }

    setError(newError);

    return isValid;
  };

  const handleButtonClick = () => {
    if (validateFields()) {
      addInfo();
      console.log('All fields are valid. Do something here.');
    } else {
      console.log('Some fields are invalid. Check error messages.');
    }
  };

  const validateField = (fieldName: any, value: any) => {
    let isValid = true;
    let errorMessage = '';

    // Validation logic for each field
    switch (fieldName) {
      case 'name':
        if (!value.trim()) {
          isValid = false;
          errorMessage = 'Name is required.';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          isValid = false;
          errorMessage =
            'Name can only contain alphabetical characters and spaces.';
        }
        break;

      case 'email':
        if (!value.trim()) {
          isValid = false;
          errorMessage = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          isValid = false;
          errorMessage = 'Please enter a valid email address.';
        }
        break;

      case 'message':
        if (!value.trim()) {
          isValid = false;
          errorMessage = 'Message is required.';
        } else if (value.length > 200) {
          isValid = false;
          errorMessage = 'Message should not exceed 200 characters.';
        }
        break;

      case 'contactNo':
        if (!value.trim()) {
          isValid = false;
          errorMessage = 'Contact Number is required.';
        } else if (!/^[0-9]+$/.test(value)) {
          isValid = false;
          errorMessage =
            'Contact Number should only contain numeric characters.';
        }
        break;

      default:
        break;
    }

    setError(prevError => ({
      ...prevError,
      [fieldName]: errorMessage,
    }));

    return isValid;
  };
  const handleBlur = (fieldName: any, value: any) => {
    validateField(fieldName, value);
  };
  return (
    <View style={styles.mainContainer}>
      <Loader visible={isLoading} size="large" color={Colors.landingColor} />
      <StatusBar backgroundColor={Colors.appColor} />
      <KeyboardAwareScrollView>
        <View style={styles.businessContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('name')}</Text>
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={Name}
              onChangeText={value => handleTextInputChange(value, setName)}
              onBlur={() => handleBlur('name', Name)}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Enter Name')}
              placeholderTextColor={'grey'}
            />
          </View>
        </View>
        {error.name !== '' && <Text style={{color: 'red'}}>{error.name}</Text>}

        <View style={styles.businessContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('Email')}</Text>
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={email}
              onChangeText={value => handleTextInputChange(value, setEmail)}
              onBlur={() => handleBlur('email', email)}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Enter Email')}
              placeholderTextColor={'grey'}
            />
          </View>
        </View>
        {error.email !== '' && (
          <Text style={{color: 'red'}}>{error.email}</Text>
        )}

        <View style={styles.businessContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('Contact No')}</Text>
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={contactNo}
              onChangeText={value => handleTextInputChange(value, setContactNo)}
              onBlur={() => handleBlur('contactNo', contactNo)}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Enter Contact No.')}
              placeholderTextColor={'grey'}
            />
          </View>
        </View>
        {error.contactNo !== '' && (
          <Text style={{color: 'red'}}>{error.contactNo}</Text>
        )}

        <View style={styles.businessContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('Message')}</Text>
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={message}
              onChangeText={value => handleTextInputChange(value, setMessage)}
              onBlur={() => handleBlur('message', message)}
              style={{
                ...styles.titleTxt,
                flex: 1,
                textAlign: 'left',
                height: 60,
                textAlignVertical: 'top',
              }}
              placeholder={t('Enter Message')}
              placeholderTextColor={'grey'}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
        {error.message !== '' && (
          <Text style={{color: 'red'}}>{error.message}</Text>
        )}

        <TouchableOpacity
          onPress={handleButtonClick}
          style={styles.statementBtn}>
          <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
            {t('Send')}
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
      {/* {!keyboardVisible && <MessageButton />} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.commonBg,
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 8,
    padding: 2,
    paddingHorizontal: 8,
  },
  titleTxt: {
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
    textAlign: 'center',
    height: 40,
  },
  mainContain: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 8,
    marginVertical: 5,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '18%',
    backgroundColor: '#F8FAFE',
    width: '100%',
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  innerView: {flex: 1, paddingHorizontal: 8},
  businessContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.landingColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  businessImage: {
    width: 200,
    height: 250,
  },
  cameraIcon: {
    fontSize: 50,
    color: '#d4d4d4',
  },
  statementBtn: {
    backgroundColor: Colors.appColor,
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    marginVertical: 5,
  },
  titleTxt2: {fontSize: 17, color: '#000', fontWeight: '400'},
});

export default ContactUs;
