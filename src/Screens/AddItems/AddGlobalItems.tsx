import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector, useDispatch} from 'react-redux';
import {Menu, Switch} from 'react-native-paper';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {getScreenDimensions} from '../../Helper/ScreenDimension';
import {
  addItemInList,
  setItemList,
} from '../../redux/reducers/user/UserReducer';
import {removeObjectByIndex} from '../../Helper/CommonFunctions';
import {useTranslation} from 'react-i18next';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;

function AddGlobalItemScreen({navigation, route}: any): JSX.Element {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selector = useSelector((state: any) => state.user);
  const [Description, setDescription] = useState('');
  const [Taxable, setTaxable] = useState(false);
  const [Notes, setNotes] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [unit, setUnit] = useState('');
  const [visible, setVisible] = React.useState(false);
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [Id, setId] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={openMenu}>
          <Entypo name="dots-three-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    console.log('route.params', JSON.stringify(route.params));
    if (route?.params?.ItemId && selector.token !== 'Guest') {
      setId(route.params?.ItemId);
      getItem(route.params?.ItemId);
    } else {
      if (route.params?.selectedItem) {
        fetchClient(route.params?.selectedItem);
      }
    }
  }, [route.params]);

  const fetchClient = (data: any) => {
    const element = data;
    setNotes(element.notes);
    setUnitCost(element.rate.toString());
    setUnit(element.unit);
    setTaxable(element.is_taxable === 'true' ? true : false);
    setDescription(element.description);
    setAlreadyExist(true);
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
  };

  const getItem = async (id: any) => {
    try {
      const data = await FetchAPI('get', endpoint.getItems(id), null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data[0];
        setNotes(element.notes);
        setUnitCost(element.rate.toString());
        setUnit(element.unit);
        setTaxable(element.is_taxable);
        setDescription(element.description);
        setAlreadyExist(true);
      }
    } catch (error) {}
  };

  const create = async () => {
    try {
      if (Description.trim() === "") {
        navigation.goBack();
        return
      }
      const payload: any = {
        description: Description,
        rate: unitCost,
        unit: unit,
        is_taxable: Taxable.toString(),
        notes: Notes,
      };
      if (selector.token === 'Guest') {
        dispatch(addItemInList(payload));
        navigation.goBack();
      } else {
        const data = await FetchAPI('post', endpoint.addItems, payload, {
          Authorization: 'Bearer ' + selector.token,
        });
        if (data.status === 'success') {
          navigation.goBack();
        }
      }
    } catch (error) {}
  };

  const update = async () => {
    try {
      const payload: any = {
        description: Description,
        rate: unitCost,
        unit: unit,
        is_taxable: Taxable.toString(),
        notes: Notes,
      };
      if (selector.token === 'Guest') {
        const updatedArray = [...selector.itemsList];
        const objectToUpdate = updatedArray[route.params.index];
        updatedArray[route.params.index] = payload;
        dispatch(setItemList(updatedArray));
        navigation.goBack();
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateItems(Id),
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

  const deleteItem = async () => {
    try {
      if (selector.token === 'Guest') {
        const updatedArray = removeObjectByIndex(
          selector.itemsList,
          route.params.index,
        );
        dispatch(setItemList(updatedArray));
        navigation.goBack();
      } else {
        const data = await FetchAPI('delete', endpoint.deleteItems(Id), null, {
          Authorization: 'Bearer ' + selector.token,
        });
        if (data.status === 'success') {
          navigation.goBack();
        }
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
          onPress={deleteItem}
          title={t('Delete')}
        />
      </Menu>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 12,
            }}>
            <View style={styles.mainView}>
              <View style={[styles.inputContainer,{width:'100%'}]}>
                <TextInput
                  value={Description}
                  style={[styles.input2]}
                  placeholder={t('Description')}
                  placeholderTextColor={'grey'}
                  onChangeText={value =>
                    handleTextInputChange(value, setDescription)
                  }
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Unit Cost')} : </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={unitCost}
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor={'grey'}
                  onChangeText={value =>
                    handleTextInputChange(value, setUnitCost)
                  }
                  keyboardType={'numeric'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Unit')} : </Text>
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
              <Text style={styles.label}>{t('Taxable')} : </Text>
              <Switch
                value={Taxable}
                color={Colors.landingColor}
                onValueChange={(value: any) => setTaxable(value)}
              />
            </View>
          </View>
          {/* <View style={styles.totalView}>
            <Text style={styles.totalTxt}>Total:</Text>
            <Text style={styles.totalTxt}>195</Text>
          </View> */}
        </View>

        <View style={styles.detailView}>
          <TextInput
            value={Notes}
            placeholder={t('Additional Details')}
            placeholderTextColor={'grey'}
            style={styles.detailText}
            numberOfLines={4}
            multiline
            onChangeText={value => handleTextInputChange(value, setNotes)}
          />
        </View>
        <TouchableOpacity
          onPress={alreadyExist ? update : create}
          style={styles.statementBtn}>
          <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
            {alreadyExist ? t('Update') : t('Create')}
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
    // marginHorizontal:4
  },
  inputContainer: {
    width: '50%',
    justifyContent: 'center',
    // alignItems:'center'
  },
  input: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    height: 40,
    textAlignVertical: 'center',
  },
  input2: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    height: 40,
    textAlignVertical: 'center',
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
    paddingHorizontal: 13,
    marginVertical: 5,
    paddingVertical: 10,
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

export default AddGlobalItemScreen;
