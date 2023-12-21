import React, {useEffect, useLayoutEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PaymentMode from '../../CustomComponent/PaymentMode';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';
import {GlobalStyle} from '../../Helper/GlobalStyle';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/AntDesign';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import ToastService from '../../Helper/ToastService';
import Loader from '../../CustomComponent/Loader';
import {Colors} from '../../Helper/Colors';
import {
  setEstimateList,
  setInvoiceList,
} from '../../redux/reducers/user/UserReducer';

const PaymentScreen = ({navigation, route}: any) => {
  const {t, i18n} = useTranslation();
  const selector = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const setTrue = () => setIsLoading(true);
  const setFalse = () => setIsLoading(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          disabled={!route?.params?.updateID}
          style={{marginRight: 10}}
          onPress={() => {
            handleDeleteCondition();
          }}>
          <Icon name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route?.params?.invoiceUpdate) {
      if (route?.params?.data) {
        const receive = route?.params?.data;
        setSelectedPayment(receive.payment_method);
        setAmount(receive.amount.toString());
        setDueDate(new Date(receive.payment_date));
        setAdditionalDetails(receive.payment_notes);
      }
    }
    if (route?.params?.estimateUpdate) {
      if (route?.params?.data) {
        const receive = route?.params?.data;
        setSelectedPayment(receive.payment_method);
        setAmount(receive.amount.toString());
        setDueDate(new Date(receive.payment_date));
        setAdditionalDetails(receive.payment_notes);
      }
    }
  }, [route?.params]);

  const onDeletePayment = (payments: any, paymentId: any) => {
    const updatedPayments = payments.filter(
      (payment: any, index: any) => index !== paymentId,
    );
    return updatedPayments;
  };

  const onUpdatePayment = (
    payments: any,
    updatedPayment: any,
    paymentId: any,
  ) => {
    const updatedPayments = payments.map((payment: any, index: any) => {
      return index === paymentId ? updatedPayment : payment;
    });
    return updatedPayments;
  };

  const calculatePaidAmount = (payments: any) => {
    return payments.reduce(
      (total: any, payment: any) => total + parseFloat(payment.amount),
      0,
    );
  };

  const calculateDueAmount = (totalAmount: any, payments: any) => {
    return totalAmount - calculatePaidAmount(payments);
  };

  const handleCondition = () => {
    const selectedOption = route.params.invoiceUpdate
      ? route?.params?.invoiceData
      : route?.params?.estimateData;
    const total = route.params.invoiceUpdate
      ? selectedOption?.invoice_total || 0
      : selectedOption?.estimate_total || 0;
    const lastPayments = selectedOption.payments || [];
    const payments = [
      {
        amount: amount,
        payment_method: selectedPayment,
        payment_date: dueDate,
        payment_notes: additionalDetails,
      },
    ];
    const children = payments.concat(lastPayments);

    const payload: any = {
      payments: payments,
      paid_amount: calculatePaidAmount(children),
      due_amount: calculateDueAmount(total, children),
    };
    const payload2: any = {
      payments: children,
      paid_amount: calculatePaidAmount(children),
      due_amount: calculateDueAmount(total, children),
    };
    setTrue();
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        offlineInvoiceUpdate(payload2);
      } else {
        addPayment(payload);
      }
    }
    if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        offlineEstimateUpdate(payload2);
      } else {
        addPaymentET(payload);
      }
    }
  };

  const handleUpdateCondition = () => {
    const selectedOption = route.params.invoiceUpdate
      ? route?.params?.invoiceData
      : route?.params?.estimateData;
    const total = route.params.invoiceUpdate
      ? selectedOption?.invoice_total || 0
      : selectedOption?.estimate_total || 0;
    const lastPayments = selectedOption?.payments || [];
    const payments = [
      {
        amount: amount,
        payment_method: selectedPayment,
        payment_date: dueDate,
        payment_notes: additionalDetails,
      },
    ];
    const children = onUpdatePayment(
      lastPayments,
      payments[0],
      route?.params?.index,
    );
    const payload: any = {
      payments: payments[0],
      paid_amount: calculatePaidAmount(children) + '',
      due_amount: calculateDueAmount(total, children) + '',
    };
    const payload2: any = {
      payments: children,
      paid_amount: calculatePaidAmount(children) + '',
      due_amount: calculateDueAmount(total, children) + '',
    };
    setTrue();

    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        offlineInvoiceUpdate(payload2);
      } else {
        updatePayment(payload);
      }
    }
    if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        offlineEstimateUpdate(payload2);
      } else {
        updatePaymentET(payload);
      }
    }
  };

  const handleDeleteCondition = () => {
    const selectedOption = route.params.invoiceUpdate
      ? route?.params?.invoiceData
      : route?.params?.estimateData;
    const total = route.params.invoiceUpdate
      ? selectedOption?.invoice_total || 0
      : selectedOption?.estimate_total || 0;
    const lastPayments = selectedOption?.payments || [];
    const payments = onDeletePayment(lastPayments, route?.params?.index);

    const payload: any = {
      paid_amount: calculatePaidAmount(payments) + '',
      due_amount: calculateDueAmount(total, payments) + '',
    };
    const payload2: any = {
      payments: payments,
      paid_amount: calculatePaidAmount(payments) + '',
      due_amount: calculateDueAmount(total, payments) + '',
    };
    setTrue();
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        offlineInvoiceUpdate(payload2);
      } else {
        deletePayment(payload);
      }
    }
    if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        offlineEstimateUpdate(payload2);
      } else {
        deletePaymentET(payload);
      }
    }
  };

  const addPayment = async (payload: any) => {
    try {
      const data = await FetchAPI(
        'post',
        endpoint.getInvoicePayments(route?.params?.invoiceID),
        payload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage(element);
      }
    } catch (error) {
      setFalse;
    }
  };

  const updatePayment = async (payload: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.updateInvoicePayment(
          route?.params?.invoiceID,
          route?.params?.updateID,
        ),
        payload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage(element);
      }
    } catch (error) {
      setFalse;
    }
  };

  const deletePayment = async (payload: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.deleteInvoicePayment(
          route?.params?.invoiceID,
          route?.params?.updateID,
        ),
        payload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage(element);
      }
    } catch (error) {
      setFalse;
    }
  };

  const addPaymentET = async (payload: any) => {
    try {
      const data = await FetchAPI(
        'post',
        endpoint.getEstimatePayments(route?.params?.estimateID),
        payload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage2(element);
      }
    } catch (error) {
      setFalse;
    }
  };

  const updatePaymentET = async (payload: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.updateEstimatePayment(
          route?.params?.estimateID,
          route?.params?.updateID,
        ),
        payload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage2(element);
      }
    } catch (error) {
      setFalse;
    }
  };

  const deletePaymentET = async (payload: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.deleteEstimatePayment(
          route?.params?.estimateID,
          route?.params?.updateID,
        ),
        payload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage2(element);
      }
    } catch (error) {
      setFalse;
    }
  };

  const offlineEstimateUpdate = (data: any) => {
    const updatedArray = selector.estimateList.map((item: any) => {
      if (item.index === route?.params?.estimateData?.index) {
        return {
          ...item,
          ...data,
        };
      }
      return item;
    });
    const latestChanges = updatedArray.filter(
      (item: any) => item.index === route?.params?.estimateData?.index,
    )[0];
    dispatch(setEstimateList(updatedArray));
    successMessage2(latestChanges);
  };

  const offlineInvoiceUpdate = (data: any) => {
    const updatedArray = selector.invoiceList.map((item: any) => {
      if (item.index === route?.params?.invoiceData?.index) {
        return {
          ...item,
          ...data,
        };
      }
      return item;
    });
    const latestChanges = updatedArray.filter(
      (item: any) => item.index === route?.params?.invoiceData?.index,
    )[0];
    dispatch(setInvoiceList(updatedArray));
    successMessage(latestChanges);
  };

  const successMessage = (element: any) => {
    ToastService.showToast('Updated Successfully');
    navigation.navigate('PaymentDetail', {
      invoiceUpdate: true,
      invoiceID: element._id,
      invoiceData: element,
    });
  };

  const successMessage2 = (element: any) => {
    ToastService.showToast('Updated Successfully');
    navigation.navigate('PaymentDetail', {
      estimateUpdate: true,
      estimateID: element._id,
      estimateData: element,
    });
  };

  return (
    <>
      <Loader visible={isLoading} size="large" color={Colors.landingColor} />
      <View style={styles.mainContainer}>
        <View style={{borderRadius: 8, backgroundColor: '#fff', padding: 10}}>
          <View style={[styles.rowView,{paddingVertical:2}]}>
            <Text style={styles.titleTxt}>Amount : </Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={amount}
                placeholder="$0.00"
                onChangeText={setAmount}
                keyboardType={'number-pad'}
                placeholderTextColor={'#d2d2d2'}
                style={{
                  fontSize: 18,
                  fontWeight: '400',
                  color: '#000',
                  height: 40,
                  width: '100%',
                  textAlign:'right'
                }}
              />
            </View>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>{t('Date')} : </Text>
            <Text
              onPress={() => setOpenDate(!openDate)}
              style={styles.titleTxt}>
              {moment(dueDate).format(selector.globalDateFormat)}
            </Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>{t('Payment Method')} : </Text>
            <Text onPress={() => setOpenModal(true)} style={styles.titleTxt}>
              {selectedPayment}
            </Text>
          </View>
        </View>
        <View style={styles.detailView}>
          <TextInput
            value={additionalDetails}
            onChangeText={text => setAdditionalDetails(text)}
            placeholder={t('Notes')}
            style={styles.detailText}
            numberOfLines={4}
            multiline
          />
        </View>
        <View>
          <DatePicker
            modal
            mode="date"
            open={openDate}
            date={new Date(dueDate)}
            onConfirm={date => {
              setDueDate(date);
              setOpenDate(false);
            }}
            onCancel={() => {
              setOpenDate(false);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={
            route?.params?.updateID ? handleUpdateCondition : handleCondition
          }
          style={GlobalStyle.statementBtn}>
          <Text style={[GlobalStyle.titleTxt2]}>
            {route?.params?.updateID ? t('Update') : t('Add')}
          </Text>
        </TouchableOpacity>
        <PaymentMode
          openModal={openModal}
          closeBottomSheet={() => setOpenModal(!openModal)}
          selectedOption={setSelectedPayment}
        />
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
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleTxt: {fontSize: 16, color: '#000', fontWeight: '500'},
  detailView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    paddingVertical: 5,
  },
  detailText: {
    height: 70,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
    textAlignVertical: 'top',
  },
  inputContainer: {
    width: '50%',
    justifyContent: 'center',
  },
});

export default PaymentScreen;
