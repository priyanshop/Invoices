import React, {useLayoutEffect, useState} from 'react';
import {
  ScrollView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Switch, FAB, Portal, Provider, Menu} from 'react-native-paper';

import FloatingButton from '../../CustomComponent/FloatingButton';
import {getScreenDimensions} from '../../Helper/ScreenDimension';
import {Colors} from '../../Helper/Colors';
import CustomHeader from '../../CustomComponent/CustomHeader';
import EmptyViewComponent from '../../CustomComponent/EmptyViewComponent';
import {actionStyle, fabStyle} from '../../Helper/CommonStyle';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;
//   {
//     year: 2021,
//     data: [
//       {
//         client: 'Client A',
//         invoiceNumber: 'INV-001',
//         price: 100.0,
//         date: '2021-01-01',
//       },
//       {
//         client: 'Client B',
//         invoiceNumber: 'INV-002',
//         price: 200.0,
//         date: '2021-02-01',
//       },
//     ],
//   },
//   {
//     year: 2022,
//     data: [
//       {
//         client: 'Client C',
//         invoiceNumber: 'INV-003',
//         price: 150.0,
//         date: '2022-01-01',
//       },
//       {
//         client: 'Client D',
//         invoiceNumber: 'INV-004',
//         price: 250.0,
//         date: '2022-02-01',
//       },
//     ],
//   },
// ];

const data = [
  {key: 'first', title: 'Edit'},
  {key: 'second', title: 'Preview'},
  {key: 'third', title: 'History'},
];
function InvoiceCreationScreen({navigation}: any): JSX.Element {
  const actions = [
    {
      icon: () => (
        <MaterialCommunityIcons
          name="message-bulleted"
          size={22}
          color="#000"
        />
      ),
      label: 'Text',
      onPress: () => console.log('Pressed notifications'),
    },
    {
      icon: () => <Fontisto name="email" size={22} color="#000" />,
      label: 'Email',
      onPress: () => console.log('Pressed email'),
    },
  ];

  const [index, setIndex] = useState(0);
  const [searchStart, setSearchStart] = useState(false);
  const [routes] = useState(data);
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});
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

  const {open} = state;

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  function navigateToBusinessDetails() {
    navigation.navigate('BusinessDetails');
  }

  function navigateToAddClientScreen() {
    navigation.navigate('AddClientScreen');
  }

  function navigateToAddItemScreen() {
    navigation.navigate('AddItemScreen');
  }

  function navigateToAddPhotoScreen() {
    navigation.navigate('AddPhotoScreen');
  }

  function navigateToPaymentInfo() {
    navigation.navigate('PaymentInfo');
  }

  function navigateToAdditionalDetails() {
    navigation.navigate('AdditionalDetails');
  }

  const AllRoute = () => {
    return (
      <Provider>
        <Portal>
          <ScrollView
            style={[
              styles.scene,
              {backgroundColor: Colors.commonBg, padding: 8},
            ]}>
            <View style={styles.invoiceTopView}>
              <View style={{justifyContent: 'space-between'}}>
                <Text style={styles.invoiceTitle}>INV0001</Text>
                <Text
                  onPress={navigateToBusinessDetails}
                  style={styles.businessInfo}>
                  Business Info
                </Text>
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <View style={styles.dueBox}>
                  <Text style={styles.dueTxt}>Due on Receipt</Text>
                </View>
                <Text style={styles.dueDate}>06/07/2023</Text>
              </View>
            </View>

            <View style={styles.clientView}>
              <Text style={styles.toTxt}>To : </Text>
              <Text
                onPress={navigateToAddClientScreen}
                style={styles.clientTxt}>
                Client
              </Text>
            </View>

            <View style={styles.ItemView}>
              <TouchableOpacity
                onPress={navigateToAddItemScreen}
                style={styles.ItemColumn}>
                <View>
                  <Text style={styles.addItemTxt}>{'Add Item '}</Text>
                </View>
                <View>
                  <Text style={styles.itemPriceTxt}>{'0 * $0.00'}</Text>
                  <Text style={styles.itemPriceTxt}>{'$0.00'}</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.itemTotal}>
                <Text style={styles.itemTotalTxt}>Subtotal</Text>
                <Text style={styles.itemTotalTxt}>195</Text>
              </View>
            </View>

            <View style={styles.dueBalContainer}>
              {[0, 0, 0, 0, 0].map(() => (
                <View style={styles.dueBalContent}>
                  <View style={styles.dueBalRow}>
                    <Text style={styles.dueBalText}>Discount</Text>
                    <Text style={styles.dueBalText}>$0.00</Text>
                  </View>
                </View>
              ))}
              <View style={styles.dueBalFooter}>
                <Text style={styles.dueBalFooterText}>Balance Due</Text>
                <Text style={styles.dueBalFooterText}>195</Text>
              </View>
            </View>

            <View style={styles.photoContainer}>
              <Text style={styles.photoText}>Add photo</Text>
              <TouchableOpacity onPress={navigateToAddPhotoScreen}>
                <Icon name="attach" size={18} style={styles.photoIcon} />
              </TouchableOpacity>
            </View>

            <View style={styles.notesContainer}>
              <TouchableOpacity
                onPress={navigateToPaymentInfo}
                style={styles.notesRow}>
                <Text style={styles.notesText}>Payment Info</Text>
              </TouchableOpacity>
              <View style={styles.notesRow}>
                <Text style={styles.notesText}>Signature</Text>
              </View>
              <TouchableOpacity
                onPress={navigateToAdditionalDetails}
                style={styles.notesLastRow}>
                <Text style={styles.notesText}>Notes</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.requestContainer}>
              <View style={styles.requestSwitchRow}>
                <Text style={styles.requestText}>Request Review</Text>
                <Switch value={true} />
              </View>
              <View style={styles.requestLinkRow}>
                <TextInput
                  placeholder="Review Link"
                  style={styles.requestLinkText}
                />
              </View>
            </View>

            <View style={styles.paidContainer}>
              <Text style={styles.paidText}>Mark Paid</Text>
            </View>
          </ScrollView>

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
  };

  const OutStandingRoute = () => {
    const renderEmptyComponent = () => (
      <EmptyViewComponent
        message={'Invoices that are no yet paid show up here.'}
      />
    );

    const renderInvoiceItem = ({item}: any) => (
      <View style={styles.invoiceItem}>
        <View>
          <Text style={styles.clientText}>{`${item.client}`}</Text>
          <Text
            style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
        </View>
        <View>
          <Text style={styles.priceText}>{`$${item.price}`}</Text>
          <Text style={styles.dateText}>{`Due: ${item.date}`}</Text>
        </View>
      </View>
    );

    const renderSectionHeader = ({section: {year}}) => (
      <View style={styles.sectionHeaderContain}>
        <Text style={styles.sectionHeader}>{year}</Text>
        <Text style={styles.sectionHeader}>{'$635'}</Text>
      </View>
    );
    return (
      <View style={[styles.scene, {backgroundColor: Colors.commonBg}]}>
        <SectionList
          sections={[]}
          keyExtractor={(item: any, index: any) => item + index}
          renderItem={renderInvoiceItem}
          renderSectionHeader={renderSectionHeader}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={{flex: 1}}
        />
      </View>
    );
  };

  const PaidRoute = () => {
    const renderEmptyComponent = () => (
      <EmptyViewComponent
        message={'Invoices that you mark paid will show up here.'}
      />
    );

    const renderInvoiceItem = ({item}: any) => (
      <View style={styles.invoiceItem}>
        <View>
          <Text style={styles.clientText}>{`${item.client}`}</Text>
          <Text
            style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
        </View>
        <View>
          <Text style={styles.priceText}>{`$${item.price}`}</Text>
          <Text style={styles.dateText}>{`Due: ${item.date}`}</Text>
        </View>
      </View>
    );

    const renderSectionHeader = ({section: {year}}) => (
      <View style={styles.sectionHeaderContain}>
        <Text style={styles.sectionHeader}>{year}</Text>
        <Text style={styles.sectionHeader}>{'$635'}</Text>
      </View>
    );
    return (
      <View style={[styles.scene, {backgroundColor: Colors.commonBg}]}>
        <SectionList
          sections={[]}
          keyExtractor={(item: any, index: any) => item + index}
          renderItem={renderInvoiceItem}
          renderSectionHeader={renderSectionHeader}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={{flex: 1}}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.appColor} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={{x: screenWidth, y: 85}}>
        <Menu.Item onPress={() => {}} title="Delete" />
        <Menu.Item onPress={() => {}} title="Open In .." />
        <Menu.Item onPress={() => {}} title="Share" />
        <Menu.Item onPress={() => {}} title="Print" />
        <Menu.Item onPress={() => {}} title="Get Link" />
        <Menu.Item onPress={() => {}} title="Mark paid" />
        <Menu.Item onPress={() => {}} title="Duplicate" />
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
  addItemTxt: {fontSize: 18, fontWeight: '500', color: '#d1d1d1'},
  itemPriceTxt: {
    fontSize: 18,
    fontWeight: '400',
    color: '#d1d1d1',
    textAlign: 'right',
  },
  itemTotal: {
    backgroundColor: 'grey',
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
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  dueBalFooter: {
    backgroundColor: 'grey',
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
    color: '#d1d1d1',
  },
  paidContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paidText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
});

export default InvoiceCreationScreen;
