import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {changeCustomize} from '../../redux/reducers/user/UserReducer';
import {Switch} from 'react-native-paper';
import {useTranslation} from 'react-i18next';

function Customize({navigation}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user);
  const isFocused = useIsFocused();
  const [invoices, setInvoices] = useState('');
  const [estimate, setEstimate] = useState('');
  const [businessNumber, setBusinessNumber] = useState('');
  const [quantityLabel, setQuantityLabel] = useState('');
  const [unitCostLabel, setUnitCostLabel] = useState('');
  const [quantityAndUnitCost, setQuantityAndUnitCost] = useState(true);

  useEffect(() => {
    if (selector.token === 'Guest') {
      fetchData(selector.customizeLabels);
    } else {
      //   getInfo();
    }
  }, [selector.token]);

  const fetchData = (data: any) => {
    const element = data;
    setEstimate(element.invoices);
    setInvoices(element.estimate);
    setBusinessNumber(element.businessNumber);
    setQuantityLabel(element.quantityLabel);
    setUnitCostLabel(element.unitCostLabel);
    setQuantityAndUnitCost(element.quantityAndUnitCost);
  };

  const getInfo = async () => {
    try {
      const data = await FetchAPI('get', endpoint.invoiceNumber, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        // const element = data.data.invoice_numbering;
        // setEstimate(element.estimate_number_prefix);
        // setInvoices(element.invoice_number_prefix);
      }
    } catch (error) {}
  };

  const addInfo = async () => {
    try {
      const payload = {
        invoices: invoices,
        estimate: estimate,
        businessNumber: businessNumber,
        quantityLabel: quantityLabel,
        unitCostLabel: unitCostLabel,
        quantityAndUnitCost: quantityAndUnitCost,
      };
      if (selector.token === 'Guest') {
        dispatch(changeCustomize(payload));
      } else {
        // const data = await FetchAPI('post', endpoint.invoiceNumber, payload, {
        //   Authorization: 'Bearer ' + selector.token,
        // });
        // if (data.status === 'success') {
        // }
      }
    } catch (error) {}
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: Colors.commonBg, padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 3,
              paddingHorizontal: 8,
            }}>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Invoice Title')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={invoices}
                  style={styles.input}
                  placeholder={t('Invoice')}
                  placeholderTextColor={'grey'}
                  onChangeText={setInvoices}
                  onBlur={addInfo}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Estimate Title')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={estimate}
                  style={styles.input}
                  placeholder={t('Estimate')}
                  placeholderTextColor={'grey'}
                  onChangeText={setEstimate}
                  onBlur={addInfo}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Business Number')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={businessNumber}
                  style={styles.input}
                  placeholder={t('Business #')}
                  placeholderTextColor={'grey'}
                  onChangeText={setBusinessNumber}
                  onBlur={addInfo}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Quantity Label')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={quantityLabel}
                  style={styles.input}
                  placeholder={t('QTY')}
                  placeholderTextColor={'grey'}
                  onChangeText={setQuantityLabel}
                  onBlur={addInfo}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Unit Cost Label')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={unitCostLabel}
                  style={styles.input}
                  placeholder={t('RATE')}
                  placeholderTextColor={'grey'}
                  onChangeText={setUnitCostLabel}
                  onBlur={addInfo}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Quantity and Unit Cost')}</Text>
              <Switch
                value={quantityAndUnitCost}
                color={Colors.landingColor}
                onValueChange={(value: any) => {
                  setQuantityAndUnitCost(value);
                }}
              />
            </View>
            <Text style={styles.photoText}>
              {t('Display these columns on invoices')}
            </Text>
          </View>
        </View>
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
    // marginVertical: Platform.OS === 'ios' ? 5 : 0,
    alignItems: 'center',
    marginVertical: 2,
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
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    height: 35,
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
    height: 35,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlignVertical: 'top',
  },
  saveText: {fontSize: 18, fontWeight: '400', color: '#000'},
  dateText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  photoView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoText: {fontSize: 14, fontWeight: '500', color: 'grey', marginBottom: 10},
});

export default Customize;
