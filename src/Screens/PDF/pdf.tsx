import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import WebView from 'react-native-webview';
const data = [
  {id: 1, url: 'https://www.example1.com'},
  {id: 2, url: 'https://www.example2.com'},
  {id: 3, url: 'https://www.example3.com'},
  {id: 4, url: 'https://www.example4.com'},
];
const htmlContent = `
<html>
  <body>
    <form>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required><br><br>
      
      <label for="email">Email:</label>
      <input type="email" id="email" name="email" required><br><br>
      
      <input type="submit" value="Submit">
    </form>
  </body>
</html>
`;
const pdf = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.user);

  const renderItem = ({item}) => (
    <View style={{flex: 1, height: 250, margin: 5}}>
      <WebView
        contentMode="desktop"
        scalesPageToFit
        directionalLockEnabled
        scrollEnabled={false}
        setDisplayZoomControls={true}
        useWebView2
        style={{flex: 1}}
        containerStyle={{flex: 1}}
        source={{uri: item.url}}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        contentContainerStyle={{flex: 1, marginHorizontal: 10}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#d4d4d4',
  },
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: 8,
    padding: 2,
    paddingHorizontal: 8,
  },
  titleTxt: {
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
    flex: 1,
    textAlign: 'left',
    height: 60,
    textAlignVertical: 'top',
  },
  mainContain: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 8,
    marginVertical: 5,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '18%',
    backgroundColor: '#F8FAFE',
    width: '100%',
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  innerView: {flex: 1, paddingHorizontal: 8},
  businessContainer: {
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: Colors.landingColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontSize: 17,
    color: '#fff',
    fontWeight: '500',
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  businessImage: {
    width: 200,
    height: 250,
  },
  cameraIcon: {
    fontSize: 50,
    color: '#d4d4d4',
  },
});

export default pdf;
