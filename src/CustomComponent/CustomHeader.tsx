import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../Helper/Colors';

const CustomHeader = ({
  searchStart=false,
  navigateToSetting,
  setSearchStart,
  title=""
}: any) => {
  const renderHeader = () => {
    if (!searchStart) {
      return (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigateToSetting}>
            <SimpleLineIcons name="settings" size={20} color="#fff" />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>{title}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => setSearchStart(true)}>
              <Icon name="search" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigateToSetting}>
            <SimpleLineIcons name="settings" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.onSearch}>
            <Icon name="search" size={20} color="#000" />
            <TextInput style={{width: '65%'}} />
            <TouchableOpacity onPress={() => setSearchStart(false)}>
              <Entypo name="circle-with-cross" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return renderHeader();
};

export default CustomHeader;

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
});
