import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../Helper/Colors';
import {useTranslation} from 'react-i18next';
import ModalActivityIndicator from '../../CustomComponent/Loader';
import moment from 'moment';

const PaymentDetail = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selector = useSelector((state: any) => state.user);
  const [Loader, setLoader] = useState(false);
  const [latestList, setLatestList] = useState([]);
  const [totalAmount, setTotalAmount] = useState('0.00');
  const [duePayment, setDuePayment] = useState('0.00');
  const [billTotal, setBillTotal] = useState('0.00')
  useEffect(() => {}, [selector.token]);

  useEffect(() => {
    if (route?.params?.invoiceUpdate) {
      console.log('route?.params', route?.params?.invoiceData?.payments);
      setLatestList(route?.params?.invoiceData?.payments);
      setDuePayment(
        route?.params?.invoiceData?.due_amount?.toString() || '0.00',
      );
      setTotalAmount(
        route?.params?.invoiceData?.paid_amount?.toString() || '0.00',
      );
      setBillTotal(route?.params?.invoiceData?.invoice_total?.toString() || '0.00',)
    }

    if (route?.params?.estimateUpdate) {
      console.log('route?.params', route?.params?.estimateData?.payments);
      setLatestList(route?.params?.estimateData?.payments);
      setDuePayment(
        route?.params?.estimateData?.due_amount?.toString() || '0.00',
      );
      setTotalAmount(
        route?.params?.estimateData?.paid_amount?.toString() || '0.00',
      );
      setBillTotal(route?.params?.estimateData?.estimate_total?.toString() || '0.00')
    }
  }, [route?.params]);

  const navigateToPayment = () => {
    if (route?.params?.invoiceUpdate) {
      navigation.navigate('PaymentScreen', {
        invoiceUpdate: route.params.invoiceUpdate,
        invoiceID: route.params.invoiceID,
        invoiceData: route.params.invoiceData,
      });
    }
    if (route?.params?.estimateUpdate) {
      navigation.navigate('PaymentScreen', {
        estimateUpdate: route.params.estimateUpdate,
        estimateID: route.params.estimateID,
        estimateData: route.params.estimateData,
      });
    }
  };

  const navigateToExistingPayment = (item: any, index: any) => {
    if (route?.params?.invoiceUpdate) {
      navigation.navigate('PaymentScreen', {
        invoiceUpdate: route.params.invoiceUpdate,
        invoiceID: route.params.invoiceID,
        invoiceData: route.params.invoiceData,
        updateID: selector.token === 'Guest' ? index : item._id,
        data: item,
        index: index,
      });
    }
    if (route?.params?.estimateUpdate) {
      navigation.navigate('PaymentScreen', {
        estimateUpdate: route.params.estimateUpdate,
        estimateID: route.params.estimateID,
        estimateData: route.params.estimateData,
        updateID: selector.token === 'Guest' ? index : item._id,
        data: item,
        index: index,
      });
    }
  };

  return (
    <>
      <ModalActivityIndicator
        visible={Loader}
        size="large"
        color={Colors.landingColor}
      />
      <View style={styles.mainContainer}>
        <View style={styles.businessContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('Total')}</Text>
            <Text style={styles.headerText}>{'$' + billTotal}</Text>
          </View>
          {latestList.length > 0
            ? latestList.map((item: any, index: number) => (
                <TouchableOpacity
                  onPress={() => {
                    navigateToExistingPayment(item, index);
                  }}
                  style={{
                    ...styles.rowView,
                    borderBottomColor: '#ccc',
                    borderBottomWidth: 1,
                  }}>
                  <View>
                    <Text style={{...styles.titleTxt}}>
                      {moment(item?.payment_date).format(
                        selector.globalDateFormat,
                      )}
                    </Text>
                    <Text numberOfLines={3} style={{...styles.titleTxt2}}>
                      {item?.payment_notes}
                    </Text>
                  </View>
                  <Text style={{...styles.titleTxt}}>{'$' + item.amount}</Text>
                </TouchableOpacity>
              ))
            : null}
          <TouchableOpacity onPress={navigateToPayment} style={styles.rowView}>
            <Text style={{...styles.titleTxt, color: 'grey'}}>
              {'Add payment'}
            </Text>
            <Text style={{...styles.titleTxt, color: 'grey'}}>{'$ 0.00'}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.businessContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{t('Paid')}</Text>
            <Text style={styles.headerText}>{'$' + totalAmount}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={{...styles.titleTxt}}>{'Balance due'}</Text>
            <Text style={{...styles.titleTxt}}>{'$' + duePayment}</Text>
          </View>
        </View>
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
    textAlignVertical: 'center',
    // height: 40,
    // backgroundColor:'red',
    padding: 8,
  },
  titleTxt2: {
    fontSize: 15,
    color: '#ccc',
    fontWeight: '400',
    // height: 40,
    // backgroundColor:'red',
    paddingLeft: 8,
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
    justifyContent: 'space-between',
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

export default PaymentDetail;
