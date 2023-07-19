import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {setDefaultNotes} from '../../redux/reducers/user/UserReducer';
import {useTranslation} from 'react-i18next';

const DefaultNotes = () => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selector = useSelector(state => state.user);
  const [invoices, setInvoices] = useState('');
  const [estimate, setEstimate] = useState('');

  useEffect(() => {
    if (selector.token === 'Guest') {
      fetchData(selector.defaultNotes);
    } else {
      getInfo();
    }
  }, [selector.token]);

  const fetchData = (data: any) => {
    const element = data;
    setEstimate(element.estimates);
    setInvoices(element.invoices);
  };

  const getInfo = async () => {
    try {
      const data = await FetchAPI('get', endpoint.defaultNotes, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data.default_notes;
        setEstimate(element.estimates);
        setInvoices(element.invoices);
      }
    } catch (error) {}
  };

  const addInfo = async () => {
    try {
      const payload = {
        invoices: invoices,
        estimates: estimate,
      };
      if (selector.token === 'Guest') {
        dispatch(setDefaultNotes(payload));
      } else {
        const data = await FetchAPI('post', endpoint.defaultNotes, payload, {
          Authorization: 'Bearer ' + selector.token,
        });
        if (data.status === 'success') {
        }
      }
    } catch (error) {}
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Invoices')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={invoices}
            onChangeText={setInvoices}
            style={styles.titleTxt}
            placeholder={t('Default Invoices')}
            placeholderTextColor={'grey'}
            multiline
            numberOfLines={4}
            onBlur={addInfo}
          />
        </View>
      </View>

      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Estimates')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={estimate}
            onChangeText={setEstimate}
            style={styles.titleTxt}
            placeholder={t('Default Estimates')}
            placeholderTextColor={'grey'}
            multiline
            numberOfLines={4}
            onBlur={addInfo}
          />
        </View>
      </View>
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

export default DefaultNotes;
