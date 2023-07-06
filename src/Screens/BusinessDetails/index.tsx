import React, {useState} from 'react';
import {View, SectionList, Text, StyleSheet, TextInput} from 'react-native';
import DatePicker from 'react-native-date-picker';
import Feather from 'react-native-vector-icons/Feather';

const BusinessDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Due on receipt');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [poNumber, setPoNumber] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [openDate, setOpenDate] = useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={{borderRadius: 8, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 8,
            backgroundColor: 'grey',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}>
          <Text style={{fontSize: 17, color: '#fff', fontWeight: '500'}}>Business Logo</Text>
        </View>
        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',padding:10}}>
        <Feather name="camera" size={70} color="#d4d4d4" />
        </View>
      </View>
      <View style={styles.mainContain}>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Business Name"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Business Owner Name"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Business Number"
            placeholderTextColor={'grey'}
          />
        </View>
      </View>
      <View style={styles.mainContain}>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Address Line 1"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Address Line 2"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Address Line 3"
            placeholderTextColor={'grey'}
          />
        </View>
      </View>
      <View style={styles.mainContain}>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Email"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Phone"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Mobile"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Website"
            placeholderTextColor={'grey'}
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
    backgroundColor: '#d4d4d4',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  titleTxt: {fontSize: 17, color: '#000', fontWeight: '400'},
  mainContain: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 8,
    marginVertical: 5,
  },
});

export default BusinessDetails;
