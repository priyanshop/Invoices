import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import TaxOption from '../../CustomComponent/TaxOption';
import {Colors} from '../../Helper/Colors';
import {
  calculateTaxedAmount,
  getTotalTaxAmount,
} from '../../Helper/CommonFunctions';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';

function TaxScreen({navigation, route}: any): JSX.Element {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selector = useSelector((state: any) => state.user);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTax, setSelectedTax] = useState('On The Total');
  const [Taxable, setTaxable] = useState(false);
  const [taxRate, setTaxRate] = useState('');

  useEffect(() => {
    if (route.params?.invoiceUpdate) {
      if (route.params?.invoiceData?.invoice_discount_type) {
        setSelectedTax(route.params.invoiceData.invoice_tax_type);
        setTaxRate(route.params.invoiceData.invoice_tax_rate?.toString());
      }
    }
    if (route.params?.estimateUpdate) {
      if (route.params?.estimateData?.estimate_tax_type) {
        setSelectedTax(route.params.estimateData.estimate_tax_type);
        setTaxRate(route.params.estimateData.estimate_tax_rate?.toString());
      }
    }
  }, [route.params]);

  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };

  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
  };

  const checkCondition = () => {
    if (route.params.invoiceUpdate) {
      updateInvoice();
    }
    if (route.params.estimateUpdate) {
      updateEstimate();
    }
  };

  const updateInvoice = () => {
    if (selectedTax !== 'On The Total' && selectedTax !== 'Per Item') {
      navigation.goBack();
    }
    const tempTotal = calculateTaxedAmount(
      route.params.invoiceData.invoice_total,
      taxRate,
    );
    const totalTax = getTotalTaxAmount(route.params.invoiceData.items);

    const payload: any = {
      invoice_tax_type: selectedTax,
      invoice_tax_label: 'GST',
      invoice_tax_rate: selectedTax === 'On The Total' ? taxRate : '',
      is_invoice_tax_inclusive: 'false',
      invoice_total_tax_amount:
        selectedTax === 'On The Total'
          ? tempTotal
          : selectedTax === 'Per Item'
          ? totalTax
          : '',
    };
    if (route.params.invoiceUpdate) {
      updateCall(payload);
    }
  };

  const updateEstimate = () => {
    if (selectedTax !== 'On The Total' && selectedTax !== 'Per Item') {
      navigation.goBack();
    }
    const tempTotal = calculateTaxedAmount(
      route.params.estimateData.estimate_total,
      taxRate,
    );
    const totalTax = getTotalTaxAmount(route.params.estimateData.items);
    const payload: any = {
      estimate_tax_type: selectedTax,
      estimate_tax_label: 'GST',
      estimate_tax_rate: selectedTax === 'On The Total' ? taxRate : '',
      is_estimate_tax_inclusive: 'false',
      estimate_total_tax_amount:
        selectedTax === 'On The Total'
          ? tempTotal
          : selectedTax === 'Per Item'
          ? totalTax
          : '',
    };
    if (route.params.estimateUpdate) {
      updateETCall(payload);
    }
  };

  const updateCall = async (tempPayload: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.updateIVItem(route?.params?.invoiceID),
        tempPayload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        navigation.goBack();
      }
    } catch (error) {}
  };

  const updateETCall = async (tempPayload: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.updateETItem(route?.params?.estimateID),
        tempPayload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        navigation.goBack();
      }
    } catch (error) {}
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 3,
              paddingHorizontal: 8,
            }}>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Tax')}: </Text>
              <View
                style={[
                  styles.inputContainer,
                  {height: 40, justifyContent: 'center'},
                ]}>
                <Text onPress={closeBottomSheet} style={styles.dateText}>
                  {t(selectedTax)}
                </Text>
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Label')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={t('GST')}
                  style={styles.input}
                  placeholder={''}
                  placeholderTextColor={'grey'}
                  editable={false}
                />
              </View>
            </View>
            {selectedTax !== 'Per Item' && (
              <View style={styles.mainView}>
                <Text style={styles.label}>{t('Rate')}: </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={taxRate}
                    style={styles.input}
                    placeholder={'0'}
                    placeholderTextColor={'grey'}
                    onChangeText={value =>
                      handleTextInputChange(value, setTaxRate)
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
          </View>
        </View>

        {/* {selectedTax !== 'Deducted' && (
          <View style={styles.detailView}>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Taxable')}: </Text>
              <Switch
                value={Taxable}
                color={Colors.landingColor}
                onValueChange={(value: any) => setTaxable(value)}
              />
            </View>
            <TextInput
              editable={false}
              value={t('Turn on if the prices already include Tax')}
              placeholder={t('Description')}
              style={styles.detailText}
            />
          </View>
        )} */}

        <TouchableOpacity onPress={checkCondition} style={styles.statementBtn}>
          <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
            {t('Update')}
          </Text>
        </TouchableOpacity>

        <TaxOption
          openModal={openModal}
          closeBottomSheet={closeBottomSheet}
          selectedOption={setSelectedTax}
        />
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
    height: 40,
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
    color: 'grey',
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
  photoText: {fontSize: 17, fontWeight: '500', color: '#d1d1d1'},
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

export default TaxScreen;
