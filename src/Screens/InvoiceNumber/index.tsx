import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput,TouchableOpacity} from 'react-native';
import TermsComponent from '../../CustomComponent/TermsComponent';
import DatePicker from 'react-native-date-picker';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalStyle} from '../../Helper/GlobalStyle';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import ToastService from '../../Helper/ToastService';
import {setInvoiceList} from '../../redux/reducers/user/UserReducer';

const InvoiceNumber = ({navigation, route}: any) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Due on receipt');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [poNumber, setPoNumber] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const selector = useSelector((state: any) => state.user);
  const [dueDate2, setDueDate2] = useState(new Date());

  useEffect(() => {
    setInvoiceStateFromParams(route.params?.invoiceData);
  }, [route.params]);

  const setInvoiceStateFromParams = (params: any) => {
    if (params) {
      const {invoice_number, invoice_date, terms, due_date, PO_number} = params;

      setSelectedTerm(terms || 'Due on receipt');
      setInvoiceNumber(invoice_number || '');
      setDate(new Date(invoice_date) || new Date());
      setPoNumber(PO_number || '');
      setDueDate(new Date(due_date) || new Date());
    }
  };

  const callAPI = async () => {
    const updatedData: any = {
      invoice_number: invoiceNumber,
      invoice_date: date,
      terms: selectedTerm,
      due_date: dueDate,
      PO_number: poNumber,
    };
    if (selector.token === 'Guest') {
      const updatedArray = selector.invoiceList.map((item: any) => {
        if (item.index === route?.params?.invoiceData.index) {
          return {
            ...item,
            ...updatedData,
          };
        }
        return item;
      });
      dispatch(setInvoiceList(updatedArray));
    } else {
      const data = await FetchAPI(
        'patch',
        endpoint.updateIVNumber(route?.params?.invoiceID),
        updatedData,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        successMessage();
      }
    }
  };

  const successMessage = () => {
    ToastService.showToast('Updated Successfully');
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <View style={{borderRadius: 8, backgroundColor: '#fff', padding: 8}}>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Invoice Number')} : </Text>
          <TextInput
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
            style={{...styles.titleTxt2, textAlign: 'right'}}
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Date')} : </Text>
          <Text onPress={() => setOpenDate(!openDate)} style={styles.titleTxt}>
            {' '}
            {moment(date).format(selector.globalDateFormat)}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Terms')} : </Text>
          <Text onPress={() => setOpenModal(true)} style={styles.titleTxt}>
            {selectedTerm}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Due Date')} : </Text>
          {/* <TextInput style={{...styles.titleTxt2, textAlign: 'right'}} /> */}
          <Text
            onPress={() => setDueDateOpen(!dueDateOpen)}
            style={styles.titleTxt}>
            {' '}
            {moment(dueDate2).format(selector.globalDateFormat)}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('PO Number')} : </Text>
          <TextInput
            value={poNumber}
            onChangeText={setPoNumber}
            style={{...styles.titleTxt2, textAlign: 'right'}}
          />
        </View>
      </View>
      <TouchableOpacity onPress={callAPI} style={GlobalStyle.statementBtn}>
        <Text style={[GlobalStyle.titleTxt2]}>{t('Update')}</Text>
      </TouchableOpacity>
      <TermsComponent
        modalVisible={openModal}
        setModalVisible={() => setOpenModal(false)}
        setSelectedTerm={setSelectedTerm}
      />
      <View>
        <DatePicker
          modal
          mode="date"
          open={dueDateOpen}
          date={new Date(dueDate2)}
          onConfirm={date => {
            setDueDate2(date);
            setDueDateOpen(false);
          }}
          onCancel={() => {
            setDueDateOpen(false);
          }}
        />
        <DatePicker
          modal
          mode="date"
          open={openDate}
          date={new Date(date)}
          onConfirm={date => {
            setDate(date);
            setOpenDate(false);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
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
    backgroundColor: '#d4d4d4',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    alignItems: 'center',
    paddingVertical: 2,
  },
  titleTxt: {fontSize: 16, color: '#000', fontWeight: '500'},
  titleTxt2: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    // height: 40,
    textAlignVertical: 'center',
    width: '50%',
    paddingVertical: 2,
  },
});

export default InvoiceNumber;
