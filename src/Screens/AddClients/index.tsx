import React, {useState} from 'react';
import {
  View,
  SectionList,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {Colors} from '../../Helper/Colors';

const AddClientScreen = () => {
  const [businessName, setBusinessName] = useState('');
  const [contact, setContact] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Mobile, setMobile] = useState('');
  const [fax, setFax] = useState('');

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainContain}>
        <View style={styles.rowView}>
          <TextInput
            value={businessName}
            onChangeText={setBusinessName}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Client Name"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Email"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Mobile</Text>
          <TextInput
            value={Mobile}
            onChangeText={setMobile}
            style={{...styles.titleTxt, flex: 1, textAlign: 'right'}}
            placeholder="Mobile Number"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Phone</Text>
          <TextInput
            value={Phone}
            onChangeText={setPhone}
            style={{...styles.titleTxt, flex: 1, textAlign: 'right'}}
            placeholder="Phone Number"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>Fax</Text>
          <TextInput
            value={fax}
            onChangeText={setFax}
            style={{...styles.titleTxt, flex: 1, textAlign: 'right'}}
            placeholder="Fax Number"
            placeholderTextColor={'grey'}
          />
        </View>
      </View>

      <View style={styles.mainContain}>
        <View style={styles.rowView}>
          <TextInput
            value={contact}
            onChangeText={setContact}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Contact"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={address1}
            onChangeText={setAddress1}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Address Line 1"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={address2}
            onChangeText={setAddress2}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Address Line 2"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.rowView}>
          <TextInput
            value={address3}
            onChangeText={setAddress3}
            style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
            placeholder="Address Line 3"
            placeholderTextColor={'grey'}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.contactBtn}>
        <Text style={styles.titleTxt}>{'Import from contacts'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.statementBtn}>
        <Text style={[styles.titleTxt, {color: '#fff', fontWeight: '600'}]}>
          {'Create Statement'}
        </Text>
      </TouchableOpacity>
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
  contactBtn: {
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    marginVertical: 5,
  },
  statementBtn: {
    backgroundColor: Colors.appColor,
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    marginVertical: 5,
  },
});

export default AddClientScreen;
