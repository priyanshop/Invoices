import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import FloatingButton from '../../../CustomComponent/FloatingButton';
import {Colors} from '../../../Helper/Colors';
import CustomHeader from '../../../CustomComponent/CustomHeader';
import EmptyViewComponent from '../../../CustomComponent/EmptyViewComponent';
import FetchAPI from '../../../Networking';
import {endpoint} from '../../../Networking/endpoint';
import {SafeAreaView} from 'react-native-safe-area-context';

function Clients({navigation, route}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.user);
  const isFocused = useIsFocused();
  const [searchStart, setSearchStart] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [searchClientList, setSearchClientList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (selector.token === 'Guest') {
      setSearchClientList(selector.clientList);
      setClientList(selector.clientList);
    } else {
      apiCall();
    }
  }, [selector.token, isFocused]);

  const apiCall = async () => {
    try {
      const data = await FetchAPI(
        'get',
        endpoint.getAllClient(selector.userData._id),
        null,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        setClientList(data.data);
        setSearchClientList(data.data);
      }
    } catch (error) {}
  };

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    const filtered = clientList.filter((item: any) =>
      item?.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchClientList(filtered);
  };

  const removeSearch = (item: any) => {
    setSearchStart(item);
    if (!item) {
      setSearchQuery('');
      setSearchClientList(clientList);
    }
  };

  function navigateToSetting() {
    navigation.goBack();
  }
  function navigateToAddClient() {
    navigation.navigate('AddClientScreen');
  }

  function navigateToClient(id: any, item: any, index: any) {
    updateInvoice(item);
  }

  const updateInvoice = async (temp: any) => {
    try {
      const payload: any = {
        c_name: temp.name,
        c_email: temp.email,
        c_mobile_number: temp.mobile_number,
        c_phone_number: temp.phone_number,
        c_fax: temp.fax,
        c_contact: temp.contact,
        c_address1: temp.address1,
        c_address2: temp.address2,
        c_address3: temp.address3,
      };
      if (selector.token === 'Guest') {
        // dispatch(setBusinessDetail(payload));
      } else {
        const data = await FetchAPI(
          'patch',
          endpoint.updateIVClient(route?.params?.invoiceID),
          payload,
          {
            Authorization: 'Bearer ' + selector.token,
          },
        );
        if (data.status === 'success') {
          navigateToSetting();
        }
      }
    } catch (error) {}
  };

  const renderItem = ({item, index}: any) => (
    <TouchableOpacity
      onPress={() => navigateToClient(item._id, item, index)}
      style={styles.invoiceItem}>
      <View>
        <Text style={styles.clientText}>{`${item.name}`}</Text>
        {item.invoiceNumber ? (
          <Text
            style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
        ) : null}
      </View>
      <View style={styles.priceView}>
        <Text style={styles.priceText}>{`$${
          item.price ? item.price : '0'
        }`}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <EmptyViewComponent message={t('emptyClient')} />
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      <StatusBar backgroundColor={Colors.appColor} />
      <CustomHeader
        searchStart={searchStart}
        navigateToSetting={navigateToSetting}
        setSearchStart={removeSearch}
        title={t('clients')}
        searchText={searchQuery}
        handleSearch={handleSearch}
        backIcon={true}
      />
      <View style={{flex: 1, backgroundColor: Colors.commonBg}}>
        <View style={styles.titleHeader}>
          <Text style={styles.tileHeaderTxt}>{t('name')}</Text>
          <Text style={styles.tileHeaderTxt}>{t('totalBill')}</Text>
        </View>
        <FlatList
          data={searchClientList}
          renderItem={renderItem}
          keyExtractor={(item: any, index: any) => item + index}
          ListEmptyComponent={renderEmptyComponent}
          contentContainerStyle={{flex: 1}}
        />
        <FloatingButton onPress={navigateToAddClient} />
      </View>
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
    backgroundColor: '#fff',
    height: 40,
    alignItems: 'center',
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
  priceView: {justifyContent: 'center'},
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: '#A9A9A9',
    paddingVertical: 10,
  },
  tileHeaderTxt: {color: '#fff', fontSize: 16, fontWeight: '500'},
});

export default Clients;
