import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import FloatingButton from '../../../CustomComponent/FloatingButton';
import {getScreenDimensions} from '../../../Helper/ScreenDimension';
import {Colors} from '../../../Helper/Colors';
import CustomHeader from '../../../CustomComponent/CustomHeader';
import EmptyViewComponent from '../../../CustomComponent/EmptyViewComponent';
import {useTranslation} from 'react-i18next';
import FetchAPI from '../../../Networking';
import {endpoint} from '../../../Networking/endpoint';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;
// const invoices = [];
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

function InvoicesScreen({navigation}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const selector = useSelector(state => state.user);
  const data = [
    {key: 'first', title: t('All')},
    {key: 'second', title: t('OutStanding')},
    {key: 'third', title: t('Paid')},
  ];
  const [index, setIndex] = useState(0);
  const [searchStart, setSearchStart] = useState(false);
  const [allData, setAllData] = useState([]);
  const [routes] = useState(data);

  useEffect(() => {
    apiCall();
  }, [isFocused]);

  const apiCall = async () => {
    try {
      const data = await FetchAPI('get', endpoint.getInvoiceList, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        if (data.data.length > 0) {
          const savedData: any = convertData(data.data);
          setAllData(savedData);
        }
      }
    } catch (error) {}
  };

  const convertData = (inputData: any) => {
    const transformedData :any = [];
    inputData.forEach((item:any) => {
      const invoiceDate = new Date(item.invoice_date);
      const year = invoiceDate.getFullYear();
      const client = item.b_name;
      const invoiceNumber = item.invoice_number;
      const price = 0.0; 
      const date = invoiceDate.toISOString().split('T')[0];

      const existingYearData = transformedData.find((data:any) => data.year === year);

      if (existingYearData) {
        existingYearData.data.push({
          client,
          invoiceNumber,
          price,
          date,
          ...item,
        });
      } else {
        transformedData.push({
          year,
          data: [
            {
              client,
              invoiceNumber,
              price,
              date,
              ...item,
            },
          ],
        });
      }
    });
    return transformedData;
  };

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  function navigateToAddInvoice() {
    navigation.navigate('InvoiceCreation', {status: 'create'});
  }

  const AllRoute = () => {
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

    const renderEmptyComponent = () => (
      <EmptyViewComponent message={t('emptyInvoiceAll')} />
    );
    return (
      <View style={[styles.scene]}>
        <SectionList
          sections={allData}
          keyExtractor={(item: any, index: any) => item + index}
          renderItem={renderInvoiceItem}
          renderSectionHeader={renderSectionHeader}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={{flex: 1}}
        />
      </View>
    );
  };

  const OutStandingRoute = () => {
    const renderEmptyComponent = () => (
      <EmptyViewComponent message={t('emptyInvoiceOutStanding')} />
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
      <View style={[styles.scene]}>
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
      <EmptyViewComponent message={t('emptyInvoicePaid')} />
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
      <View style={[styles.scene]}>
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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.appColor} />
      <CustomHeader
        searchStart={searchStart}
        navigateToSetting={navigateToSetting}
        setSearchStart={setSearchStart}
        title={t('Invoices')}
      />
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
        renderTabBar={props => {
          return (
            <TabBar
              {...props}
              indicatorStyle={{backgroundColor: '#fff', height: 2}}
              style={{backgroundColor: Colors.appColor}}
              labelStyle={{fontSize: 14, fontWeight: '500'}}
            />
          );
        }}
      />
      <FloatingButton onPress={navigateToAddInvoice} />
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
    backgroundColor: Colors.commonBg,
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
    fontWeight: '500',
    color: 'grey',
  },
  invoiceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  clientText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  invoiceNumberText: {
    color: '#36454F',
    fontSize: 14,
    fontWeight: '500',
  },
  priceText: {
    textAlign: 'right',
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
  },
  dateText: {
    color: '#A9A9A9',
    fontSize: 14,
    fontWeight: '400',
  },
  sectionHeaderContain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'grey',
    borderBottomWidth: 0.3,
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
});

export default InvoicesScreen;
