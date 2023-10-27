//@ts-nocheck
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch, FAB, Portal, Provider, Menu} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';

import {getScreenDimensions} from '../../Helper/ScreenDimension';
import {Colors} from '../../Helper/Colors';
import {actionStyle, fabStyle} from '../../Helper/CommonStyle';
import {endpoint} from '../../Networking/endpoint';
import FetchAPI from '../../Networking';
import {setNewEstimateInList} from '../../Constant';
import {
  addNewEstimate,
  setEstimateList,
} from '../../redux/reducers/user/UserReducer';
import EmptyHistory from '../../CustomComponent/EmptyHistory';
import {FlatList} from 'react-native';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;
const tempData = {
  user: '',
  estimate_number: '',
  b_id: '',
  b_name: 'M',
  b_email: '',
  b_address1: '',
  b_address2: '',
  b_address3: '',
  b_business_logo: '',
  c_address1: '',
  c_address2: '',
  c_address3: '',
  is_estimate_tax_inclusive: true,
  notes: '',
  is_paid: false,
  _id: '',
  items: [],
  photos: [],
  createdAt: '',
  updatedAt: '',
  __v: 0,
  signature:""
};
function EstimationCreationScreen({navigation, route}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const selector = useSelector((state: any) => state.user);
  const data = [
    {key: 'first', title: t('Edit')},
    {key: 'second', title: t('Preview')},
    {key: 'third', title: t('History')},
  ];
  const actions = [
    {
      icon: () => (
        <MaterialCommunityIcons
          name="message-bulleted"
          size={22}
          color="#000"
        />
      ),
      label: t('Text'),
      onPress: () => console.log('Pressed notifications'),
      style: {backgroundColor: '#fff', borderRadius: 50},
      color: '#000',
      labelTextColor: '#000',
      containerStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
      },
    },
    {
      icon: () => <Fontisto name="email" size={22} color="#000" />,
      label: t('Email'),
      onPress: () => console.log('Pressed email'),
      style: {backgroundColor: '#fff', borderRadius: 50},
      color: '#000',
      labelTextColor: '#000',
      containerStyle: {
        backgroundColor: '#fff',
        borderRadius: 5,
      },
    },
  ];

  const [index, setIndex] = useState(0);
  const [routes] = useState(data);
  const [state, setState] = React.useState({open: false});
  const [globalData, setGlobalData] = useState(tempData);
  const [RequestReview, setRequestReview] = useState(false);

  const onStateChange = ({open}) => setState({open});
  const [visible, setVisible] = React.useState(false);
  const [paymentDue, setPaymentDue] = useState([]);
  const [created, setCreated] = useState(false);

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
    if (!created && route.params.status === 'create') {
      if (selector.token === 'Guest') {
        offline();
      } else {
        createEstimateCall();
      }
    }
    if (route.params.status === 'update') {
      if (selector.token === 'Guest') {
        console.log(
          'selector.estimateList==',
          JSON.stringify(selector.estimateList),
        );
        const index = findIndexById(
          route?.params?.data.index,
          selector.estimateList,
        );
        setOffline(selector.estimateList[index]);
      } else {
        getEstimateCall(route?.params?.data);
      }
    }
  }, [route?.params, isFocused]);

  const findIndexById = (id: any, data: any) => {
    return data.findIndex((item: any) => item.index === id);
  };

  const getEstimateCall = async (estimateDetail: any) => {
    try {
      const data = await FetchAPI(
        'get',
        endpoint.getEstimateDetail(estimateDetail._id),
        null,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        setGlobalData(element);
        fetchPaymentDue(element);
      }
    } catch (error) {}
  };

  const offline = () => {
    const payload = setNewEstimateInList(selector);

    dispatch(addNewEstimate(payload));
    setGlobalData(payload);
    fetchPaymentDue(payload);
    setCreated(true);
  };

  const setOffline = (payload: any) => {
    setGlobalData(payload);
    fetchPaymentDue(payload);
  };

  const createEstimateCall = async () => {
    try {
      const data = await FetchAPI('post', endpoint.createEstimate, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data;
        setGlobalData(element);
        fetchPaymentDue(element);
        setCreated(true);
      }
    } catch (error) {}
  };

  const duplicateET = async () => {
    try {
      const data = await FetchAPI(
        'post',
        endpoint.duplicateET(route?.params?.data?._id),
        null,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        Alert.alert('', 'Duplicate Estimate is created successfully');
      }
    } catch (error) {}
  };

  const createInvoice = async () => {
    try {
      const data = await FetchAPI(
        'post',
        endpoint.makeInvoiceET(route?.params?.data?._id),
        null,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        //  Alert.alert("","Duplicate Estimate is created successfully")
      }
    } catch (error) {}
  };
  const deleteET = async () => {
    try {
      if (selector.token === 'Guest') {
        const arr = [...selector.estimateList];

        const indexOfObject = arr.findIndex(object => {
          return object.index === route?.params?.data.index;
        });

        if (indexOfObject !== -1) {
          arr.splice(indexOfObject, 1);
        }
        navigation.navigate(t('bottomNav.Estimates'));

        Alert.alert('', 'Estimate is deleted successfully');
        setTimeout(() => {
          dispatch(setEstimateList(arr));
        }, 500);
      } else {
        const data = await FetchAPI(
          'delete',
          endpoint.deleteET(route?.params?.data?._id),
          null,
          {
            Authorization: 'Bearer ' + selector.token,
          },
        );
        if (data.status === 'success') {
          Alert.alert('', 'Estimate is deleted successfully');
          navigation.navigate(t('bottomNav.Estimates'));
        }
      }
    } catch (error) {}
  };

  const fetchPaymentDue = (element: any) => {
    setPaymentDue([
      {
        key: 'first',
        title: t('Discount'),
        value: '$' + parseFloat(element.estimate_discount_amount || 0),
        onPress: () => navigateToDiscountScreen(),
      },
      {
        key: 'second',
        title: t('Tax'),
        value: '$' + parseFloat(element.estimate_total_tax_amount || 0),
        onPress: () => navigateToTaxScreen(),
      },
      {
        key: 'third',
        title: t('Total'),
        value:
          '$' +
          (
            parseFloat(element.estimate_total_tax_amount || 0) +
            parseFloat(element.estimate_total || 0) -
            parseFloat(element.estimate_discount_amount || 0)
          ).toFixed(2),
      },
      {
        key: 'fourth',
        title: t('Total Payments'),
        value: '$0.00',
      },
    ]);
  };
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);


  const {open} = state;

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  function navigateToBusinessDetails() {
    if (route.params.status === 'update') {
      navigation.navigate('BusinessDetails', {
        estimateUpdate: true,
        estimateID: globalData._id,
        data: globalData,
      });
    } else {
      navigation.navigate('BusinessDetails', {
        estimateUpdate: true,
        estimateID: globalData._id,
        data: globalData,
      });
    }
  }

  function navigateToAddClientScreen() {
    if (globalData.c_name) {
      navigation.navigate('AddClientScreen', {
        estimateUpdate: true,
        estimateID: globalData._id,
        estimateData: globalData,
        data: globalData,
      });
    } else {
      navigation.navigate('ClientScreen', {
        estimateUpdate: true,
        estimateID: globalData._id,
        data: globalData,
      });
    }
  }

  const navigateToAddItemScreen = () => {
    navigation.navigate('AddItemScreen', {
      estimateUpdate: true,
      estimateID: globalData._id,
      estimateData: globalData,
    });
  };

  function navigateToAddPhotoScreen() {
    navigation.navigate('AddPhotoScreen',{
      estimateUpdate: true,
      estimateID: globalData._id,
    });
  }

  function navigateToPaymentInfo() {
    navigation.navigate('PaymentInfo');
  }

  function navigateToAdditionalDetails() {
    navigation.navigate('AdditionalDetails', {
      estimateUpdate: true,
      estimateID: globalData._id,
      estimateData: globalData,
    });
  }

  function navigateToInvoiceNumber() {
    navigation.navigate('EstimationNumber',{
      estimateUpdate: true,
      estimateID: globalData._id,
      estimateData: globalData,
    });
  }

  function navigateToSignaturePad() {
    navigation.navigate('SignaturePad',{
      estimateUpdate: true,
      estimateID: globalData._id,
      signature: globalData.signature,
      data: globalData
  });
  }

  function navigateToDiscountScreen() {
    navigation.navigate('DiscountScreen', {
      estimateUpdate: true,
      estimateID: globalData._id,
      estimateData: globalData,
      index: index,
    });
  }

  const navigateToTaxScreen = () => {
    navigation.navigate('TaxScreen', {
      estimateUpdate: true,
      estimateID: globalData._id,
      estimateData: globalData,
      index: index,
    });
  };

  function navigateToItemScreen(index: any) {
    navigation.navigate('AddItemScreen', {
      estimateUpdate: true,
      estimateID: globalData._id,
      estimateData: globalData,
      index: index,
    });
  }

  const itemsData = [
    {
      key: 'first',
      title: t('Discount'),
      value: '$0.00',
      onPress: () => navigateToDiscountScreen(),
    },
    {
      key: 'second',
      title: t('Tax'),
      value: '$0.00',
      onPress: () => navigateToTaxScreen(),
    },
    {key: 'third', title: t('Total'), value: '$0.00'},
  ];

  const AllRoute = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scene, {backgroundColor: Colors.commonBg, padding: 8}]}>
        <TouchableOpacity
          onPress={navigateToInvoiceNumber}
          style={styles.invoiceTopView}>
          <View style={{justifyContent: 'space-between'}}>
            <Text style={styles.invoiceTitle}>
              {globalData.estimate_number || ''}
            </Text>
            <Text
              onPress={navigateToBusinessDetails}
              style={styles.businessInfo}>
              {t('Business Info')}
            </Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text style={styles.dueDate}>
              {moment(globalData.createdAt).format(selector.globalDateFormat)}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.clientView}>
          <Text style={styles.toTxt}>{t('To')} : </Text>
          {globalData.c_name ? (
            <Text onPress={navigateToAddClientScreen} style={styles.toTxt}>
              {globalData.c_name}{' '}
            </Text>
          ) : (
            <Text onPress={navigateToAddClientScreen} style={styles.clientTxt}>
              {t('Client')}
            </Text>
          )}
        </View>

        <View style={styles.ItemView}>
          {globalData?.items?.length > 0 &&
            globalData?.items?.map((item: any, index: number) => (
              <TouchableOpacity
                onPress={() => navigateToItemScreen(index)}
                style={styles.ItemColumn}>
                <View>
                  <Text style={styles.dueBalText}>{item.description} </Text>
                  <Text style={styles.dueBalText2}>{item.item_notes} </Text>
                  {item.discount_amount && (
                    <Text style={styles.dueBalText2}>
                      {'Discount'}{' '}
                      {item.discount_type === 'Percentage'
                        ? item.discount_rate + '%'
                        : ''}{' '}
                    </Text>
                  )}
                </View>
                <View>
                  <Text style={styles.dueBalText3}>
                    {item.quantity + ' * $' + item.unit}
                  </Text>
                  <Text style={styles.dueBalText3}>{'$' + item.total}</Text>
                  <Text style={styles.dueBalText4}>
                    {item.discount_amount &&
                      '-$' + parseFloat(item.discount_amount || 0).toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          <TouchableOpacity
            onPress={() =>
              globalData?.items?.length > 0
                ? navigateToItemScreen('New')
                : navigateToAddItemScreen()
            }
            style={styles.ItemColumn}>
            <View>
              <Text style={styles.addItemTxt}>{t('Add Item')} </Text>
            </View>
            <View>
              <Text style={styles.itemPriceTxt}>{'0 * $0.00'}</Text>
              <Text style={styles.itemPriceTxt}>{'$0.00'}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.itemTotal}>
            <Text style={styles.itemTotalTxt}>{t('Subtotal')}</Text>
            <Text style={styles.itemTotalTxt}>{globalData.estimate_total}</Text>
          </View>
        </View>

        <View style={styles.dueBalContainer}>
          {paymentDue.map((selectedItem: any) => (
            <View style={styles.dueBalContent}>
              <TouchableOpacity
                onPress={selectedItem.onPress}
                style={styles.dueBalRow}>
                <Text style={styles.dueBalText}>{selectedItem.title}</Text>
                <Text style={styles.dueBalText}>{selectedItem.value}</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.dueBalFooter}>
            <Text style={styles.dueBalFooterText}>{t('Balance Due')}</Text>
            <Text style={styles.dueBalFooterText}>
              {parseFloat(globalData.estimate_total_tax_amount || 0) +
                parseFloat(globalData.estimate_total || 0)}
            </Text>
          </View>
        </View>

        <View style={styles.photoContainer2}>
          {globalData.photos?.length > 0 &&
            globalData.photos.map((item: any) => {
              return (
                <View style={styles.photoElement}>
                  <Text style={styles.notesText3}>
                    {item.photo_description}
                  </Text>
                  <Text style={styles.notesText4}>{item.photo_notes}</Text>
                </View>
              );
            })}
          <View style={styles.photoContainer}>
            <Text style={styles.photoText}>{t('Add photo')}</Text>
            <TouchableOpacity onPress={navigateToAddPhotoScreen}>
              <Icon name="attach" size={22} style={styles.photoIcon} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.notesContainer}>
          <View style={styles.notesRow}>
          {globalData.signature ? (
              <Text onPress={navigateToSignaturePad} style={styles.notesText2}>
                {"Signed"}
              </Text>
            ) : (
              <Text onPress={navigateToSignaturePad} style={styles.notesText}>
                {t('Signature')}
              </Text>
            )}
          </View>
          <TouchableOpacity
            onPress={navigateToAdditionalDetails}
            style={styles.notesLastRow}>
            {globalData.notes ? (
              <Text onPress={navigateToAdditionalDetails} style={styles.toTxt}>
                {globalData.notes}{' '}
              </Text>
            ) : (
              <Text style={styles.notesText}>{t('Notes')}</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.requestContainer}>
          <View style={styles.requestSwitchRow}>
            <Text style={styles.requestText}>{t('Request Review')}</Text>
            <Switch
              value={RequestReview}
              color={Colors.landingColor}
              onValueChange={(value: any) => setRequestReview(value)}
            />
          </View>
          {/* <View style={styles.requestLinkRow}> */}
          <TextInput
            placeholder={t('Review Link')}
            style={styles.requestLinkText}
            placeholderTextColor={'#d1d1d1'}
          />
          {/* </View> */}
        </View>

        <TouchableOpacity onPress={createInvoice} style={styles.paidContainer}>
          <Text style={styles.paidText}>{t('Make Invoice')}</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const OutStandingRoute = () => {
    return (
      <View style={[styles.scene, {backgroundColor: Colors.commonBg}]}></View>
    );
  };

  const HistoryRoute = () => {
    const renderEmptyComponent = () => (
      <EmptyHistory message={t('emptyEstimateHistory')} />
    );

    return (
      <View style={[styles.scene, {backgroundColor: Colors.commonBg}]}>
        <FlatList
          data={[]}
          renderItem={() => <View />}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={{flex: 1}}
        />
      </View>
    );
  };

  return (
    <Provider>
      <Portal>
        <View style={styles.container}>
          <StatusBar backgroundColor={Colors.appColor} />
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={{x: screenWidth - 15, y: -10}}
            style={{width: 200}}>
            <Menu.Item onPress={deleteET} title={t('Delete')} />
            <Menu.Item onPress={() => {}} title={t('Open In ..')} />
            <Menu.Item onPress={() => {}} title={t('Share')} />
            <Menu.Item onPress={() => {}} title={t('Print')} />
            {/* <Menu.Item onPress={() => {}} title={t('Get Link')} /> */}
            <Menu.Item onPress={createInvoice} title={t('Make Invoice')} />
            <Menu.Item onPress={duplicateET} title={t('Duplicate')} />
          </Menu>
          <TabView
            navigationState={{index, routes}}
            renderScene={SceneMap({
              first: AllRoute,
              second: OutStandingRoute,
              third: HistoryRoute,
            })}
            onIndexChange={setIndex}
            initialLayout={{width: screenWidth}}
            style={styles.container2}
            sceneContainerStyle={styles.container2}
            renderTabBar={props => {
              return (
                <TabBar
                  {...props}
                  indicatorStyle={{backgroundColor: '#fff', height: 2}}
                  style={{backgroundColor: Colors.appColor}}
                  labelStyle={{fontSize: 15, fontWeight: '500'}}
                />
              );
            }}
          />
        </View>
        <FAB.Group
          open={open}
          icon={() => <Entypo name="paper-plane" size={22} color="#fff" />}
          actions={actions.map(action => ({...action, ...actionStyle}))}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
          fabStyle={fabStyle}
          backdropColor="rgba(0,0,0,0.5)"
        />
      </Portal>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.appColor,
  },
  container2: {
    flex: 1,
  },
  paragraph: {
    marginVertical: 10,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  underLine: {
    textDecorationLine: 'underline',
    fontWeight: '700',
  },
  btnTxt: {
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.landingColor,
  },
  btn: {
    backgroundColor: '#fff',
    padding: 8,
    alignSelf: 'center',
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  scene: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    backgroundColor: Colors.appColor,
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#fff',
  },
  sectionHeader: {
    fontSize: 15,
    fontWeight: '400',
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  clientText: {
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
  },
  invoiceNumberText: {
    color: 'grey',
    fontSize: 13,
    fontWeight: '400',
  },
  priceText: {
    textAlign: 'right',
    color: '#000',
    fontSize: 13,
    fontWeight: '400',
  },
  dateText: {
    color: 'grey',
    fontSize: 13,
    fontWeight: '400',
  },
  sectionHeaderContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 5,
  },
  onSearch: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    padding: 3,
    height: 28,
    alignItems: 'center',
    borderRadius: 5,
  },
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  textSubheader: {
    fontSize: 18,
    fontWeight: '400',
    color: '#d1d1d1',
  },
  textSmall: {
    fontSize: 14,
    fontWeight: '400',
    color: 'grey',
  },
  textRight: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
  },
  borderedBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    borderColor: 'grey',
    marginBottom: 10,
  },
  subtotalBox: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
  },
  balanceDueBox: {
    backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
  },
  paymentInfoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  },
  notesBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 70,
  },
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    alignItems: 'center',
  },
  centeredBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  invoiceTopView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
  },
  invoiceTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 5,
  },
  businessInfo: {fontSize: 16, fontWeight: '400', color: '#d1d1d1'},
  dueBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    borderColor: 'grey',
    marginBottom: 10,
  },
  dueTxt: {fontSize: 14, fontWeight: '400', color: 'grey'},
  dueDate: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
  },
  clientView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
  },
  toTxt: {fontSize: 16, fontWeight: '400', color: '#000'},
  clientTxt: {fontSize: 16, fontWeight: '400', color: '#d1d1d1', width: '100%'},
  ItemView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  ItemColumn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  addItemTxt: {fontSize: 16, fontWeight: '500', color: '#d1d1d1'},
  itemPriceTxt: {
    fontSize: 16,
    fontWeight: '400',
    color: '#d1d1d1',
    textAlign: 'right',
  },
  itemTotal: {
    backgroundColor: Colors.landingColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
  },
  itemTotalTxt: {fontSize: 16, fontWeight: '500', color: '#fff'},
  dueBalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  dueBalContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dueBalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dueBalText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  dueBalText3: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
  },
  dueBalText2: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
  },
  dueBalText4: {
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
    textAlign: 'right',
  },
  dueBalFooter: {
    backgroundColor: Colors.landingColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
  },
  dueBalFooterText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  photoContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  photoElement: {
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    borderBottomColor: '#d1d1d1',
    paddingVertical: 7,
  },
  photoContainer2: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    // paddingVertical: 12,
    marginVertical: 5,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  photoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#d1d1d1',
  },
  photoIcon: {
    color: '#d2d2d2',
  },
  notesContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  notesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
  },
  notesLastRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    height: 70,
  },
  notesText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#d1d1d1',
  },
  notesText2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  notesText3: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
  },
  notesText4: {
    fontSize: 14,
    fontWeight: '400',
    color: '#d1d1d1',
  },
  requestContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  requestSwitchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.3,
    alignItems: 'center',
  },
  requestLinkRow: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flex: 1,
  },
  requestText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  requestLinkText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    height: 40,
    textAlignVertical: 'center',
    marginVertical: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  paidContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  paidText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
});

export default EstimationCreationScreen;
