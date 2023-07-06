import React, {useState} from 'react';
import {View, SectionList, Text, StyleSheet, TextInput} from 'react-native';
import TermsComponent from '../../CustomComponent/TermsComponent';

const InvoiceNumber = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Due on receipt');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [poNumber, setPoNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  
  return (
    <View style={styles.mainContainer}>
      <View style={{borderRadius: 8, backgroundColor: '#fff', padding: 8}}>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Invoice Number : </Text>
          <View style={{width: '50%'}}>
            <TextInput
              style={{...styles.titleTxt, flex: 1, textAlign: 'right'}}
            />
          </View>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Date : </Text>
          <Text style={styles.titleTxt}>06/05/2023</Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Terms : </Text>
          <Text onPress={() => setOpenModal(true)} style={styles.titleTxt}>
            {selectedTerm}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Due Date : </Text>
          <View style={{width: '50%'}}>
            <TextInput style={{flex: 1, textAlign: 'right'}} />
          </View>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>PO Number : </Text>
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
