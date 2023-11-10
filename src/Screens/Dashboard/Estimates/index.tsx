//@ts-nocheck
import React, {useEffect, useState} from 'react';
import {
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
import {getScreenDimensions} from '../../../Helper/ScreenDimension';
import {Colors} from '../../../Helper/Colors';
import CustomHeader from '../../../CustomComponent/CustomHeader';
import {useTranslation} from 'react-i18next';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import FetchAPI from '../../../Networking';
import {endpoint} from '../../../Networking/endpoint';
import {offlineLimit, setNewEstimateInList} from '../../../Constant';
import EmptyViewComponent from '../../../CustomComponent/EmptyViewComponent';
import Loader from '../../../CustomComponent/Loader';
import {addNewEstimate} from '../../../redux/reducers/user/UserReducer';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;

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

function EstimatesScreen({navigation}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const data = [
    {key: 'first', title: t('All')},
    {key: 'second', title: t('Open')},
    {key: 'third', title: t('Closed')},
  ];
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const selector = useSelector(state => state.user);
  const [index, setIndex] = useState(0);
  const [searchStart, setSearchStart] = useState(false);
  const [routes] = useState(data);
  const [allData, setAllData] = useState([]);
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
      .filter(yearData => yearData.data.length > 0);

  const closeFilteredInvoices =
    allData.length > 0 &&
    allData
      .map(yearData => ({
        year: yearData?.year,
        totalInvoiceAmount: yearData?.totalPaidAmount,
        data: yearData?.data?.filter(
          item =>
            item?.status === 'close' &&
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
      .filter(yearData => yearData.data.length > 0);

  const openFilteredInvoices =
    allData.length > 0 &&
    allData
      .map(yearData => ({
        year: yearData?.year,
        totalInvoiceAmount: yearData?.totalUnpaidAmount,
        data: yearData?.data?.filter(
          item =>
            item?.status === 'open' &&
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
      .filter(yearData => yearData.data.length > 0);

  useEffect(() => {
    setTrue();
    if (selector.token === 'Guest') {
      if (selector.estimateList?.length >= 0) {
        setFalse();
        const savedData: any = convertData(selector.estimateList);
        setAllData(savedData);
        setFalse();
      }
    } else {
      apiCall();
    }
  }, [isFocused]);

  const apiCall = async () => {
    try {
      const data = await FetchAPI('get', endpoint.getEstimateList, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        if (data.data) {
          const savedData: any = convertData(data.data);
          setFalse();
          setAllData(savedData);
        }
      }
    } catch (error) {
      setFalse;
    }
  };

  const convertData = (inputData: any) => {
    const transformedData: any = [];
    inputData.forEach((item: any) => {
      const invoiceDate = new Date(item.createdAt);
      const year = invoiceDate.getFullYear();
      const client = item.c_name || 'No Client';
      const invoiceNumber = item.estimate_number;
      const price = parseFloat(item.estimate_total || 0);

      const date = invoiceDate.toISOString().split('T')[0];

      const existingYearData = transformedData.find(
        (data: any) => data.year === year,
      );

      if (existingYearData) {
        existingYearData.data.push({
          client,
          invoiceNumber,
          price,
          date,
          ...item,
        });

        existingYearData.totalInvoiceAmount += parseFloat(price);
        if (item.status === 'open') {
          existingYearData.totalUnpaidAmount += parseFloat(price);
        }
        if (item.status === 'close') {
          existingYearData.totalPaidAmount += parseFloat(price);
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
          totalPaidAmount: item.status !== 'open' ? price : 0,
          totalUnpaidAmount: item.status !== 'open' ? 0 : price,
        });
      }
    });
    return transformedData;
  };

  function navigateToEstimate(item: any) {
    navigation.navigate('EstimationCreation', {status: 'update', data: item});
  }

  const AllRoute = () => {
    const renderInvoiceItem = ({item}: any) => (
      <TouchableOpacity
        onPress={() => navigateToEstimate(item)}
        style={styles.invoiceItem}>
        <View>
          <Text style={styles.clientText}>{`${item.client}`}</Text>
          <Text
            style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
        </View>
        <View>
          <Text style={styles.priceText}>{`$${item.price}`}</Text>
          <Text style={styles.dateText}>{`Due: ${item.date}`}</Text>
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
      <EmptyViewComponent message={t('emptyEstimateAll')} />
    );

    return (
      <View style={styles.scene}>
        <Loader visible={isLoading} size="large" color={Colors.landingColor} />
        {filteredInvoices.length > 0 ? (
          <SectionList
            sections={filteredInvoices}
            keyExtractor={(item: any, index: any) => item + index}
            renderItem={renderInvoiceItem}
            renderSectionHeader={renderSectionHeader}
            ListEmptyComponent={renderEmptyComponent}
          />
        ) : (
          renderEmptyComponent()
        )}
      </View>
    );
  };

  const OpenRoute = () => {
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

    const renderSectionHeader = ({section: {year, totalInvoiceAmount}}) => (
      <View style={styles.sectionHeaderContain}>
        <Text style={styles.sectionHeader}>{year}</Text>
        <Text style={styles.sectionHeader}>{'$' + totalInvoiceAmount}</Text>
      </View>
    );
    return (
      <View style={styles.scene}>
        {openFilteredInvoices.length >= 0 && (
          <SectionList
            sections={openFilteredInvoices}
            keyExtractor={(item: any, index: any) => item + index}
            renderItem={renderInvoiceItem}
            renderSectionHeader={renderSectionHeader}
          />
        )}
      </View>
    );
  };

  const ClosedRoute = () => {
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

    const renderSectionHeader = ({section: {year, totalInvoiceAmount}}) => (
      <View style={styles.sectionHeaderContain}>
        <Text style={styles.sectionHeader}>{year}</Text>
        <Text style={styles.sectionHeader}>{'$' + totalInvoiceAmount}</Text>
      </View>
    );
    return (
      <View style={styles.scene}>
        {closeFilteredInvoices.length >= 0 ? (
          <SectionList
            // sections={invoices}
            sections={closeFilteredInvoices}
            keyExtractor={(item: any, index: any) => item + index}
            renderItem={renderInvoiceItem}
            renderSectionHeader={renderSectionHeader}
          />
        ) : null}
      </View>
    );
  };

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  function navigateToAddEstimate() {
    if (selector.token === 'Guest') {
      if (selector.estimateList?.length <= offlineLimit) {
        // navigation.navigate('EstimationCreation', {status: 'create'});
        const payload = setNewEstimateInList(selector);
        dispatch(addNewEstimate(payload));
        navigateToEstimate(payload);
      } else {
        navigation.navigate('Subscribe');
      }
    } else {
      createEstimateCall();
    }
  }

  const createEstimateCall = async () => {
    try {
      const data = await FetchAPI('post', endpoint.createEstimate, null, {
        Authorization: 'Bearer ' + selector.token,
      });
      if (data.status === 'success') {
        const element = data.data;
        navigateToEstimate(element);
      }
    } catch (error) {}
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
        title={t('Estimates')}
        searchText={searchText}
        handleSearch={(x: any) => setSearchText(x)}
      />
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: AllRoute,
          second: OpenRoute,
          third: ClosedRoute,
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
      <FloatingButton onPress={navigateToAddEstimate} />
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

export default EstimatesScreen;
