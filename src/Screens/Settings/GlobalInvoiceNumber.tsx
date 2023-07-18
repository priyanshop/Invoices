import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {setDefaultInvoiceFormat} from '../../redux/reducers/user/UserReducer';

function GlobalInvoiceNumber({navigation}: any): JSX.Element {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user);
  const isFocused = useIsFocused();
  const [invoices, setInvoices] = useState('');
  const [estimate, setEstimate] = useState('');

  useEffect(() => {
    if (selector.token === 'Guest') {
      fetchData(selector.defaultInvoiceFormat);
    } else {
      getInfo();
    }
  }, [selector.token]);

  const fetchData = (data: any) => {
    const element = data;
    setEstimate(element.estimate_number_prefix);
    setInvoices(element.invoice_number_prefix);
  };

  const getInfo = async () => {
    try {
      const data = await FetchAPI('get', endpoint.invoiceNumber, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data.invoice_numbering;
        setEstimate(element.estimate_number_prefix);
        setInvoices(element.invoice_number_prefix);
      }
    } catch (error) {}
  };

  const addInfo = async () => {
    try {
      const payload = {
        invoice_number_prefix: invoices,
        estimate_number_prefix: estimate,
      };
      if (selector.token === 'Guest') {
        dispatch(setDefaultInvoiceFormat(payload));
      } else {
        const data = await FetchAPI('post', endpoint.invoiceNumber, payload, {
          Authorization: 'Bearer ' + selector.token,
        });
        if (data.status === 'success') {
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: Colors.commonBg, padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 3,
              paddingHorizontal: 8,
            }}>
            <View style={styles.mainView}>
              <Text style={styles.label}>Invoice Number: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={invoices}
                  style={styles.input}
                  placeholder={'INV0000'}
                  placeholderTextColor={'grey'}
                  onChangeText={setInvoices}
                  onBlur={addInfo}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>Estimate Number: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={estimate}
                  style={styles.input}
                  placeholder={'EST0000'}
                  placeholderTextColor={'grey'}
                  onChangeText={setEstimate}
                  onBlur={addInfo}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: Platform.OS === 'ios' ? 5 : 0,
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  inputContainer: {
    width: '50%',
  },
  input: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    height: 35,
  },
  itemView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  totalView: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
  },
  detailView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    paddingVertical: 5,
  },
  saveView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  totalTxt: {fontSize: 18, fontWeight: '500', color: '#fff'},
  detailText: {
    height: 35,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlignVertical: 'top',
  },
  saveText: {fontSize: 18, fontWeight: '400', color: '#000'},
  dateText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  photoView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoText: {fontSize: 17, fontWeight: '500', color: '#d1d1d1'},
});

export default GlobalInvoiceNumber;
