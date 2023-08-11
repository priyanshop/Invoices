import React, {useState} from 'react';
import {View, SectionList, Text, StyleSheet, TextInput} from 'react-native';
import TermsComponent from '../../CustomComponent/TermsComponent';
import DatePicker from 'react-native-date-picker';
import {useTranslation} from 'react-i18next';
import moment from 'moment';
import { useSelector } from 'react-redux';

const InvoiceNumber = () => {
  const {t, i18n} = useTranslation();

  const [openModal, setOpenModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Due on receipt');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [poNumber, setPoNumber] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const selector = useSelector((state: any) => state.user);

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
          <Text onPress={()=>setOpenDate(!openDate)} style={styles.titleTxt}>
            {' '}
            {moment(dueDate).format(selector.globalDateFormat)}
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
          <TextInput style={{...styles.titleTxt2, textAlign: 'right'}} />
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
      <TermsComponent
        modalVisible={openModal}
        setModalVisible={() => setOpenModal(false)}
        setSelectedTerm={setSelectedTerm}
      />
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
