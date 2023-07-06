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
import {Switch, FAB, Portal, Provider} from 'react-native-paper';

import FloatingButton from '../../CustomComponent/FloatingButton';
import {getScreenDimensions} from '../../Helper/ScreenDimension';
import {Colors} from '../../Helper/Colors';
import CustomHeader from '../../CustomComponent/CustomHeader';
import EmptyViewComponent from '../../CustomComponent/EmptyViewComponent';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;
const invoices = [];
// const invoices = [
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
  const [index, setIndex] = useState(0);
  const [searchStart, setSearchStart] = useState(false);
  const [routes] = useState(data);
  const [state, setState] = React.useState({open: false});

  const onStateChange = ({open}) => setState({open});

  const {open} = state;

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={() => {}}>
          <Entypo name="dots-three-vertical" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const AllRoute = () => {
 
    return (
      <Provider>
        <Portal>
          <ScrollView
            style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 12,
                marginVertical: 5,
              }}>
              <View style={{justifyContent: 'space-between'}}>
                <Text style={{fontSize: 18, fontWeight: '600', color: '#000'}}>
                  INV0001
                </Text>
                <Text
                  style={{fontSize: 18, fontWeight: '400', color: '#d1d1d1'}}>
                  Business Info
                </Text>
              </View>
              <View style={{justifyContent: 'space-between'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    padding: 4,
                    borderColor: 'grey',
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{fontSize: 14, fontWeight: '400', color: 'grey'}}>
                    Due on Receipt
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#000',
                    textAlign: 'right',
                  }}>
                  06/07/2023
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 12,
                marginVertical: 5,
              }}>
              <Text style={{fontSize: 18, fontWeight: '400', color: '#000'}}>
                To :{' '}
              </Text>
              <Text style={{fontSize: 18, fontWeight: '400', color: '#d1d1d1'}}>
                Client
              </Text>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                marginVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 12,
                }}>
                <View>
                  <Text
                    style={{fontSize: 18, fontWeight: '500', color: '#d1d1d1'}}>
                    {'Add Item '}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#d1d1d1',
                      textAlign: 'right',
                    }}>
                    {'0 * $0.00'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#d1d1d1',
                      textAlign: 'right',
                    }}>
                    {'$0.00'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'grey',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  padding: 8,
                }}>
                <Text style={{fontSize: 18, fontWeight: '500', color: '#fff'}}>
                  Subtotal
                </Text>
                <Text style={{fontSize: 18, fontWeight: '500', color: '#fff'}}>
                  195
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                marginVertical: 5,
              }}>
              <View
                style={{
                  padding: 12,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    {'Discount'}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '400',
                      color: '#000',
                    }}>
                    {'$0.00'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  backgroundColor: 'grey',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomLeftRadius: 8,
                  borderBottomRightRadius: 8,
                  padding: 8,
                }}>
                <Text style={{fontSize: 18, fontWeight: '500', color: '#fff'}}>
                  Balance Due
                </Text>
                <Text style={{fontSize: 18, fontWeight: '500', color: '#fff'}}>
                  195
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 12,
                marginVertical: 5,
                justifyContent: 'space-between',
              }}>
              <Text style={{fontSize: 18, fontWeight: '500', color: '#d1d1d1'}}>
                Add photo
              </Text>
              <TouchableOpacity>
                <Icon name="attach" size={18} color="#d2d2d2" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,

                marginVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.3,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '500', color: '#d1d1d1'}}>
                  Payment Info
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.3,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '500', color: '#d1d1d1'}}>
                  Signature
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  height: 70,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '500', color: '#d1d1d1'}}>
                  Notes
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                marginVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 0.3,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 18, fontWeight: '400', color: '#000'}}>
                  Request Review
                </Text>
                <Switch value={true} />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                }}>
                <Text
                  style={{fontSize: 18, fontWeight: '500', color: '#d1d1d1'}}>
                  Review Link
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                borderRadius: 8,
                padding: 12,
                marginVertical: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 18, fontWeight: '400', color: '#000'}}>
                Mark Paid
              </Text>
            </View>
          </ScrollView>
          <FAB.Group
            open={open}
            icon={() => <Entypo name="paper-plane" size={22} color="#fff" />}
            actions={[
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
                label: 'Email',
                onPress: () => console.log('Pressed email'),
                style: {backgroundColor: '#fff', borderRadius: 50},
                color: '#000',
                labelTextColor: '#000',
                containerStyle: {
                  backgroundColor: '#fff',
                  borderRadius: 5,
                },
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
            fabStyle={{
              backgroundColor: Colors.appColor,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#171717',
              shadowOffset: {width: -2, height: 4},
              shadowOpacity: 0.2,
              shadowRadius: 3,
            }}
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
      <View style={[styles.scene, {backgroundColor: '#fff'}]}>
        <SectionList
          sections={invoices}
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
      <View style={[styles.scene, {backgroundColor: '#fff'}]}>
        <SectionList
          sections={invoices}
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
      <StatusBar backgroundColor={'#3B51C0'} />
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
});

export default InvoiceCreationScreen;
