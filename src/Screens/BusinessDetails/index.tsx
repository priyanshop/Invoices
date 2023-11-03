import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import ImagePickerComponent from '../../CustomComponent/ImagePickerComponent';
import ModalActivityIndicator from '../../CustomComponent/Loader';
import {Colors} from '../../Helper/Colors';
import FetchAPI, {IMAGE_BASE_URL} from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {
  setBusinessDetail,
  setEstimateList,
  setInvoiceList,
} from '../../redux/reducers/user/UserReducer';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {GlobalStyle} from '../../Helper/GlobalStyle';
import ToastService from '../../Helper/ToastService';

const BusinessDetails = ({navigation, route}: any) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.user);
  const isFocused = useIsFocused();
  const [openModal, setOpenModal] = useState(false);
  const [BusinessImage, setBusinessImage] = useState(null);
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Mobile, setMobile] = useState('');
  const [Website, setWebsite] = useState('');
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [businessId, setBusinessId] = useState('');
  const [Loader, setLoader] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [businessNameError, setBusinessNameError] = useState('');
  const [businessNumberError, setBusinessNumberError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [websiteError, setWebsiteError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const setTrue = () => setLoader(true);
  const setFalse = () => setLoader(false);
  useEffect(() => {
    if (route?.params?.invoiceUpdate || route?.params?.estimateUpdate) {
      if (route.params.data) {
        const businessDetails = route.params.data;
        if (selector.token === 'Guest') {
          setBusinessImage(businessDetails.b_business_logo);
        } else {
          setBusinessImage(
            IMAGE_BASE_URL.concat(businessDetails.b_business_logo),
          );
        }
        setAlreadyExist(true);
        setPhone(businessDetails.b_phone_number);
        setAddress1(businessDetails.b_address1);
        setAddress2(businessDetails.b_address2);
        setAddress3(businessDetails.b_address3);
        setBusinessName(businessDetails.b_name);
        setEmail(businessDetails.b_email);
        setBusinessNumber(businessDetails?.b_business_number?.toString() || '');
        setMobile(businessDetails.b_mobile_number);
        setWebsite(businessDetails.b_website);
        setOwnerName(businessDetails?.b_owner_name || '');

        // b_business_logo
      } else {
        getData();
      }
    } else {
      getData();
    }
  }, [route.params]);

  const getData = () => {
    if (selector.token === 'Guest') {
      const businessDetails = selector.businessDetails;
      setAlreadyExist(true);
      setPhone(businessDetails.phone_number);
      setAddress1(businessDetails.address1);
      setAddress2(businessDetails.address2);
      setAddress3(businessDetails.address3);
      setBusinessName(businessDetails.name);
      setEmail(businessDetails.email);
      setBusinessNumber(businessDetails.business_number);
      setWebsite(businessDetails.website);
      setOwnerName(businessDetails.owner_name);
      setMobile(businessDetails.mobile_number);
      setBusinessImage(businessDetails.business_logo);
    } else {
      getInfo();
    }
  };

  // useEffect(() => {
  //   if (selector.token === 'Guest') {
  //     getData();
  // }}, []);

  const getInfo = async () => {
    try {
      const data = await FetchAPI('get', endpoint.businessInfo, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data.business_details;
        if (element.email) {
          setAlreadyExist(true);
          setBusinessId(data.data._id);
        }
        setPhone(element.phone_number);
        setAddress1(element.address1);
        setAddress2(element.address2);
        setAddress3(element.address3);
        setBusinessName(element.name);
        setBusinessImage(IMAGE_BASE_URL.concat(element.business_logo));
        setWebsite(element.website);
        setMobile(element.mobile_number);
        setEmail(element.email);
        setOwnerName(element.owner_name);
        setBusinessNumber(element.business_number?.toString());
      }
    } catch (error) {}
  };
  const phoneRegex = /^\d{10}$/;

  const isValidPhoneNumber = (number: any) => {
    return phoneRegex.test(number);
  };
  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setEmailError('Invalid email address');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (businessName.trim() === '') {
      setBusinessNameError('Business name is required');
      isValid = false;
    } else {
      setBusinessNameError('');
    }

    if (businessNumber && !businessNumber.match(/^\d+$/)) {
      setBusinessNumberError('Invalid business number');
      isValid = false;
    } else {
      setBusinessNumberError('');
    }

    // if (!isValidPhoneNumber(Phone)) {
    //   setPhoneError('Invalid phone number');
    //   isValid = false;
    // } else {
    //   setPhoneError('');
    // }

    // if (Mobile && !Mobile.match(/^\d+$/)) {
    //   setMobileError('Invalid mobile number');
    //   isValid = false;
    // } else {
    //   setMobileError('');
    // }

    // if (!Website.match(/^(http|https):\/\/.+/i)) {
    //   setWebsiteError('Invalid website URL');
    //   isValid = false;
    // } else {
    //   setWebsiteError('');
    // }

    if (
      Website &&
      !Website.match(
        /^(https?:\/\/)?([a-zA-Z0-9-]+\.)?[a-zA-Z0-9][a-zA-Z0-9-]+\.[a-z]{2,}$/i,
      )
    ) {
      setWebsiteError('Invalid website URL');
      isValid = false;
    } else {
      setWebsiteError('');
    }

    if (isValid) {
      checkUpdate();
    }
  };

  const checkUpdate = () => {
    setLoader(true);
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        offlineInvoiceUpdate();
      } else {
        updateInvoice();
      }
    } else if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        offlineEstimateUpdate();
      } else {
        updateEstimate();
      }
    } else {
      if (alreadyExist) {
        updateInfo();
      } else {
        addInfo();
      }
    }
  };

  const addInfo = async () => {
    try {
      const payload: any = {
        name: businessName,
        email: email,
        phone_number: Phone,
        address1: address1,
        address2: address2,
        address3: address3,
        business_logo: 'xyz.png',
      };
      const payload2: any = {
        name: businessName,
        email: email,
        phone_number: Phone,
        address1: address1,
        address2: address2,
        address3: address3,
        business_logo: BusinessImage,
        business_number: businessNumber,
        website: Website,
        owner_name: ownerName,
        mobile_number: Mobile,
      };
      const formData: any = new FormData();
      const localImageUri: any = BusinessImage;
      const imageFileName = localImageUri.split('/').pop();
      const extension = localImageUri.split('.').pop();
      formData.append('business_logo', {
        uri: localImageUri,
        name: imageFileName,
        type: `image/${extension}`,
      });

      // Append other fields
      formData.append('name', businessName);
      formData.append('owner_name', ownerName);
      formData.append('business_number', businessNumber);
      formData.append('email', email);
      formData.append('phone_number', Phone);
      formData.append('mobile_number', Mobile);
      formData.append('website', Website);
      formData.append('address1', address1);
      formData.append('address2', address2);
      formData.append('address3', address3);
      if (selector.token === 'Guest') {
        dispatch(setBusinessDetail(payload2));
        successMessage();
      } else {
        const data = await FetchAPI('post', endpoint.businessInfo, formData, {
          Authorization: 'Bearer ' + selector.token,
          'Content-Type': 'multipart/form-data',
        });
        if (data.status === 'success') {
          successMessage();
        }
      }
    } catch (error) {
      setFalse;
    }
  };

  const updateInfo = async () => {
    try {
      const payload: any = {
        name: businessName,
        email: email,
        phone_number: Phone,
        address1: address1,
        address2: address2,
        address3: address3,
        business_logo: 'xyz.png',
      };
      const payload2: any = {
        name: businessName,
        email: email,
        phone_number: Phone,
        address1: address1,
        address2: address2,
        address3: address3,
        business_logo: BusinessImage,
        business_number: businessNumber,
        website: Website,
        owner_name: ownerName,
        mobile_number: Mobile,
      };
      const formData: any = new FormData();

      const localImageUri: any = BusinessImage;
      const imageFileName = localImageUri.split('/').pop();
      const extension = localImageUri.split('.').pop();
      formData.append('business_logo', {
        uri: localImageUri,
        name: imageFileName,
        type: `image/${extension}`,
      });

      // Append other fields
      formData.append('name', businessName);
      formData.append('owner_name', ownerName);
      formData.append('business_number', businessNumber);
      formData.append('email', email);
      formData.append('phone_number', Phone);
      formData.append('mobile_number', Mobile);
      formData.append('website', Website);
      formData.append('address1', address1);
      formData.append('address2', address2);
      formData.append('address3', address3);
      if (selector.token === 'Guest') {
        dispatch(setBusinessDetail(payload2));
        successMessage();
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateBusinessInfo(businessId),
          formData,
          {
            Authorization: 'Bearer ' + selector.token,
            'Content-Type': 'multipart/form-data',
          },
        );
        if (data.status === 'success') {
          successMessage();
        }
      }
    } catch (error) {
      setFalse;
    }
  };

  const successMessage = () => {
    setLoader(false);
    ToastService.showToast('Updated Successfully');
    navigation.goBack();
  };

  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };

  const updateInvoice = async () => {
    try {
      const payload: any = {
        b_name: businessName,
        b_owner_name: ownerName,
        b_business_number: businessNumber,
        b_email: email,
        b_phone_number: Phone,
        b_mobile_number: Mobile,
        b_website: Website,
        b_address1: address1,
        b_address2: address2,
        b_address3: address3,
        b_business_logo: 'logo.png ',
      };
      const formData: any = new FormData();

      const localImageUri: any = BusinessImage;
      const imageFileName = localImageUri.split('/').pop();
      const extension = localImageUri.split('.').pop();
      formData.append('b_business_logo', {
        uri: localImageUri,
        name: imageFileName,
        type: `image/${extension}`,
      });

      // Append other fields
      formData.append('b_name', businessName);
      formData.append('b_owner_name', ownerName);
      formData.append('b_business_number', businessNumber);
      formData.append('b_email', email);
      formData.append('b_phone_number', Phone);
      formData.append('b_mobile_number', Mobile);
      formData.append('b_website', Website);
      formData.append('b_address1', address1);
      formData.append('b_address2', address2);
      formData.append('b_address3', address3);
      if (selector.token === 'Guest') {
        // dispatch(setBusinessDetail(payload));
        successMessage();
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateIVBusiness(route?.params?.invoiceID),
          formData,
          {
            Authorization: 'Bearer ' + selector.token,
            'Content-Type': 'multipart/form-data',
          },
        );
        if (data.status === 'success') {
          successMessage();
        }
      }
    } catch (error) {
      setFalse;
    }
  };

  const offlineInvoiceUpdate = () => {
    const updatedArray = selector.invoiceList.map((item: any) => {
      if (item.index === route?.params?.data?.index) {
        return {
          ...item,
          b_name: businessName,
          b_owner_name: ownerName,
          b_business_number: businessNumber,
          b_email: email,
          b_phone_number: Phone,
          b_mobile_number: Mobile,
          b_website: Website,
          b_address1: address1,
          b_address2: address2,
          b_address3: address3,
          b_business_logo: BusinessImage,
        };
      }
      return item;
    });
    dispatch(setInvoiceList(updatedArray));
    successMessage();
  };

  const offlineEstimateUpdate = () => {
    const updatedArray = selector.estimateList.map((item: any) => {
      if (item.index === route?.params?.data?.index) {
        return {
          ...item,
          b_name: businessName,
          b_owner_name: ownerName,
          b_business_number: businessNumber,
          b_email: email,
          b_phone_number: Phone,
          b_mobile_number: Mobile,
          b_website: Website,
          b_address1: address1,
          b_address2: address2,
          b_address3: address3,
          b_business_logo: BusinessImage,
        };
      }
      return item;
    });
    dispatch(setEstimateList(updatedArray));
    successMessage();
  };

  const updateEstimate = async () => {
    try {
      const payload: any = {
        b_name: businessName,
        b_owner_name: ownerName,
        b_business_number: businessNumber,
        b_email: email,
        b_phone_number: Phone,
        b_mobile_number: Mobile,
        b_website: Website,
        b_address1: address1,
        b_address2: address2,
        b_address3: address3,
        b_business_logo: 'logo.png ',
      };
      const formData: any = new FormData();

      const localImageUri: any = BusinessImage;
      const imageFileName = localImageUri.split('/').pop();
      const extension = localImageUri.split('.').pop();
      formData.append('b_business_logo', {
        uri: localImageUri,
        name: imageFileName,
        type: `image/${extension}`,
      });

      // Append other fields
      formData.append('b_name', businessName);
      formData.append('b_owner_name', ownerName);
      formData.append('b_business_number', businessNumber);
      formData.append('b_email', email);
      formData.append('b_phone_number', Phone);
      formData.append('b_mobile_number', Mobile);
      formData.append('b_website', Website);
      formData.append('b_address1', address1);
      formData.append('b_address2', address2);
      formData.append('b_address3', address3);
      if (selector.token === 'Guest') {
        // dispatch(setBusinessDetail(payload));
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateETBusiness(route?.params?.estimateID),
          formData,
          {
            Authorization: 'Bearer ' + selector.token,
            'Content-Type': 'multipart/form-data',
          },
        );
        if (data.status === 'success') {
          successMessage();
        }
      }
    } catch (error) {
      setFalse;
    }
  };

  const handleTextChange = (field: any, value: any) => {
    switch (field) {
      case 'email':
        setEmail(value);
        break;
      case 'businessName':
        setBusinessName(value);
        break;
      case 'businessNumber':
        setBusinessNumber(value);
        break;
      case 'phone':
        setPhone(value);
        break;
      case 'mobile':
        setMobile(value);
        break;
      case 'website':
        setWebsite(value);
        break;
      default:
        break;
    }
  };

  // Handle onBlur event
  const handleBlur = (field: any) => {
    switch (field) {
      case 'email':
        setEmailError('');
        break;
      case 'businessName':
        setBusinessNameError('');
        break;
      case 'businessNumber':
        setBusinessNumberError('');
        break;
      case 'phone':
        // if (!isValidPhoneNumber(Phone)) {
        setPhoneError('');
        // } else {
        //   setPhoneError('');
        // }
        break;
      case 'mobile':
        // if (!isValidPhoneNumber(Mobile)) {
        //   setMobileError('Invalid mobile number');
        // } else {
        setMobileError('');
        // }
        break;
      case 'website':
        setWebsiteError('');
        break;
      default:
        break;
    }
  };
  return (
    <>
      <ModalActivityIndicator
        visible={Loader}
        size="large"
        color={Colors.landingColor}
      />
      <KeyboardAwareScrollView style={styles.mainContainer}>
        <View style={styles.businessContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('Business Logo')}</Text>
          </View>
          <View style={styles.content}>
            <TouchableOpacity onPress={closeBottomSheet}>
              {BusinessImage ? (
                <Image
                  source={{uri: BusinessImage}}
                  resizeMode="contain"
                  style={styles.businessImage}
                />
              ) : (
                <Feather name="camera" style={styles.cameraIcon} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mainContain}>
          <View style={styles.rowView}>
            <TextInput
              value={businessName}
              onChangeText={value => handleTextChange('businessName', value)}
              onBlur={() => handleBlur('businessName')}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Business Name')}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
          {businessNameError ? (
            <Text style={styles.errorText}>{businessNameError}</Text>
          ) : null}
          <View style={styles.rowView}>
            <TextInput
              value={ownerName}
              onChangeText={setOwnerName}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Business Owner Name')}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={businessNumber}
              onChangeText={value => handleTextChange('businessNumber', value)}
              onBlur={() => handleBlur('businessNumber')}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Business Number')}
              keyboardType={'numeric'}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
          {businessNumberError ? (
            <Text style={styles.errorText}>{businessNumberError}</Text>
          ) : null}
        </View>
        <View style={styles.mainContain}>
          <View style={styles.rowView}>
            <TextInput
              value={address1}
              onChangeText={setAddress1}
              style={{...styles.titleTxt, textAlign: 'left'}}
              placeholder={t('Address Line 1')}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={address2}
              onChangeText={setAddress2}
              style={{...styles.titleTxt, textAlign: 'left'}}
              placeholder={t('Address Line 2')}
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={address3}
              onChangeText={setAddress3}
              style={{...styles.titleTxt, textAlign: 'left'}}
              placeholder={t('Address Line 3')}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
        </View>
        <View style={styles.mainContain}>
          <View style={styles.rowView}>
            <TextInput
              value={email}
              onChangeText={value => handleTextChange('email', value)}
              onBlur={() => handleBlur('email')}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Email')}
              keyboardType={'email-address'}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
          {emailError ? (
            <Text style={styles.errorText}>{emailError}</Text>
          ) : null}

          <View style={styles.rowView}>
            <TextInput
              value={Phone}
              onChangeText={value => handleTextChange('phone', value)}
              onBlur={() => handleBlur('phone')}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Phone')}
              keyboardType={'phone-pad'}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
          {phoneError ? (
            <Text style={styles.errorText}>{phoneError}</Text>
          ) : null}

          <View style={styles.rowView}>
            <TextInput
              value={Mobile}
              onChangeText={value => handleTextChange('mobile', value)}
              onBlur={() => handleBlur('mobile')}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Mobile')}
              keyboardType={'phone-pad'}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
          {mobileError ? (
            <Text style={styles.errorText}>{mobileError}</Text>
          ) : null}

          <View style={styles.rowView}>
            <TextInput
              value={Website}
              onChangeText={value => handleTextChange('website', value)}
              onBlur={() => handleBlur('website')}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder={t('Website')}
              placeholderTextColor={'grey'}
              //onBlur={checkUpdate}
            />
          </View>
          {websiteError ? (
            <Text style={styles.errorText}>{websiteError}</Text>
          ) : null}
        </View>
        <TouchableOpacity
          onPress={validateForm}
          style={GlobalStyle.statementBtn}>
          <Text style={[GlobalStyle.titleTxt2]}>{t('Update')}</Text>
        </TouchableOpacity>
        <View style={{height: 50}} />
        <ImagePickerComponent
          openModal={openModal}
          closeBottomSheet={closeBottomSheet}
          setImage={setBusinessImage}
        />
      </KeyboardAwareScrollView>
    </>
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
    // marginVertical: Platform.OS === 'ios' ? 8 : 0,
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
    height: 40,
    paddingVertical: 5,
    width: '100%',
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
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default BusinessDetails;
