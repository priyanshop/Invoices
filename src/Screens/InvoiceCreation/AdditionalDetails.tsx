import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Switch} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {Colors} from '../../Helper/Colors';
import {
  setDefaultNotes,
  setEstimateList,
  setInvoiceList,
} from '../../redux/reducers/user/UserReducer';
import {GlobalStyle} from '../../Helper/GlobalStyle';
import ToastService from '../../Helper/ToastService';

function AdditionalDetails({navigation, route}: any): JSX.Element {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selector = useSelector((state: any) => state.user);
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [addToItem, setAddToItem] = useState(false);

  useEffect(() => {
    if (route?.params?.invoiceUpdate) {
      setAdditionalDetails(route?.params?.invoiceData?.notes);
    }
    if (route?.params?.estimateUpdate) {
      setAdditionalDetails(route?.params?.estimateData?.notes);
    }
  }, [route?.params]);

  const updateIVNotesDetail = async () => {
    try {
      const payload: any = {
        notes: additionalDetails,
      };
      if (selector.token === 'Guest') {
        offlineInvoiceUpdate();
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateIVNotes(route?.params?.invoiceID),
          payload,
          {
            Authorization: 'Bearer ' + selector.token,
          },
        );
        if (data.status === 'success') {
          successMessage();
        }
      }
    } catch (error) {}
  };

  const offlineInvoiceUpdate = () => {
    const updatedArray = selector.invoiceList.map((item: any) => {
      if (item.index === route?.params?.invoiceData.index) {
        return {
          ...item,
          notes: additionalDetails,
        };
      }
      return item;
    });
    dispatch(setInvoiceList(updatedArray));
    successMessage();
  };
  const successMessage = () => {
    ToastService.showToast('Updated Successfully');
    navigation.goBack();
  };
  const updateETNotesDetail = async () => {
    try {
      const payload: any = {
        notes: additionalDetails,
      };
      if (selector.token === 'Guest') {
        offlineEStimateUpdate();
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateETNotes(route?.params?.estimateID),
          payload,
          {
            Authorization: 'Bearer ' + selector.token,
          },
        );
        if (data.status === 'success') {
          successMessage();
        }
      }
    } catch (error) {}
  };

  const offlineEStimateUpdate = () => {
    const updatedArray = selector.estimateList.map((item: any) => {
      if (item.index === route?.params?.estimateData.index) {
        return {
          ...item,
          notes: additionalDetails,
        };
      }
      return item;
    });
    dispatch(setEstimateList(updatedArray));
    successMessage();
  };

  const checkCondition = () => {
    if (route?.params?.invoiceUpdate) {
      updateIVNotesDetail();
      addInfo();
    }
    if (route?.params?.estimateUpdate) {
      updateETNotesDetail();
      addInfoET();
    } 
  };

  const addInfo = async () => {
    try {
      const payload: any = {
        invoices: additionalDetails,
        estimates: selector.defaultNotes.estimates,
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

  const addInfoET = async () => {
    try {
      const payload: any = {
        invoices: selector.defaultNotes.invoices,
        estimates: additionalDetails,
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
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: Colors.commonBg, padding: 8}]}>
        <View style={styles.detailView}>
          <TextInput
            value={additionalDetails}
            onChangeText={text => setAdditionalDetails(text)}
            placeholder={t('Additional Details')}
            style={styles.detailText}
            numberOfLines={4}
            multiline
          />
        </View>

        <View style={styles.itemView}>
          <View style={styles.saveView}>
            <Text style={styles.saveText}>{t('Save as default')}</Text>
            <Switch
              color={Colors.landingColor}
              value={addToItem}
              onValueChange={(value: any) => setAddToItem(value)}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => checkCondition()}
          style={GlobalStyle.statementBtn}>
          <Text style={[GlobalStyle.titleTxt2]}>{t('Update')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  inputContainer: {
    width: '50%',
  },
  input: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
  },
  itemView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  totalView: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
  },
  detailView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    paddingVertical: 5,
  },
  saveView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  totalTxt: {fontSize: 18, fontWeight: '500', color: '#fff'},
  detailText: {
    height: 70,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    textAlignVertical: 'top',
  },
  saveText: {fontSize: 18, fontWeight: '400', color: '#000'},
});

export default AdditionalDetails;
