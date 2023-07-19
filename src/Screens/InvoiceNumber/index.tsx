import React, {useState} from 'react';
import {View, SectionList, Text, StyleSheet, TextInput} from 'react-native';
import TermsComponent from '../../CustomComponent/TermsComponent';
import DatePicker from 'react-native-date-picker';
import { useTranslation } from 'react-i18next';

const InvoiceNumber = () => {
  const {t, i18n} = useTranslation();

  const [openModal, setOpenModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Due on receipt');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [poNumber, setPoNumber] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [openDate, setOpenDate] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={{borderRadius: 8, backgroundColor: '#fff', padding: 8}}>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Invoice Number')} : </Text>
          <View style={{width: '50%'}}>
            <TextInput
              style={{...styles.titleTxt, flex: 1, textAlign: 'right'}}
            />
          </View>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Date')} : </Text>
          <Text style={styles.titleTxt}>06/05/2023</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Terms')} : </Text>
          <Text onPress={() => setOpenModal(true)} style={styles.titleTxt}>
            {selectedTerm}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Due Date')} : </Text>
          <View style={{width: '50%'}}>
            <TextInput style={{flex: 1, textAlign: 'right'}} />
          </View>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('PO Number')} : </Text>
          <View style={{width: '50%'}}>
            <TextInput style={{flex: 1, textAlign: 'right'}} />
          </View>
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
  },
  titleTxt: {fontSize: 16, color: '#000', fontWeight: '500'},
});

export default InvoiceNumber;
