import React, {useState} from 'react';
import {
  FlatList,
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
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FloatingButton from '../../../CustomComponent/FloatingButton';
import { Colors } from '../../../Helper/Colors';
import CustomHeader from '../../../CustomComponent/CustomHeader';

const data = [
  {
    client: 'Client A',
    invoiceNumber: 'INV-001',
    price: 100.0,
  },
  {
    client: 'Client B',
    invoiceNumber: 'INV-002',
    price: 200.0,
  },
];

function ClientScreen({navigation}: any): JSX.Element {
  const [searchStart, setSearchStart] = useState(false);

  function navigateToSetting() {
    navigation.navigate('Settings');
  }
  function navigateToAddClient() {
    navigation.navigate('AddClientScreen');
  }
  
  const renderItem = ({item}: any) => (
    <View style={styles.invoiceItem}>
      <View>
        <Text style={styles.clientText}>{`${item.client}`}</Text>
        <Text style={styles.invoiceNumberText}>{`${item.invoiceNumber}`}</Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.priceText}>{`$${item.price}`}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3B51C0'} />
      <CustomHeader
        searchStart={searchStart}
        navigateToSetting={navigateToSetting}
        setSearchStart={setSearchStart}
        title={"Clients"}
      />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.titleHeader}>
          <Text style={styles.tileHeaderTxt}>{'Name'}</Text>
          <Text style={styles.tileHeaderTxt}>{'Total Billed'}</Text>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: any, index: any) => item + index}
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
    backgroundColor:Colors.appColor,
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
  priceView: {justifyContent: 'center'},
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    backgroundColor: 'grey',
    paddingVertical: 10,
  },
  tileHeaderTxt: {color: '#fff', fontSize: 15, fontWeight: '500'},
});

export default ClientScreen;
