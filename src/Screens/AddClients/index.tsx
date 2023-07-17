import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectContactPhone} from 'react-native-select-contact';
import {Menu} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {Colors} from '../../Helper/Colors';
import {getScreenDimensions} from '../../Helper/ScreenDimension';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;

const AddClientScreen = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user);
  const [clientName, setClientName] = useState('');
  const [contact, setContact] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [address3, setAddress3] = useState('');
  const [email, setEmail] = useState('');
  const [Phone, setPhone] = useState('');
  const [Mobile, setMobile] = useState('');
  const [fax, setFax] = useState('');
  const [hasPermission, setHasPermission] = useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [visible, setVisible] = React.useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={openMenu}>
          <Entypo name="dots-three-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      checkContactPermission();
    }
  }, []);

  useEffect(() => {
    console.log('route.params', JSON.stringify(route.params));
    if (route?.params?.clientId) {
      getClient(route.params.clientId);
    }
  }, [route.params]);

  const checkContactPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts Permission',
          message: 'This app needs access to your contacts.',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getPhoneNumber = () => {
    return selectContactPhone().then(selection => {
      if (!selection) {
        return null;
      }
      console.log(JSON.stringify(selection));

      let {contact, selectedPhone} = selection;
      setClientName(contact.name);
      setMobile(selectedPhone.number);
      setEmail(contact.emails[0].address);
      setAddress1(contact.postalAddresses[0].formattedAddress);
      setAddress2(contact.postalAddresses[0].state);
      setAddress3(contact.postalAddresses[0].street);

      console.log(
        `Selected ${selectedPhone.type} phone number ${selectedPhone.number} from ${contact.name}`,
      );
      return selectedPhone.number;
    });
  };

  const selectContact = () => {
    //    get().then(()=>{})
    if (hasPermission) {
      getPhoneNumber();
    }
    if (Platform.OS === 'ios') {
      getPhoneNumber();
    }
  };

  const create = async () => {
    try {
      const payload = {
        name: clientName,
        phone_number: Phone,
        email: email,
        mobile_number: Mobile,
        fax: fax,
        contact: contact,
        address1: address1,
        address2: address2,
        address3: address3,
      };
      const data = await FetchAPI('post', endpoint.addClient, payload, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        navigation.goBack();
      }
    } catch (error) {}
  };

  const update = async () => {
    try {
      const payload = {
        name: clientName,
        phone_number: Phone,
        email: email,
        mobile_number: Mobile,
        fax: fax,
        contact: contact,
        address1: address1,
        address2: address2,
        address3: address3,
      };
      const data = await FetchAPI(
        'patch',
        endpoint.updateClient(route.params.clientId),
        payload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        navigation.goBack();
      }
    } catch (error) {}
  };

  const getClient = async (clientId: any) => {
    try {
      const data = await FetchAPI('get', endpoint.getClient(clientId), null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data[0];
        setClientName(element.name);
        setEmail(element.email);
        setContact(element.contact);
        setAddress1(element.address1);
        setAddress2(element.address2);
        setAddress3(element.address3);
        setPhone(element.phone_number);
        setMobile(element.mobile_number);
        setFax(element.fax);
        setAlreadyExist(true);
      }
    } catch (error) {}
  };

  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
  };

  const deleteClient = async () => {
    try {
      const data = await FetchAPI(
        'delete',
        endpoint.deleteClient(route.params.clientId),
        null,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        navigation.goBack();
      }
    } catch (error) {}
  };
  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{x: screenWidth, y: 50}}>
        <Menu.Item
          disabled={!alreadyExist}
          onPress={deleteClient}
          title="Delete"
        />
      </Menu>
      <View style={styles.mainContainer}>
        <View style={styles.mainContain}>
          <View style={styles.rowView}>
            <TextInput
              value={clientName}
              onChangeText={value =>
                handleTextInputChange(value, setClientName)
              }
              style={{...styles.titleTxt, textAlign: 'left'}}
              placeholder="Client Name"
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={email}
              onChangeText={value => handleTextInputChange(value, setEmail)}
              style={{...styles.titleTxt, textAlign: 'left'}}
              placeholder="Email"
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>Mobile</Text>
            <TextInput
              value={Mobile}
              onChangeText={value => handleTextInputChange(value, setMobile)}
              style={{...styles.titleTxt, textAlign: 'right'}}
              placeholder="Mobile Number"
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>Phone</Text>
            <TextInput
              value={Phone}
              onChangeText={value => handleTextInputChange(value, setPhone)}
              style={{...styles.titleTxt, textAlign: 'right'}}
              placeholder="Phone Number"
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.rowView}>
            <Text style={styles.titleTxt}>Fax</Text>
            <TextInput
              value={fax}
              onChangeText={value => handleTextInputChange(value, setFax)}
              style={{...styles.titleTxt, textAlign: 'right'}}
              placeholder="Fax Number"
              placeholderTextColor={'grey'}
            />
          </View>
        </View>

        <View style={styles.mainContain}>
          <View style={styles.rowView}>
            <TextInput
              value={contact}
              onChangeText={value => handleTextInputChange(value, setContact)}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder="Contact"
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={address1}
              onChangeText={value => handleTextInputChange(value, setAddress1)}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder="Address Line 1"
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={address2}
              onChangeText={value => handleTextInputChange(value, setAddress2)}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder="Address Line 2"
              placeholderTextColor={'grey'}
            />
          </View>
          <View style={styles.rowView}>
            <TextInput
              value={address3}
              onChangeText={value => handleTextInputChange(value, setAddress3)}
              style={{...styles.titleTxt, flex: 1, textAlign: 'left'}}
              placeholder="Address Line 3"
              placeholderTextColor={'grey'}
            />
          </View>
        </View>

        <TouchableOpacity onPress={selectContact} style={styles.contactBtn}>
          <Text style={styles.titleTxt2}>{'Import from contacts'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={alreadyExist ? update : create}
          style={styles.statementBtn}>
          <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
            {alreadyExist ? 'Update' : 'Create'}
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
        onPress={alreadyExist ? update : create}
        style={styles.statementBtn}>
        <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
          {'Create Statement'}
        </Text>
      </TouchableOpacity> */}
      </View>
    </>
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
    // marginVertical: Platform.OS === 'ios' ? 8 : 0,
    alignItems: 'center',
    height: 40,
  },
  titleTxt: {
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
    // height: 40,
    textAlignVertical: 'center',
  },
  titleTxt2: {fontSize: 17, color: '#000', fontWeight: '400'},
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
