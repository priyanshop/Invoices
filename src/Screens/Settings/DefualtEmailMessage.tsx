import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {changeDefaultEmailMsg} from '../../redux/reducers/user/UserReducer';
import {useTranslation} from 'react-i18next';
import {endpoint} from '../../Networking/endpoint';
import FetchAPI from '../../Networking';
import {GlobalStyle} from '../../Helper/GlobalStyle';
import ToastService from '../../Helper/ToastService';
import Loader from '../../CustomComponent/Loader';

const DefaultEmailMessage = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setTrue = () => setIsLoading(true);
  const setFalse = () => setIsLoading(false);

  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.user);

  useEffect(() => {
    setTrue();
    if (selector.token === 'Guest') {
      fetchData(selector.defaultEmailMessage);
    } else {
      getData();
    }
  }, [selector.token]);

  const fetchData = (data: any) => {
    setFalse();
    setAdditionalDetails(data);
  };

  const changeMessage = () => {
    if (selector.token === 'Guest') {
      dispatch(changeDefaultEmailMsg(additionalDetails));
      successMessage();
    } else {
      addData(additionalDetails);
    }
  };

  const getData = async () => {
    try {
      const data = await FetchAPI('get', endpoint.getEmailMessage, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        setAdditionalDetails(data.data.default_email_msg);
        setFalse();
      }
    } catch (error) {
      setFalse();
    }
  };

  const addData = async (msg: any) => {
    try {
      const payload: any = {
        email_message: msg,
      };

      const data = await FetchAPI('post', endpoint.addEmailMessage, payload, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        successMessage();
      }
    } catch (error) {
      setFalse();
    }
  };

  const successMessage = () => {
    setIsLoading(false);
    ToastService.showToast('Updated Successfully');
    navigation.goBack();
  };
  return (
    <>
      <Loader visible={isLoading} size="large" color={Colors.landingColor} />
      <View style={styles.mainContainer}>
        <View style={styles.businessContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('Message to customer')}</Text>
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={additionalDetails}
              onChangeText={setAdditionalDetails}
              style={styles.titleTxt}
              placeholder={t('Default Email Message')}
              placeholderTextColor={'grey'}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={changeMessage}
          style={GlobalStyle.statementBtn}>
          <Text style={[GlobalStyle.titleTxt2]}>{t('Update')}</Text>
        </TouchableOpacity>
      </View>
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
    backgroundColor: '#d4d4d4',
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
    flex: 1,
    textAlign: 'left',
    height: 60,
    textAlignVertical: 'top',
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
});

export default DefaultEmailMessage;
