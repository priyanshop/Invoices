import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../Helper/Colors';
import {useTranslation} from 'react-i18next';
import MessageButton from '../../CustomComponent/MessageButton';

const ContactUs = ({navigation}: any) => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();

  const selector = useSelector(state => state.user);
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [contactNo, setContactNo] = useState('');

  const addInfo = async () => {
    try {
    } catch (error) {}
  };

  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
  };

  return (
    <View style={styles.mainContainer}>
      <MessageButton />
      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('name')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={Name}
            onChangeText={value => handleTextInputChange(value, setName)}
            onBlur={addInfo}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t('Enter Name')}
            placeholderTextColor={'grey'}
          />
        </View>
      </View>
      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Email')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={email}
            onChangeText={value => handleTextInputChange(value, setEmail)}
            onBlur={addInfo}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t('Enter Email')}
            placeholderTextColor={'grey'}
          />
        </View>
      </View>

      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Contact No')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={contactNo}
            onChangeText={value => handleTextInputChange(value, setContactNo)}
            onBlur={addInfo}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder={t('Enter Contact No.')}
            placeholderTextColor={'grey'}
          />
        </View>
      </View>

      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Message')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={message}
            onChangeText={value => handleTextInputChange(value, setMessage)}
            onBlur={addInfo}
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

      <TouchableOpacity
        // onPress={}
        style={styles.statementBtn}>
        <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
          {t('Send')}
        </Text>
      </TouchableOpacity>
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
