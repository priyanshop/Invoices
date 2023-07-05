import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import FloatingButton from '../../../CustomComponent/FloatingButton';
const invoices = [
  {
    year: 2021,
    data: [
      {
        client: 'Client A',
        invoiceNumber: 'INV-001',
        price: 100.0,
        date: '2021-01-01',
      },
      {
        client: 'Client B',
        invoiceNumber: 'INV-002',
        price: 200.0,
        date: '2021-02-01',
      },
    ],
  },
  {
    year: 2022,
    data: [
      {
        client: 'Client C',
        invoiceNumber: 'INV-003',
        price: 150.0,
        date: '2022-01-01',
      },
      {
        client: 'Client D',
        invoiceNumber: 'INV-004',
        price: 250.0,
        date: '2022-02-01',
      },
    ],
  },
];

const AllRoute = () => {
  const renderInvoiceItem = ({item}: any) => (
    <View style={styles.invoiceItem}>
      <View>
        <Text style={styles.clientText}>{`${item.client}`}</Text>
        <Text style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
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
      />
      <FloatingButton />
    </View>
  );
};

const SecondRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#fff'}]} />
);

const ThirdRoute = () => (
  <View style={[styles.scene, {backgroundColor: '#fff'}]} />
);

const data = [
  {key: 'first', title: 'All'},
  {key: 'second', title: 'OutStanding'},
  {key: 'third', title: 'Paid'},
];
function InvoicesScreen(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [routes] = useState(data);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3B51C0'} />
      <View style={styles.headerContainer}>
        <View>
          {/* <Ionicons name="flower-outline" size={20} color="#fff" /> */}
        </View>
        <View>
          <Text style={styles.headerText}>Invoices</Text>
        </View>
        <View>{/* <Ionicons name="search" size={20} color="#fff" /> */}</View>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: AllRoute,
          second: SecondRoute,
          third: ThirdRoute,
        })}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        style={styles.container}
        renderTabBar={props => {
          return (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: '#fff', height: 2}}
              style={{backgroundColor: '#3B51C0'}}
            />
          );
        }}
      />
    </SafeAreaView>
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
    // justifyContent: 'center',
    // // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#FF5733',
    // padding: 8,
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
    color: '#FF5733',
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
    backgroundColor: '#3B51C0',
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 15,
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
});

export default InvoicesScreen;
