//@ts-nocheck
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
import {ScrollView} from 'react-native-gesture-handler';
import {offlineLimit, setNewInvoiceInList} from '../../../Constant';
import Loader from '../../../CustomComponent/Loader';
import {addNewInvoice} from '../../../redux/reducers/user/UserReducer';

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
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const setTrue = () => setIsLoading(true);
  const setFalse = () => setIsLoading(false);

  const filteredInvoices =
    allData.length > 0 &&
    allData
      .map(yearData => ({
        year: yearData?.year,
        totalInvoiceAmount: yearData?.totalInvoiceAmount,
        data: yearData?.data?.filter(
          item =>
            item?.invoiceNumber
              ?.toLowerCase()
              ?.includes(searchText?.toLowerCase()) ||
            item?.client?.toLowerCase()?.includes(searchText?.toLowerCase()) ||
            item?.price?.toString()?.includes(searchText) ||
            item?.date?.includes(searchText),
        ),
      }))
      .filter(yearData => yearData?.data?.length > 0);

  const paidFilteredInvoices =
    allData.length > 0 &&
    allData
      .map(yearData => ({
        year: yearData?.year,
        totalInvoiceAmount: yearData?.totalPaidAmount,
        data: yearData?.data?.filter(
          item =>
            item.is_paid &&
            (item?.invoiceNumber
              ?.toLowerCase()
              ?.includes(searchText?.toLowerCase()) ||
              item?.client
                ?.toLowerCase()
                ?.includes(searchText?.toLowerCase()) ||
              item?.price?.toString()?.includes(searchText) ||
              item?.date?.includes(searchText)),
        ),
      }))
      .filter(yearData => yearData?.data?.length > 0);

  const outStandFilteredInvoices =
    allData.length > 0 &&
    allData
      .map(yearData => ({
        year: yearData?.year,
        totalInvoiceAmount: yearData?.totalUnpaidAmount,
        data: yearData?.data?.filter(
          item =>
            !item.is_paid &&
            (item?.invoiceNumber
              ?.toLowerCase()
              ?.includes(searchText?.toLowerCase()) ||
              item?.client
                ?.toLowerCase()
                ?.includes(searchText?.toLowerCase()) ||
              item?.price?.toString()?.includes(searchText) ||
              item?.date?.includes(searchText)),
        ),
      }))
      .filter(yearData => yearData?.data?.length > 0);

  useEffect(() => {
    setTrue();
    if (selector.token === 'Guest') {
      if (selector.invoiceList?.length >= 0) {
        const savedData: any = convertData(selector.invoiceList);
        setAllData(savedData);
        setFalse();
      }
    } else {
      apiCall();
    }
  }, [isFocused, selector.invoiceList]);

  const apiCall = async () => {
    try {
      const data = await FetchAPI('get', endpoint.getInvoiceList, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        if (data.data) {
          const savedData: any = convertData(data.data);
          setAllData(savedData);
          setFalse();
        }
      }
    } catch (error) {
      setFalse;
    }
  };

  const convertData = inputData => {
    const transformedData: any = [];
    inputData.forEach(item => {
      const invoiceDate = new Date(item.invoice_date || new Date());
      const year = invoiceDate.getFullYear();
      const client = item.c_name || 'No Client';
      const invoiceNumber = item.invoice_number;
      const price = parseFloat(item.invoice_total || 0);
      const date = invoiceDate.toISOString().split('T')[0];
      const existingYearData = transformedData.find(data => data.year === year);

      if (existingYearData) {
        existingYearData.data.push({
          client,
          invoiceNumber,
          price,
          date,
          ...item,
        });
        existingYearData.totalInvoiceAmount += parseFloat(price);
        if (item.is_paid) {
          existingYearData.totalPaidAmount += parseFloat(price);
        } else {
          existingYearData.totalUnpaidAmount += parseFloat(price);
        }
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
          totalInvoiceAmount: price,
          totalPaidAmount: item.is_paid ? price : 0,
          totalUnpaidAmount: item.is_paid ? 0 : price,
        });
      }
    });
    return transformedData;
  };

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  const navigateToAddInvoice = () => {
    if (selector.token === 'Guest') {
      if (selector.invoiceList.length <= offlineLimit) {
        const payload = setNewInvoiceInList(selector);
        dispatch(addNewInvoice(payload));
        navigation.navigate('InvoiceCreation', {
          status: 'update',
          data: payload,
        });
      } else {
        navigation.navigate('Subscribe');
      }
    } else {
      createInvoiceCall();
    }
  };

  const createInvoiceCall = async () => {
    try {
      const data = await FetchAPI('post', endpoint.createInvoice, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data;
        navigation.navigate('InvoiceCreation', {
          status: 'update',
          data: element,
        });
      }
    } catch (error) {}
  };

  function navigateToInvoice(item: any) {
    navigation.navigate('InvoiceCreation', {status: 'update', data: item});
  }

  const AllRoute = () => {
    const renderInvoiceItem = ({item, index}: any) => (
      <TouchableOpacity
        key={index}
        onPress={() => navigateToInvoice(item)}
        style={styles.invoiceItem}>
        <View>
          <Text style={styles.clientText}>{`${item.client}`}</Text>
          <Text
            style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
        </View>
        <View>
          <Text style={styles.priceText}>{`$${item.price}`}</Text>
          {item.is_paid ? (
            <Text style={styles.paidText}>{`${t('Paid')}: ${item.date}`}</Text>
          ) : (
            <Text style={styles.dateText}>{`${t('Due')}: ${item.date}`}</Text>
          )}
        </View>
      </TouchableOpacity>
    );

    const renderSectionHeader = ({section: {year, totalInvoiceAmount}}) => (
      <View style={styles.sectionHeaderContain}>
        <Text style={styles.sectionHeader}>{year}</Text>
        <Text style={styles.sectionHeader}>{'$' + totalInvoiceAmount}</Text>
      </View>
    );

    const renderEmptyComponent = () => (
      <EmptyViewComponent message={t('emptyInvoiceAll')} />
    );
    return (
      <View style={[styles.scene]}>
        <Loader visible={isLoading} size="large" color={Colors.landingColor} />
        {filteredInvoices.length > 0 ? (
          <SectionList
            sections={filteredInvoices}
            keyExtractor={(item: any, index: any) => item + index}
            renderItem={renderInvoiceItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={renderEmptyComponent}
            stickySectionHeadersEnabled={false}
          />
        ) : (
          renderEmptyComponent()
        )}
      </View>
    );
  };

  const OutStandingRoute = () => {
    const renderEmptyComponent = () => (
      <EmptyViewComponent message={t('emptyInvoiceOutStanding')} />
    );

    const renderInvoiceItem = ({item}: any) => (
      <TouchableOpacity
        onPress={() => navigateToInvoice(item)}
        style={styles.invoiceItem}>
        <View>
          <Text style={styles.clientText}>{`${item.client}`}</Text>
          <Text
            style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
        </View>
        <View>
          <Text style={styles.priceText}>{`$${item.price}`}</Text>
          {item.is_paid ? (
            <Text style={styles.paidText}>{`${t('Paid')}: ${item.date}`}</Text>
          ) : (
            <Text style={styles.dateText}>{`${t('Due')}: ${item.date}`}</Text>
          )}
        </View>
      </TouchableOpacity>
    );

    const renderSectionHeader = ({section: {year, totalInvoiceAmount}}) => (
      <View style={styles.sectionHeaderContain}>
        <Text style={styles.sectionHeader}>{year}</Text>
        <Text style={styles.sectionHeader}>{'$' + totalInvoiceAmount}</Text>
      </View>
    );
    return (
      <ScrollView nestedScrollEnabled style={[styles.scene]}>
        <Loader visible={isLoading} size="large" color={Colors.landingColor} />
        {outStandFilteredInvoices.length > 0 ? (
          <SectionList
            sections={outStandFilteredInvoices}
            keyExtractor={(item: any, index: any) => item + index}
            renderItem={renderInvoiceItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={renderEmptyComponent}
          />
        ) : (
          renderEmptyComponent()
        )}
      </ScrollView>
    );
  };

  const PaidRoute = () => {
    const renderEmptyComponent = () => (
      <EmptyViewComponent message={t('emptyInvoicePaid')} />
    );

    const renderInvoiceItem = ({item}: any) => (
      <TouchableOpacity
        onPress={() => navigateToInvoice(item)}
        style={styles.invoiceItem}>
        <View>
          <Text style={styles.clientText}>{`${item.client}`}</Text>
          <Text
            style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
        </View>
        <View>
          <Text style={styles.priceText}>{`$${item.price}`}</Text>
          {item.is_paid ? (
            <Text style={styles.paidText}>{`${t('Paid')}: ${item.date}`}</Text>
          ) : (
            <Text style={styles.dateText}>{`${t('Due')}: ${item.date}`}</Text>
          )}
        </View>
      </TouchableOpacity>
    );

    const renderSectionHeader = ({section: {year, totalInvoiceAmount}}) => (
      <View style={styles.sectionHeaderContain}>
        <Text style={styles.sectionHeader}>{year}</Text>
        <Text style={styles.sectionHeader}>{totalInvoiceAmount}</Text>
      </View>
    );
    return (
      <View style={[styles.scene]}>
        <Loader visible={isLoading} size="large" color={Colors.landingColor} />
        {paidFilteredInvoices.length > 0 ? (
          <SectionList
            sections={paidFilteredInvoices}
            keyExtractor={(item: any, index: any) => item + index}
            renderItem={renderInvoiceItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={{flex: 1}}
          />
        ) : (
          renderEmptyComponent()
        )}
      </View>
    );
  };
  useEffect(() => {
    if (!searchStart) {
      setSearchText('');
    }
  }, [searchStart]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.appColor} />
      <CustomHeader
        searchStart={searchStart}
        navigateToSetting={navigateToSetting}
        setSearchStart={setSearchStart}
        handleSearch={(x: any) => setSearchText(x)}
        title={t('Invoices')}
        searchText={searchText}
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
        sceneContainerStyle={styles.container2}
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
    height: '100%',
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
  paidText: {
    color: Colors.appColor,
    fontSize: 14,
    fontWeight: '500',
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
