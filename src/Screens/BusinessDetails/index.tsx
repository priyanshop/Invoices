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
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import ImagePickerComponent from '../../CustomComponent/ImagePickerComponent';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {setBusinessDetail} from '../../redux/reducers/user/UserReducer';
import { useTranslation } from 'react-i18next';

const BusinessDetails = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user);
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

  useEffect(() => {
    if (selector.token === 'Guest') {
      const businessDetails = selector.businessDetails;
      setAlreadyExist(true);
      setPhone(businessDetails.phone_number);
      setAddress1(businessDetails.address1);
      setAddress2(businessDetails.address2);
      setAddress3(businessDetails.address3);
      setBusinessName(businessDetails.name);
      setEmail(businessDetails.email);
    } else {
      getInfo();
    }
  }, [selector.token]);

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
        setEmail(element.email);
      }
    } catch (error) {}
  };

  const checkUpdate = () => {
    if (alreadyExist) {
      updateInfo();
    } else {
      addInfo();
    }
  };

  const addInfo = async () => {
    try {
      const payload = {
        name: businessName,
        email: email,
        phone_number: Phone,
        address1: address1,
        address2: address2,
        address3: address3,
        business_logo: 'xyz.png',
      };
      if (selector.token === 'Guest') {
        dispatch(setBusinessDetail(payload));
      } else {
        const data = await FetchAPI('post', endpoint.businessInfo, payload, {
          Authorization: 'Bearer ' + selector.token,
        });
        if (data.status === 'success') {
        }
      }
    } catch (error) {}
  };

  const updateInfo = async () => {
    try {
      const payload = {
        name: businessName,
        email: email,
        phone_number: Phone,
        address1: address1,
        address2: address2,
        address3: address3,
        business_logo: 'xyz.png',
      };
      if (selector.token === 'Guest') {
        dispatch(setBusinessDetail(payload));
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateBusinessInfo(businessId),
          payload,
          {
            Authorization: 'Bearer ' + selector.token,
          },
        );
        if (data.status === 'success') {
        }
      }
    } catch (error) {}
  };

  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };

  return (
    <ScrollView style={styles.mainContainer}>
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
            onChangeText={setBusinessName}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t("Business Name")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={ownerName}
            onChangeText={setOwnerName}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t("Business Owner Name")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={businessNumber}
            onChangeText={setBusinessNumber}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t("Business Number")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
      </View>
      <View style={styles.mainContain}>
        <View style={styles.rowView}>
          <TextInput
            value={address1}
            onChangeText={setAddress1}
            style={{...styles.titleTxt, textAlign: 'left'}}
            placeholder={t("Address Line 1")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={address2}
            onChangeText={setAddress2}
            style={{...styles.titleTxt, textAlign: 'left'}}
            placeholder={t("Address Line 2")}
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={address3}
            onChangeText={setAddress3}
            style={{...styles.titleTxt, textAlign: 'left'}}
            placeholder={t("Address Line 3")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
      </View>
      <View style={styles.mainContain}>
        <View style={styles.rowView}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t("Email")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={Phone}
            onChangeText={setPhone}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t("Phone")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={Mobile}
            onChangeText={setMobile}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t("Mobile")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={Website}
            onChangeText={setWebsite}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t("Website")}
            placeholderTextColor={'grey'}
            onBlur={checkUpdate}
          />
        </View>
      </View>
      <ImagePickerComponent
        openModal={openModal}
        closeBottomSheet={closeBottomSheet}
        setImage={setBusinessImage}
      />
    </ScrollView>
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
  titleTxt: {fontSize: 17, color: '#000', fontWeight: '400', height: 40},
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
});

export default BusinessDetails;
