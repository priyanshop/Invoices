import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {ToggleButton} from 'react-native-paper';
import {Colors} from '../../../Helper/Colors';
import ModalActivityIndicator from '../../../CustomComponent/Loader';
import {useTranslation} from 'react-i18next';

function ReportScreen({navigation}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const [value, setValue] = useState('Paid');
  const [Year, setYear] = useState('2022');
  const [loading, setLoading] = useState(false);

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  const PaidTitle = () => {
    return (
      <View style={styles.tableTileView}>
        <Text style={{...styles.tableTitle, textAlign: 'left'}}>{''}</Text>
        <Text style={{...styles.tableTitle, textAlign: 'center'}}>
          {t('clients')}
        </Text>
        <Text style={{...styles.tableTitle, textAlign: 'center'}}>
          {t('Invoices')}
        </Text>
        <Text style={{...styles.tableTitle, textAlign: 'right'}}>
          {t('Paid')}
        </Text>
      </View>
    );
  };

  const ClientTitle = () => {
    return (
      <View style={styles.tableTileView}>
        <Text style={{...styles.tableTitle, textAlign: 'left'}}>{''}</Text>
        <Text style={{...styles.tableTitle, textAlign: 'center'}}>
          {t('Invoices')}
        </Text>
        <Text style={{...styles.tableTitle, textAlign: 'right'}}>{'Paid'}</Text>
      </View>
    );
  };

  const ItemsTitle = () => {
    return (
      <View style={styles.tableTileView}>
        <Text style={{...styles.tableTitle, textAlign: 'left'}}>{''}</Text>
        <Text style={{...styles.tableTitle, textAlign: 'center'}}>
          {t('Invoices')}
        </Text>
        <Text style={{...styles.tableTitle, textAlign: 'center'}}>
          {t('Quantity')}
        </Text>
        <Text style={{...styles.tableTitle, textAlign: 'right'}}>{'Paid'}</Text>
      </View>
    );
  };

  const ClientTotal = () => {
    return (
      <View style={styles.totalView}>
        <Text style={{...styles.tableTitle, textAlign: 'left'}}>
          {'Tax Year 2023'}
        </Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'1'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'right'}}>{'$0.00'}</Text>
      </View>
    );
  };

  const PaidTotal = () => {
    return (
      <View style={styles.totalView}>
        <Text style={{...styles.tableTitle, textAlign: 'left'}}>
          {'Tax Year 2023'}
        </Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'1'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'0'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'right'}}>{'$0.00'}</Text>
      </View>
    );
  };

  const ItemTotal = () => {
    return (
      <View style={styles.totalView}>
        <Text style={{...styles.tableTitle, textAlign: 'left'}}>
          {'Tax Year 2023'}
        </Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'1'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'0'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'right'}}>{'$0.00'}</Text>
      </View>
    );
  };

  const Clients = () => {
    return (
      <View style={styles.itemView}>
        <Text style={{...styles.itemTxt, textAlign: 'left'}}>{'Dec'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'1'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'right'}}>{'$0.00'}</Text>
      </View>
    );
  };

  const Paid = () => {
    return (
      <View style={styles.itemView}>
        <Text style={{...styles.itemTxt, textAlign: 'left'}}>{'Dec'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'1'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'0'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'right'}}>{'$0.00'}</Text>
      </View>
    );
  };

  const Items = () => {
    return (
      <View style={styles.itemView}>
        <Text style={{...styles.itemTxt, textAlign: 'left'}}>{'Dec'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'1'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'center'}}>{'0'}</Text>
        <Text style={{...styles.itemTxt, textAlign: 'right'}}>{'$0.00'}</Text>
      </View>
    );
  };

  const HeaderView = () => (
    <ToggleButton.Row
      style={{marginTop: 10}}
      onValueChange={value => setValue(value)}
      value={value}>
      <ToggleButton
        style={{
          ...styles.headerTab,
          backgroundColor: value === 'Paid' ? Colors.appColor : '#fff',
        }}
        icon={() => (
          <View>
            <Text
              style={{
                ...styles.headerTitle,
                color: value === 'Paid' ? '#fff' : Colors.appColor,
              }}>
              {t('Paid')}
            </Text>
          </View>
        )}
        value="Paid"
      />
      <ToggleButton
        style={{
          ...styles.headerTab,
          backgroundColor: value === 'Clients' ? Colors.appColor : '#fff',
        }}
        icon={() => (
          <View>
            <Text
              style={{
                ...styles.headerTitle,
                color: value === 'Clients' ? '#fff' : Colors.appColor,
              }}>
              {t('clients')}
            </Text>
          </View>
        )}
        value="Clients"
      />
      <ToggleButton
        style={{
          ...styles.headerTab,
          backgroundColor: value === 'Items' ? Colors.appColor : '#fff',
        }}
        icon={() => (
          <View>
            <Text
              style={{
                ...styles.headerTitle,
                color: value === 'Items' ? '#fff' : Colors.appColor,
              }}>
              {t('items')}
            </Text>
          </View>
        )}
        value="Items"
      />
    </ToggleButton.Row>
  );

  const YearView = () => (
    <ToggleButton.Row
      style={{marginTop: 10}}
      onValueChange={value => setYear(value)}
      value={Year}>
      <ToggleButton
        style={{
          ...styles.headerTab,
          backgroundColor: Year === '2023' ? Colors.appColor : '#fff',
        }}
        icon={() => (
          <View>
            <Text
              style={{
                ...styles.headerTitle,
                color: Year === '2023' ? '#fff' : Colors.appColor,
              }}>
              2023
            </Text>
          </View>
        )}
        value="2023"
      />
      <ToggleButton
        style={{
          ...styles.headerTab,
          backgroundColor: Year === '2022' ? Colors.appColor : '#fff',
        }}
        icon={() => (
          <View>
            <Text
              style={{
                ...styles.headerTitle,
                color: Year === '2022' ? '#fff' : Colors.appColor,
              }}>
              2022
            </Text>
          </View>
        )}
        value="2022"
      />
    </ToggleButton.Row>
  );

  const GlobalPaid = () => {
    return (
      value === 'Paid' && (
        <>
          {PaidTitle()}
          {PaidTotal()}
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => Paid())}
        </>
      )
    );
  };

  const GlobalClients = () => {
    return (
      value === 'Clients' && (
        <>
          {ClientTitle()}
          {ClientTotal()}
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => Clients())}
        </>
      )
    );
  };

  const GlobalItems = () => {
    return (
      value === 'Items' && (
        <>
          {ItemsTitle()}
          {ItemTotal()}
          {[0, 0, 0, 0, 0, 0, 0, 0, 0, 0].map(() => Items())}
        </>
      )
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.appColor} />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigateToSetting}>
          <Ionicons name="menu" size={25} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerText}>Reports</Text>
        </View>
        <View>
          <TouchableOpacity>
            <Feather name="refresh-ccw" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.commonBg,
          alignItems: 'center',
        }}>
        <HeaderView />
        <GlobalPaid />
        <GlobalClients />
        <GlobalItems />
        <YearView />
        <ModalActivityIndicator
          visible={loading}
          size="large"
          color={Colors.landingColor}
        />
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
  headerTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  headerTab: {
    width: 85,
    borderColor: Colors.appColor,
    borderWidth: 1,
  },
  tableTitle: {
    fontSize: 14,
    fontWeight: '600',
    width: '25%',
  },
  tableTileView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#fff',
    padding: 8,
    borderTopWidth: 0.3,
    borderBottomWidth: 0.3,
    marginTop: 10,
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#fff',
    padding: 8,
    borderTopWidth: 0.3,
    borderTopColor: Colors.commonBg,
  },
  itemTxt: {
    fontSize: 14,
    fontWeight: '500',
    width: '25%',
  },
  totalView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: '#d4d4d4',
    padding: 8,
  },
});

export default ReportScreen;
