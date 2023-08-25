import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../Helper/Colors';
import CurrencyFormat from '../../CustomComponent/CurrencyFormat';
import DateFormat from '../../CustomComponent/DateFormat';
import MonthFormat from '../../CustomComponent/MonthFormat';
import LangFormat from '../../CustomComponent/LangFormat';
import {useTranslation} from 'react-i18next';
import {
  changeGlobalDateFormat,
  changeLanguage,
} from '../../redux/reducers/user/UserReducer';
import moment from 'moment';

const RegionScreen = () => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const selector = useSelector((state:any) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [monthsModal, setMonthsModal] = useState(false);
  const [currenciesModal, setCurrenciesModal] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [langModal, setLangModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('dd-MM-yyyy');
  const [selectedDate, setSelectedDate] = useState('DD-MM-yyyy');
  const [selectCurrency, setSelectCurrency] = useState('GBP');

  useEffect(() => {
    if (selector.language === 'en') {
      setSelectedLanguage('English (U.S.)');
    } else {
      setSelectedLanguage('Portuguese');
    }
  }, [selector.language]);

  useEffect(() => {
    if (selector.globalDateFormat) {
      setSelectedDate(selector.globalDateFormat);
    }
  }, [selector.globalDateFormat]);

  const changeLang = (selectedLanguage: any) => {
    i18n.changeLanguage(selectedLanguage.common);
    dispatch(changeLanguage(selectedLanguage.common));
    if (selectedLanguage.common === 'en') {
      setSelectedLanguage('English (U.S.)');
    } else {
      setSelectedLanguage('Portuguese');
    }
  };

  const changeGlobalDate = (date: any) => {
    setSelectedDate(date);
    dispatch(changeGlobalDateFormat(date));
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{borderRadius: 8, backgroundColor: '#fff', padding: 8}}>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Locale')} : </Text>
          <Text
            onPress={() => setLangModal(!langModal)}
            style={styles.titleTxt}>
            {selectedLanguage}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Tax Year begins')} : </Text>
          <Text
            onPress={() => setMonthsModal(!monthsModal)}
            style={styles.titleTxt}>
            January
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Currency')} : </Text>
          <Text
            onPress={() => setCurrenciesModal(!currenciesModal)}
            style={styles.titleTxt}>
            {selectCurrency}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Date Format')} : </Text>
          <Text
            onPress={() => setDateModal(!dateModal)}
            style={styles.titleTxt}>
            {selectedDate}
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
            {t('Preview')}{' '}
          </Text>
        </View>
        <View
          style={{
            padding: 8,
          }}>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>{t('Text')} : </Text>
            <Text style={styles.titleTxt}>{t('Invoice')}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>{t('Date')} : </Text>
            <Text style={styles.titleTxt}>{moment().format(selectedDate)}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>{t('Currency')} : </Text>
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
        selectedItem={selectedDate}
        openModal={dateModal}
        closeBottomSheet={() => setDateModal(!dateModal)}
        selectedOption={changeGlobalDate}
      />
      <CurrencyFormat
        openModal={currenciesModal}
        closeBottomSheet={() => setCurrenciesModal(!currenciesModal)}
        selectedOption={setSelectCurrency}
      />
      <MonthFormat
        openModal={monthsModal}
        closeBottomSheet={() => setMonthsModal(!monthsModal)}
        selectedOption={setSelectedPayment}
      />
      <LangFormat
        selectedItem={selectedLanguage}
        openModal={langModal}
        closeBottomSheet={() => setLangModal(!langModal)}
        selectedOption={changeLang}
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
