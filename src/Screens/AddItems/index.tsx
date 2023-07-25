import React, {useLayoutEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {Switch} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import { endpoint } from '../../Networking/endpoint';

function AddItemScreen({navigation,route}: any): JSX.Element {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selector = useSelector((state:any) => state.user);
  const [Description, setDescription] = useState('');
  const [Taxable, setTaxable] = useState(false);
  const [Notes, setNotes] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [unit, setUnit] = useState('');
  const [Quantity, setQuantity] = useState('');
  const [Discount, setDiscount] = useState('');
  const [discountAmount, setDiscountAmount] = useState('');

  const [saveToItem, setSaveToItem] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={() => {}}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
  };

  const update = async () => {
    try {
      const payload :any = {
        description: Description,
        rate: unitCost,
        unit: unit,
        is_taxable: Taxable.toString(),
        notes: Notes,
      };
      if (selector.token === 'Guest') {
        // navigation.goBack();
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateIVItem(route?.params?.invoiceID),
          payload,
          {
            Authorization: 'Bearer ' + selector.token,
          },
        );
        if (data.status === 'success') {
          navigation.goBack();
        }
      }
    } catch (error) {}
  };
  
  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 12,
            }}>
            <View style={styles.mainView}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={Description}
                  style={[styles.input, {textAlign: 'left'}]}
                  placeholder={t('Description')}
                  placeholderTextColor={'grey'}
                  onChangeText={value =>
                    handleTextInputChange(value, setDescription)
                  }
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Unit Cost')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={unitCost}
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor={'grey'}
                  onChangeText={value =>
                    handleTextInputChange(value, setUnitCost)
                  }
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Unit')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={unit}
                  style={styles.input}
                  placeholder={t('hours,days')}
                  placeholderTextColor={'grey'}
                  onChangeText={value => handleTextInputChange(value, setUnit)}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Quantity')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={Quantity}
                  style={styles.input}
                  placeholder={'1'}
                  placeholderTextColor={'grey'}
                  onChangeText={value =>
                    handleTextInputChange(value, setQuantity)
                  }
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Discount')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={Discount}
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor={'grey'}
                  onChangeText={value =>
                    handleTextInputChange(value, setDiscount)
                  }
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Discount Amount')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={discountAmount}
                  style={styles.input}
                  placeholder={'$0'}
                  placeholderTextColor={'grey'}
                  onChangeText={value =>
                    handleTextInputChange(value, setDiscountAmount)
                  }
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Taxable')}: </Text>
              <Switch
                value={Taxable}
                color={Colors.landingColor}
                onValueChange={(value: any) => setTaxable(value)}
              />
            </View>
          </View>
          <View style={styles.totalView}>
            <Text style={styles.totalTxt}>{t('Total')}:</Text>
            <Text style={styles.totalTxt}>195</Text>
          </View>
        </View>

        <View style={styles.detailView}>
          <TextInput
            value={Notes}
            placeholder={t('Additional Details')}
            style={styles.detailText}
            numberOfLines={4}
            multiline
            onChangeText={value => handleTextInputChange(value, setNotes)}
          />
        </View>

        <View style={styles.itemView}>
          <View style={styles.saveView}>
            <Text style={styles.saveText}>{t('Save to "My Items"')}</Text>
            <Switch
              value={saveToItem}
              color={Colors.landingColor}
              onValueChange={(value: any) => setSaveToItem(value)}
            />
          </View>
        </View>

        <TouchableOpacity
          // onPress={true ? update : create}
          style={styles.statementBtn}>
          <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
            {true ? t('Update') : t('Create')}
          </Text>
        </TouchableOpacity>
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
    marginVertical: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  inputContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    height: 40,
  },
  itemView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  totalView: {
    backgroundColor: Colors.landingColor,
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
    height: 75,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlignVertical: 'top',
  },
  saveText: {fontSize: 18, fontWeight: '400', color: '#000'},
  statementBtn: {
    backgroundColor: Colors.appColor,
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    marginVertical: 5,
  },
  titleTxt2: {fontSize: 17, color: '#000', fontWeight: '400'},
});

export default AddItemScreen;
