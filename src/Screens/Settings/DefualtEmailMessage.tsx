import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';

const DefaultEmailMessage = () => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [paymentInstructions, setPaymentInstructions] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.businessContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Message to customer</Text>
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={additionalDetails}
            onChangeText={setAdditionalDetails}
            style={styles.titleTxt}
            placeholder="Default Email Message"
            placeholderTextColor={'grey'}
            multiline
            numberOfLines={4}
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
    // marginVertical: 8,
    padding: 2,
    paddingHorizontal: 8,
  },
  titleTxt: {
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
    flex: 1,
    textAlign: 'left',
    height: 60,
    textAlignVertical: 'top',
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
    backgroundColor: 'grey',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
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

export default DefaultEmailMessage;