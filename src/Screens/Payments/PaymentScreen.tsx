import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import PaymentMode from '../../CustomComponent/PaymentMode';
import { useTranslation } from 'react-i18next';

const PaymentScreen = () => {
  const {t, i18n} = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('Cash');

  return (
    <View style={styles.mainContainer}>
      <View style={{borderRadius: 8, backgroundColor: '#fff', padding: 8}}>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Amount : </Text>
          <View style={{width: '50%'}}>
            <TextInput
              placeholder="$0.00"
              placeholderTextColor={'#d2d2d2'}
              style={{...styles.titleTxt, flex: 1, textAlign: 'right'}}
            />
          </View>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Date')} : </Text>
          <Text style={styles.titleTxt}>06/05/2023</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Payment Method')} : </Text>
          <Text onPress={() => setOpenModal(true)} style={styles.titleTxt}>
            {selectedPayment}
          </Text>
        </View>
      </View>

      <View>
        {/* <DatePicker
          open={false}
          date={date}
          onConfirm={date => {
            setDueDate(date);
            setOpenDate(false);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        /> */}
      </View>
      <PaymentMode
        openModal={openModal}
        closeBottomSheet={() => setOpenModal(!openModal)}
        selectedOption={setSelectedPayment}
      />
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
    marginVertical: 5,
  },
  titleTxt: {fontSize: 16, color: '#000', fontWeight: '500'},
});

export default PaymentScreen;
