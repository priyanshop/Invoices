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
import FloatingButton from '../../../CustomComponent/FloatingButton';
import { Colors } from '../../../Helper/Colors';

const data = [
  {
    item: 'Item1',
    description: 'sssss',
    price: 150.0,
  },
  {
    item: 'Item1',
    description: 'sssss',
    price: 150.0,
  },
];
function ItemsScreen({navigation}: any): JSX.Element {
  const [searchStart, setSearchStart] = useState(false);

  function navigateToSetting() {
    navigation.navigate('Settings');
  }

  const renderItem = ({item}: any) => (
    <View style={styles.invoiceItem}>
      <View>
        <Text style={styles.clientText}>{`${item.item}`}</Text>
        <Text style={styles.invoiceNumberText}>{`${item.description}`}</Text>
      </View>
      <View style={styles.priceView}>
        <Text style={styles.priceText}>{`$${item.price}`}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#3B51C0'} />
      {!searchStart ? (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigateToSetting}>
            <Icon name="flower-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Items</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setSearchStart(true)}>
              <Icon name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigateToSetting}>
            <Icon name="flower-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.onSearch}>
            <Icon name="search" size={20} color="#000" />
            <TextInput style={{width: '65%'}} />
            <TouchableOpacity onPress={() => setSearchStart(false)}>
              <Icon name="search" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item: any, index: any) => item + index}
        />
        <FloatingButton />
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
    backgroundColor:Colors.appColor,
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
});

export default ItemsScreen;
