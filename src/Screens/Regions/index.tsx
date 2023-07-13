import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Colors} from '../../Helper/Colors';
import CurrencyFormat from '../../CustomComponent/CurrencyFormat';
import DateFormat from '../../CustomComponent/DateFormat';
import MonthFormat from '../../CustomComponent/MonthFormat';

const RegionScreen = () => {
  const [openModal, setOpenModal] = useState(false);
  const [monthsModal, setMonthsModal] = useState(false);
  const [currenciesModal, setCurrenciesModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);

  const [selectedPayment, setSelectedPayment] = useState('dd-MM-yyyy');

  return (
    <View style={styles.mainContainer}>
      <View style={{borderRadius: 8, backgroundColor: '#fff', padding: 8}}>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Locale : </Text>
          <Text
            onPress={() => setDateModal(!dateModal)}
            style={styles.titleTxt}>
            English (US)
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Tax Year begins : </Text>
          <Text
            onPress={() => setMonthsModal(!monthsModal)}
            style={styles.titleTxt}>
            January
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Currency : </Text>
          <Text
            onPress={() => setCurrenciesModal(!currenciesModal)}
            style={styles.titleTxt}>
            GBP
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Date Format : </Text>
          <Text
            onPress={() => setDateModal(!dateModal)}
            style={styles.titleTxt}>
            {selectedPayment}
          </Text>
        </View>
      </View>

      <View
        style={{
          borderRadius: 8,
          backgroundColor: '#fff',
          marginTop: 10,
        }}>
        <View style={[styles.rowView, styles.header]}>
          <Text style={[styles.titleTxt, {color: '#fff', fontSize: 18}]}>
            Preview{' '}
          </Text>
        </View>
        <View
          style={{
            padding: 8,
          }}>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>Text : </Text>
            <Text style={styles.titleTxt}>Invoice</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>Date : </Text>
            <Text style={styles.titleTxt}>13-07-2023</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>Currency : </Text>
            <Text style={styles.titleTxt}>$ 123.02</Text>
          </View>
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
      <DateFormat
        openModal={dateModal}
        closeBottomSheet={() => setDateModal(!dateModal)}
        selectedOption={setSelectedPayment}
      />
      <CurrencyFormat
        openModal={currenciesModal}
        closeBottomSheet={() => setCurrenciesModal(!currenciesModal)}
        selectedOption={setSelectedPayment}
      />
      <MonthFormat
        openModal={monthsModal}
        closeBottomSheet={() => setMonthsModal(!monthsModal)}
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
  header: {
    backgroundColor: Colors.landingColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 30,
    alignItems: 'center',
    paddingHorizontal: 8,
    marginVertical: 0,
  },
});

export default RegionScreen;
