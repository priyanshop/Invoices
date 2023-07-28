import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import DiscountOption from '../../CustomComponent/DiscountOption';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';

function DiscountScreen({navigation, route}: any): JSX.Element {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selector = useSelector((state: any) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [selectedTax, setSelectedTax] = useState('No Discount');
  const [discountAmount, setDiscountAmount] = useState('');
  const [percentageAmount, setPercentageAmount] = useState('');

  useEffect(() => {
    if (route.params?.invoiceUpdate) {
      if (route.params?.invoiceData?.invoice_discount_type) {
        setSelectedTax(route.params.invoiceData.invoice_discount_type);
        setPercentageAmount(
          route.params.invoiceData.invoice_discount_value?.toString(),
        );
        setDiscountAmount(
          route.params.invoiceData.invoice_discount_value?.toString(),
        );
      }
    }
  }, [route.params]);

  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };

  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
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

  const checkCondition = () => {
    if (selectedTax !== 'Flat Amount' && selectedTax !== 'Percentage') {
      navigation.goBack();
    }
    if (selectedTax === 'Flat Amount') {
      if (parseFloat(discountAmount) <= 0 || !discountAmount) {
        Alert.alert('', 'Please Enter Amount');
        return;
      }
    }
    if (selectedTax === 'Percentage') {
      if (parseFloat(percentageAmount) <= 0 || !percentageAmount) {
        Alert.alert('', 'Please Enter Percentage');
        return;
      }
    }
    const payload: any = {
      invoice_discount_type: selectedTax,
      invoice_discount_value:
        selectedTax === 'Flat Amount'
          ? discountAmount
          : selectedTax === 'Percentage'
          ? percentageAmount
          : '',
      invoice_discount_amount: calculateTotalPrice(
        route.params.invoiceData.invoice_total,
        selectedTax,
        discountAmount,
        percentageAmount,
      ),
    };
    if (route.params.invoiceUpdate) {
      updateCall(payload);
    }
  };

  const calculateTotalPrice = (
    total: any,
    discountType: any,
    flatDiscount: any,
    percentageDiscount: any,
  ) => {
    let totalPrice = total;
    if (discountType !== 'No Discount') {
      if (discountType === 'Flat Amount' && flatDiscount && flatDiscount > 0) {
        totalPrice -= flatDiscount;
      }
      if (
        discountType === 'Percentage' &&
        percentageDiscount &&
        percentageDiscount > 0
      ) {
        const percentageAmount = (totalPrice * percentageDiscount) / 100;
        totalPrice -= percentageAmount;
      }
    }
    return totalPrice;
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
              paddingHorizontal: 10,
            }}>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Discount')}: </Text>
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
            {selectedTax === 'Flat Amount' && (
              <View style={styles.mainView}>
                <Text style={styles.label}>{t('Amount')}: </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={discountAmount}
                    style={styles.input}
                    placeholder={''}
                    placeholderTextColor={'grey'}
                    onChangeText={value =>
                      handleTextInputChange(value, setDiscountAmount)
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
            {selectedTax === 'Percentage' && (
              <View style={styles.mainView}>
                <Text style={styles.label}>{t('Percentage')}: </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={percentageAmount}
                    style={styles.input}
                    placeholder={'0'}
                    placeholderTextColor={'grey'}
                    onChangeText={value =>
                      handleTextInputChange(value, setPercentageAmount)
                    }
                    keyboardType="numeric"
                  />
                </View>
              </View>
            )}
          </View>
        </View>

        <TouchableOpacity onPress={checkCondition} style={styles.statementBtn}>
          <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
            {t('Update')}
          </Text>
        </TouchableOpacity>

        <DiscountOption
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
    justifyContent: 'center',
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

export default DiscountScreen;
