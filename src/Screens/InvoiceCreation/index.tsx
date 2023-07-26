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
import {actionStyle, fabStyle} from '../../Helper/CommonStyle';
import {getScreenDimensions} from '../../Helper/ScreenDimension';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {addNewInvoice} from '../../redux/reducers/user/UserReducer';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;
const importedData: any = {
  status: 'success',
  message: 'Invoice data',
  data: {
    _id: '64bfa697cfd6ecfd2fc76d09',
    user: '64b4de67066c5dd236d85817',
    invoice_number: 'INV001s4',
    invoice_date: '2023-07-24T18:30:00.000Z',
    b_id: '64b52408066c5dd236d85abe',
    b_name: 'My business',
    b_email: 'Tereff@gmail.com',
    b_address1: 'Fdsgsdf',
    b_address2: 'Gfsdgsd',
    b_address3: 'Dfsgsdfg',
    b_business_logo: 'logo.png ',
    c_address1: '',
    c_address2: 'GA',
    c_address3: '3494 Kuhl Avenue',
    is_invoice_tax_inclusive: false,
    paypal_email: 'Trtrtr.@hm.dvv',
    make_checks_payable: 'Jjjj',
    payment_instructions: 'Prius should',
    additional_payment_instructions: 'Gsdfgsdfg',
    notes: 'Gfgdgdf',
    is_paid: false,
    items: [
      {
        description: 'testing',
        unit: '123',
        rate: 10,
        discount_rate: 10,
        discount_type: 'Percentage',
        discount_value: 10,
        discount_amount: 10,
        total: 100,
        discount_total: 10,
        is_taxable: true,
        item_notes: 'for testing',
        _id: '64bfcfc2f9a4c1b1f6339fa9',
      },
      {
        description: 'testing 222',
        unit: '123',
        rate: 10,
        discount_rate: 10,
        discount_type: 'none',
        discount_value: 10,
        discount_amount: 10,
        total: 100,
        discount_total: 10,
        is_taxable: true,
        item_notes: 'for testing',
        _id: '64bfcfc2f9a4c1b1f6339faa',
      },
    ],
    photos: [],
    payments: [],
    createdAt: '2023-07-25T10:40:23.284Z',
    updatedAt: '2023-07-25T13:36:02.810Z',
    __v: 0,
    b_business_number: 423423423,
    b_mobile_number: '464654645',
    b_owner_name: '8868768',
    b_phone_number: '45546546546',
    b_website: 'Dsfsdf',
    c_contact: '',
    c_email: 'John-Appleseed@mac.com',
    c_fax: '',
    c_mobile_number: '888-555-5512',
    c_name: 'John Appleseed',
    c_phone_number: '548878787878',
    invoice_discount_amount: 120,
    invoice_discount_type: 'zero',
    invoice_discount_value: 100,
    invoice_tax_label: 'aaaa',
    invoice_tax_rate: 10,
    invoice_tax_type: 'zero',
    invoice_total: 50,
    invoice_total_tax_amount: 20,
  },
};

function InvoiceCreationScreen({navigation, route}: any): JSX.Element {
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
  const [searchStart, setSearchStart] = useState(false);
  const [routes] = useState(data);
  const [globalData, setGlobalData] = useState(importedData.data);
  const [state, setState] = React.useState({open: false});
  const {open} = state;

  const onStateChange = ({open}) => setState({open});
  const [visible, setVisible] = React.useState(false);
  const [paymentDue, setPaymentDue] = useState([]);

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
    if (route.params.status === 'create') {
      if (selector.token === 'Guest') {
        offline();
      } else {
        createInvoiceCall();
      }
    }
    if (route.params.status === 'update') {
      if (selector.token === 'Guest') {
        setOffline(selector.invoiceList[route?.params?.data.index]);
      } else {
        getInvoiceCall(route?.params?.data);
      }
    }
  }, [isFocused]);

  const offline = () => {
    const payload = {
      _id: '',
      user: '',
      invoice_number: 'INV' + (selector.invoiceList.length + 1),
      invoice_date: new Date(),
      b_id: '',
      b_name: selector.businessDetails.name,
      b_email: selector.businessDetails.email,
      b_address1: selector.businessDetails.address1,
      b_address2: selector.businessDetails.address2,
      b_address3: selector.businessDetails.address3,
      b_business_logo: selector.businessDetails.business_logo,
      is_invoice_tax_inclusive: false,
      paypal_email: selector.paymentInfo.paypal_email,
      make_checks_payable: selector.paymentInfo.make_checks_payable,
      payment_instructions: selector.paymentInfo.payment_instructions,
      additional_payment_instructions:
        selector.paymentInfo.additional_payment_instructions,
      notes: selector.defaultNotes.invoices,
      is_paid: false,
      items: [],
      photos: [],
      payments: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0,
      b_business_number: selector.businessDetails.business_number,
      b_mobile_number: selector.businessDetails.mobile_number,
      b_owner_name: selector.businessDetails.owner_name,
      b_phone_number: selector.businessDetails.phone_number,
      b_website: selector.businessDetails.website,
      index: selector.invoiceList.length,
    };
    dispatch(addNewInvoice(payload));
    setGlobalData(payload);
    setPaymentDue([
      {
        key: 'first',
        title: t('Discount'),
        value: '$' + (payload.invoice_discount_amount || 0),
        onPress: () => navigateToDiscountScreen(),
      },
      {
        key: 'second',
        title: t('Tax'),
        value: '$' + (payload.invoice_total_tax_amount || 0),
        onPress: () => navigateToTaxScreen(),
      },

      {
        key: 'third',
        title: t('Total'),
        value:
          '$' +
          ((payload.invoice_total_tax_amount || 0) +
            (payload.invoice_total || 0)),
      },
    ]);
  };

  const setOffline = (payload: any) => {
    setGlobalData(payload);
    setPaymentDue([
      {
        key: 'first',
        title: t('Discount'),
        value: '$' + (payload.invoice_discount_amount || 0),
        onPress: () => navigateToDiscountScreen(),
      },
      {
        key: 'second',
        title: t('Tax'),
        value: '$' + (payload.invoice_total_tax_amount || 0),
        onPress: () => navigateToTaxScreen(),
      },

      {
        key: 'third',
        title: t('Total'),
        value:
          '$' +
          ((payload.invoice_total_tax_amount || 0) +
            (payload.invoice_total || 0)),
      },
    ]);
  };
  const getInvoiceCall = async (invoiceDetail: any) => {
    try {
      const data = await FetchAPI(
        'get',
        endpoint.getInvoiceDetail(invoiceDetail._id),
        null,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        setGlobalData(element);
        setPaymentDue([
          {
            key: 'first',
            title: t('Discount'),
            value: '$' + (element.invoice_discount_amount || 0),
            onPress: () => navigateToDiscountScreen(),
          },
          {
            key: 'second',
            title: t('Tax'),
            value: '$' + (element.invoice_total_tax_amount || 0),
            onPress: () => navigateToTaxScreen(),
          },

          {
            key: 'third',
            title: t('Total'),
            value:
              '$' +
              ((element.invoice_total_tax_amount || 0) +
                (element.invoice_total || 0)),
          },
        ]);
      }
    } catch (error) {}
  };

  const createInvoiceCall = async () => {
    try {
      const data = await FetchAPI('post', endpoint.createInvoice, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data;
        setGlobalData(element);
        setPaymentDue([
          {
            key: 'first',
            title: t('Discount'),
            value: '$' + (element.invoice_discount_amount || 0),
            onPress: () => navigateToDiscountScreen(),
          },
          {
            key: 'second',
            title: t('Tax'),
            value: '$' + (element.invoice_total_tax_amount || 0),
            onPress: () => navigateToTaxScreen(),
          },

          {
            key: 'third',
            title: t('Total'),
            value:
              '$' +
              ((element.invoice_total_tax_amount || 0) +
                (element.invoice_total || 0)),
          },
        ]);
      }
    } catch (error) {}
  };

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  function navigateToBusinessDetails() {
    if (route.params.status === 'update') {
      navigation.navigate('BusinessDetails', {
        invoiceUpdate: true,
        invoiceID: globalData._id,
        data: globalData,
      });
    } else {
      navigation.navigate('BusinessDetails', {
        invoiceUpdate: true,
        invoiceID: globalData._id,
      });
    }
  }

  function navigateToAddClientScreen() {
    if (globalData.c_name) {
      navigation.navigate('AddClientScreen', {
        invoiceUpdate: true,
        invoiceID: globalData._id,
        invoiceData: globalData,
        data: globalData,
      });
    } else {
      navigation.navigate('ClientScreen', {
        invoiceUpdate: true,
        invoiceID: globalData._id,
        data: globalData,
      });
    }
  }

  function navigateToAddItemScreen() {
    navigation.navigate('AddItemScreen', {
      invoiceUpdate: true,
      invoiceID: globalData._id,
      invoiceData: globalData,
    });
  }

  function navigateToItemScreen(index: any) {
    navigation.navigate('AddItemScreen', {
      invoiceUpdate: true,
      invoiceID: globalData._id,
      invoiceData: globalData,
      index: index,
    });
  }

  function navigateToAddPhotoScreen() {
    navigation.navigate('AddPhotoScreen', {
      invoiceUpdate: true,
      invoiceID: globalData._id,
    });
  }

  function navigateToPaymentInfo() {
    navigation.navigate('PaymentInfo', {
      invoiceUpdate: true,
      invoiceID: globalData._id,
      invoiceData: globalData,
    });
  }

  function navigateToAdditionalDetails() {
    navigation.navigate('AdditionalDetails', {
      invoiceUpdate: true,
      invoiceID: globalData._id,
      invoiceData: globalData,
    });
  }

  function navigateToInvoiceNumber() {
    navigation.navigate('InvoiceNumber', {
      invoiceUpdate: true,
      invoiceID: globalData._id,
    });
  }

  function navigateToSignaturePad() {
    navigation.navigate('SignaturePad');
  }

  const AllRoute = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.scene, {backgroundColor: Colors.commonBg, padding: 8}]}>
        <TouchableOpacity
          onPress={navigateToInvoiceNumber}
          style={styles.invoiceTopView}>
          <View style={{justifyContent: 'space-between', width: '50%'}}>
            <Text style={styles.invoiceTitle}>{globalData.invoice_number}</Text>
            <Text
              onPress={navigateToBusinessDetails}
              style={styles.businessInfo}>
              {t('Business Info')}
            </Text>
          </View>
          <View style={{justifyContent: 'space-between', width: '50%'}}>
            <View style={styles.dueBox}>
              <Text style={styles.dueTxt}>{t('Due on Receipt')}</Text>
            </View>
            <Text style={styles.dueDate}>
              {moment(globalData.invoice_date).format(
                selector.globalDateFormat,
              )}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.clientView}>
          <Text style={styles.toTxt}>To : </Text>
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
                  <Text style={styles.dueBalText2}>
                    {'Discount'}{' '}
                    {item.discount_type === 'Percentage'
                      ? item.discount_rate + '%'
                      : ''}{' '}
                  </Text>
                </View>
                <View>
                  <Text style={styles.dueBalText3}>
                    {item.quantity + ' * $' + item.rate}
                  </Text>
                  <Text style={styles.dueBalText3}>{'$' + item.total}</Text>
                  <Text style={styles.dueBalText4}>
                    {'-$' + item.discount_amount}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          <TouchableOpacity
            onPress={() =>
              globalData.items.length > 0
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
            <Text style={styles.itemTotalTxt}>{globalData.invoice_total}</Text>
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
              {globalData.invoice_total}
            </Text>
          </View>
        </View>

        <View style={styles.photoContainer}>
          <Text style={styles.photoText}>{t('Add photo')}</Text>
          <TouchableOpacity onPress={navigateToAddPhotoScreen}>
            <Icon name="attach" size={18} style={styles.photoIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.notesContainer}>
          <TouchableOpacity
            onPress={navigateToPaymentInfo}
            style={styles.notesRow}>
            {globalData.paypal_email ||
            globalData.make_checks_payable ||
            globalData.payment_instructions ||
            globalData.additional_payment_instructions ? (
              <Text
                numberOfLines={1}
                onPress={navigateToPaymentInfo}
                style={styles.toTxt}>
                {'Payment:  '}
                {globalData.paypal_email && 'PayPal,'}{' '}
                {globalData.make_checks_payable && 'Check,'}{' '}
                {globalData.payment_instructions && 'Payment Instruction,'}{' '}
                {globalData.additional_payment_instructions && 'Other'}
              </Text>
            ) : (
              <Text style={styles.notesText}>{t('Payment Info')}</Text>
            )}
          </TouchableOpacity>
          <View style={styles.notesRow}>
            <Text onPress={navigateToSignaturePad} style={styles.notesText}>
              {t('Signature')}
            </Text>
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
            <Switch color={Colors.landingColor} value={true} />
          </View>
          <View style={styles.requestLinkRow}>
            <TextInput
              placeholder={t('Review Link')}
              style={styles.requestLinkText}
              placeholderTextColor={'#d1d1d1'}
            />
          </View>
        </View>

        <View style={styles.paidContainer}>
          <Text style={styles.paidText}>{t('Mark Paid')}</Text>
        </View>
      </ScrollView>
    );
  };

  const OutStandingRoute = () => {
    return (
      <View style={[styles.scene, {backgroundColor: Colors.commonBg}]}></View>
    );
  };

  const PaidRoute = () => {
    return (
      <View style={[styles.scene, {backgroundColor: Colors.commonBg}]}></View>
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
            anchor={{x: screenWidth - 10, y: -10}}>
            <Menu.Item onPress={() => {}} title={t('Delete')} />
            <Menu.Item onPress={() => {}} title={t('Open In ..')} />
            <Menu.Item onPress={() => {}} title={t('Share')} />
            <Menu.Item onPress={() => {}} title={t('Print')} />
            <Menu.Item onPress={() => {}} title={t('Get Link')} />
            <Menu.Item onPress={() => {}} title={t('Mark Paid')} />
            <Menu.Item onPress={() => {}} title={t('Duplicate')} />
          </Menu>
          <TabView
            navigationState={{index, routes}}
            renderScene={SceneMap({
              first: AllRoute,
              second: OutStandingRoute,
              third: PaidRoute,
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
  invoiceTitle: {fontSize: 18, fontWeight: '600', color: '#000'},
  businessInfo: {fontSize: 18, fontWeight: '400', color: '#d1d1d1'},
  dueBox: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
    borderColor: 'grey',
    marginBottom: 10,
    alignSelf: 'flex-end',
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
  toTxt: {fontSize: 18, fontWeight: '400', color: '#000'},
  clientTxt: {fontSize: 18, fontWeight: '400', color: '#d1d1d1', width: '100%'},
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
    fontSize: 18,
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
  itemTotalTxt: {fontSize: 18, fontWeight: '500', color: '#fff'},
  dueBalContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 2,
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
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  photoContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  photoText: {
    fontSize: 18,
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
    fontSize: 18,
    fontWeight: '500',
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
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  requestText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  requestLinkText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    height: 35,
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
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});

export default InvoiceCreationScreen;
