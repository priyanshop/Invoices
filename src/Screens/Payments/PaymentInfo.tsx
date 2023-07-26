import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Colors } from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import { endpoint } from '../../Networking/endpoint';
import { setInvoiceList, setPaymentInfo } from '../../redux/reducers/user/UserReducer';
import { useTranslation } from 'react-i18next';

const PaymentInfo = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const selector = useSelector((state: any) => state.user);
  const [payable, setPayable] = useState('');
  const [email, setEmail] = useState('');
  const [paymentInstructions, setPaymentInstructions] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  useEffect(() => {

  }, [selector.token]);

  useEffect(() => {
    if (route?.params?.invoiceUpdate) {
      fetchData(route?.params.invoiceData);
    } else {
      if (selector.token === 'Guest') {
        fetchData(selector.paymentInfo);
      } else {
        getInfo();
      }
    }
  }, [route?.params]);

  const fetchData = (data: any) => {
    const element = data;
    setPayable(element.make_checks_payable);
    setAdditionalDetails(element.additional_payment_instructions);
    setEmail(element.paypal_email);
    setPaymentInstructions(element.payment_instructions);
  };

  const getInfo = async () => {
    try {
      const data = await FetchAPI('get', endpoint.getPaymentInfo, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data.payment_info;
        setPayable(element.make_checks_payable);
        setAdditionalDetails(element.additional_payment_instructions);
        setEmail(element.paypal_email);
        setPaymentInstructions(element.payment_instructions);
      }
    } catch (error) { }
  };

  const addInfo = async () => {
    try {
      const payload: any = {
        paypal_email: email,
        make_checks_payable: payable,
        payment_instructions: paymentInstructions,
        additional_payment_instructions: additionalDetails,
      };
      if (selector.token === 'Guest') {
        dispatch(setPaymentInfo(payload));
      } else {
        const data = await FetchAPI('post', endpoint.addPaymentInfo, payload, {
          Authorization: 'Bearer ' + selector.token,
        });
        if (data.status === 'success') {
        }
      }
    } catch (error) { }
  };

  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
  };

  const checkCondition = () => {
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        offlineInvoiceUpdate()
      } else {
        updateIVinfo();
      }
    } else {
      addInfo();
    }
  };

  const updateIVinfo = async () => {
    try {
      const payload: any = {
        paypal_email: email,
        make_checks_payable: payable,
        payment_instructions: paymentInstructions,
        additional_payment_instructions: additionalDetails,
      };
      if (selector.token === 'Guest') {
        dispatch(setPaymentInfo(payload));
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateIVPayment(route?.params?.invoiceID),
          payload,
          {
            Authorization: 'Bearer ' + selector.token,
          },
        );
        if (data.status === 'success') {
        }
      }
    } catch (error) { }
  };

  const offlineInvoiceUpdate = () => {
    const updatedArray = selector.invoiceList.map((item: any) => {
      if (item.index === route?.params?.invoiceData.index) {
        return {
          ...item,
          paypal_email: email,
          make_checks_payable: payable,
          payment_instructions: paymentInstructions,
          additional_payment_instructions: additionalDetails,
        };
      }
      return item;
    });
    dispatch(setInvoiceList(updatedArray));
  };

  return (
    <View style={styles.mainContainer}>
      <View>
        <Text style={styles.titleTxt}>
          {t('Settings.SensitiveInformation')}
        </Text>
      </View>
      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('PayPal Email')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={email}
            onChangeText={value => handleTextInputChange(value, setEmail)}
            onBlur={checkCondition}
            style={{ ...styles.titleTxt, flex: 1, textAlign: 'left' }}
            placeholder={t('Enter your paypal email address')}
            placeholderTextColor={'grey'}
          />
        </View>
      </View>

      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Make cheques payable to')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={payable}
            onChangeText={value => handleTextInputChange(value, setPayable)}
            onBlur={checkCondition}
            style={{ ...styles.titleTxt, flex: 1, textAlign: 'left' }}
            placeholder={t("Your or your business's name")}
            placeholderTextColor={'grey'}
          />
        </View>
      </View>

      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Payment Instruction')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={paymentInstructions}
            onChangeText={value =>
              handleTextInputChange(value, setPaymentInstructions)
            }
            onBlur={checkCondition}
            style={{
              ...styles.titleTxt,
              flex: 1,
              textAlign: 'left',
              height: 60,
              textAlignVertical: 'top',
            }}
            placeholder={t('Specify instructions for the payments of deposits')}
            placeholderTextColor={'grey'}
            multiline
            numberOfLines={4}
          />
        </View>
      </View>

      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t('Others')}</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={additionalDetails}
            onChangeText={value =>
              handleTextInputChange(value, setAdditionalDetails)
            }
            onBlur={checkCondition}
            style={{
              ...styles.titleTxt,
              flex: 1,
              textAlign: 'left',
              height: 60,
              textAlignVertical: 'top',
            }}
            placeholder={t('Additional payment instructions')}
            placeholderTextColor={'grey'}
            multiline
            numberOfLines={4}
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
  innerView: { flex: 1, paddingHorizontal: 8 },
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

export default PaymentInfo;
