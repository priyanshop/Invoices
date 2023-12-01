import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {BorderlessButton} from 'react-native-gesture-handler';
import {preview1} from '../../Web/index1';
import {preview2} from '../../Web/index2';
import {preview3} from '../../Web/index3';
import {preview4} from '../../Web/index4';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {Colors} from '../../Helper/Colors';
import {getScreenDimensions} from '../../Helper/ScreenDimension';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextInputWithLabel from './textInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setColor, setTemplate} from '../../redux/reducers/user/UserReducer';
import {endpoint} from '../../Networking/endpoint';
import FetchAPI from '../../Networking';
import {Images} from '../../assets';
import {Image} from 'react-native';

const screenDimensions = getScreenDimensions();
const screenWidth = screenDimensions.width;

const data = {
  _id: '',
  user: '',
  invoice_number: 'INV6',
  invoice_date: '2023-11-10T08:56:39.581Z',
  b_id: '',
  b_name: 'Fadsf',
  b_email: 'Dgfsfd@kmfgmkf.bug',
  b_address1: 'Dgsfg',
  b_address2: 'Gsdfg',
  b_address3: 'Gsf',
  b_business_logo:
    'file:///Users/imac11/Library/Developer/CoreSimulator/Devices/4FECBE0B-B656-4543-A263-00DAE95CBDAF/data/Containers/Data/Application/FC7DF6FA-49C0-4184-8793-58318F3EAF32/tmp/09258CCE-F938-45B9-9422-16C066D9A302.jpg',
  is_invoice_tax_inclusive: 'false',
  paypal_email: '',
  make_checks_payable: '',
  payment_instructions: '',
  additional_payment_instructions: '',
  notes: '',
  is_paid: false,
  items: [
    {
      description: 'Bdfgh',
      unit: '657',
      rate: '78',
      discount_rate: '',
      discount_type: 'No Discount',
      discount_value: '',
      discount_amount: '',
      total: 657,
      is_taxable: 'false',
      item_notes: 'Hdhfg',
      item_tax_rate: '1',
      quantity: '1',
      discount_total: 0,
    },
    {
      description: 'Hdfh',
      unit: '7675',
      rate: '65',
      discount_rate: '',
      discount_type: 'No Discount',
      discount_value: '',
      discount_amount: '',
      total: 7675,
      is_taxable: 'false',
      item_notes: 'Hdfhd',
      item_tax_rate: '1',
      quantity: '1',
      discount_total: 0,
    },
  ],
  photos: [],
  payments: [],
  createdAt: '2023-11-10T08:56:39.581Z',
  updatedAt: '2023-11-10T08:56:39.581Z',
  __v: 0,
  b_phone_number: '64564564',
  index: 1699606599581,
  b_owner_name: 'Dfasdf',
  b_business_number: '534534',
  b_mobile_number: '645645645',
  b_website: 'Gsdfg.vvpm',
  c_name: 'John Appleseed',
  c_email: 'John-Appleseed@mac.com',
  c_mobile_number: '888-555-5512',
  c_phone_number: '',
  c_fax: '',
  c_contact: '',
  c_address2: 'GA',
  c_address3: '3494 Kuhl Avenue',
  invoice_tax_label: 'GST',
  invoice_tax_rate: '',
  invoice_total_tax_amount: '',
  invoice_discount_value: '',
  invoice_total: '8332.00',
};
const colors = [
  '#FF0000',
  '#FF7F00',
  '#FFFF00',
  '#00FF00',
  '#0000FF',
  '#4B0082',
  '#8B00FF',
];
const colorsArray1 = [
  '#FF0000',
  '#00FF00',
  '#0000FF',
  '#FFFF00',
  '#FFA500',
  '#8B008B',
  '#FFC0CB',
];
const colorsArray2 = [
  '#4CAF50',
  '#2196F3',
  '#FF5722',
  '#9C27B0',
  '#FF9800',
  '#607D8B',
  '#E91E63',
];

const SelectedTemplatedScreen = ({navigation, route}: any) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [selectedWebViewIndex, setSelectedWebViewIndex] = useState(0);
  const [index, setIndex] = useState(0);
  const data1 = [
    {key: 'first', title: t('Design')},
    {key: 'second', title: t('Color')},
  ];
  const [routes] = useState(data1);
  const [inputValue, setInputValue] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const selector = useSelector((state: any) => state.user);

  useEffect(() => {
    if (selector.selectedColor) {
      setSelectedColor(route.params?.data?.background_color || '#CCC');
      setInputValue(route.params?.data?.background_color || '#CCC');
      setSelectedWebViewIndex(parseInt(route.params.data.template_no) - 1);
    }
  }, [selector, route.params]);

  const changeColor = (color: any) => {
    setSelectedColor(color || '#CCC');
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        //   offlineInvoiceUpdate();
      } else {
        sendInvoiceColor(color || '#CCC');
      }
    } else if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        //   offlineEstimateUpdate();
      } else {
        sendEstColor(color || '#CCC');
      }
    }
  };
  const webViews = [
    // {uri: preview1(data), key: 'page1'},
    // {uri: preview2(data), key: 'page2'},
    // {uri: preview3(data), key: 'page3'},
    // {uri: preview4(data), key: 'page4'},
    {uri: Images.template1, key: 'page1'},
    {uri: Images.template2, key: 'page2'},
    {uri: Images.template3, key: 'page3'},
    {uri: Images.template4, key: 'page4'},
  ];

  const renderWebViewItem = ({item, index}: any) => {
    const isSelected = index === selectedWebViewIndex;

    return (
      <TouchableOpacity
        onPressIn={() => handleWebViewPress(index)}
        style={[styles.webViewContainer, isSelected && styles.selectedWebView]}>
        <Image
          source={item.uri}
          style={styles.webViewImage}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  };

  const handleWebViewPress = (index: number) => {
    setSelectedWebViewIndex(index);
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        //   offlineInvoiceUpdate();
      } else {
        sendInvoiceTemp(index + 1);
      }
    } else if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        //   offlineEstimateUpdate();
      } else {
        sendEstTemp(index + 1);
      }
    }
  };

  const sendInvoiceColor = async (newColor: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.changeColorForInvoice(route?.params?.invoiceID),
        {
          background_color: newColor,
        },
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
      }
    } catch (error) {}
  };

  const sendEstColor = async (newColor: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.changeColorForEstimate(route?.params?.estimateID),
        {
          background_color: newColor,
        },
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
      }
    } catch (error) {}
  };

  const sendInvoiceTemp = async (newValue: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.invoiceTemplateNumber(route?.params?.invoiceID),
        {
          template_no: newValue?.toString(),
        },
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
      }
    } catch (error) {}
  };

  const sendEstTemp = async (newValue: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.estimateTemplateNumber(route?.params?.estimateID),
        {
          template_no: newValue?.toString(),
        },
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
      }
    } catch (error) {}
  };
  const AllRoute = () => {
    return (
      <View style={[styles.scene, {backgroundColor: Colors.commonBg}]}>
        <FlatList
          data={webViews}
          renderItem={renderWebViewItem}
          keyExtractor={item => item.key}
          numColumns={2} // Adjust the number of columns as needed
        />
      </View>
    );
  };

  const OutStandingRoute = () => {
    return (
      <View style={[styles.scene, {backgroundColor: Colors.commonBg}]}>
        <WebView
          scalesPageToFit
          style={{margin: 15, flex: 0.8, flexGrow: 1}}
          source={{html: preview1(data)}}
        />
        <View style={styles.container3}>
          <View
            style={{
              backgroundColor: '#fff',
              alignItems: 'center',
              paddingVertical: 10,
            }}>
            <Text style={styles.text}>{t('colors')}</Text>
            <View style={styles.row}>
              <TouchableOpacity
                onPress={() => changeColor(null)}
                key={index}
                style={[
                  styles.cube,
                  {backgroundColor: '#ccc'},
                  selectedColor === null ? styles.selectedTxt : null,
                ]}>
                <MaterialIcons
                  name="do-not-disturb-alt"
                  size={22}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
              {colorsArray1.slice(0, 7).map((color, index) => (
                <TouchableOpacity
                  onPress={() => changeColor(color)}
                  key={index}
                  style={[
                    styles.cube,
                    {backgroundColor: color},
                    color === selectedColor ? styles.selectedTxt : null,
                  ]}
                />
              ))}
            </View>
            <View style={styles.row}>
              {colorsArray2.slice(0, 7).map((color, index) => (
                <TouchableOpacity
                  onPress={() => changeColor(color)}
                  key={index}
                  style={[
                    styles.cube,
                    {backgroundColor: color},
                    color === selectedColor ? styles.selectedTxt : null,
                  ]}
                />
              ))}
              <TouchableOpacity
                onPress={() => setSelectedColor('edit')}
                key={index}
                style={[
                  styles.cube,
                  {backgroundColor: '#ccc'},
                  selectedColor === 'edit' ? styles.selectedTxt : null,
                ]}>
                <FontAwesome name="paint-brush" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            {selectedColor === 'edit' && (
              <TextInputWithLabel
                label={t('colorHex')}
                prefix="#" // Add your desired prefix here
                placeholder=""
                value={inputValue}
                onChangeText={(text: any) => {
                  setInputValue(text);

                  if (text.length === 3 || text.length === 6) {
                    changeColor(text);
                  }
                }}
              />
            )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{index, routes}}
        renderScene={SceneMap({
          first: AllRoute,
          second: OutStandingRoute,
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  webViewContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd', // Add your desired border color
    width: screenWidth / 2,
    height: screenWidth / 2,
    backgroundColor: '#FFF',
  },
  webViewImage: {
    // flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF',
  },
  selectedWebView: {
    borderColor: 'blue', // Change the color to your desired selection color
  },
  container2: {
    flex: 1,
  },
  scene: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  cube: {
    width: screenWidth / 10,
    height: screenWidth / 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderRadius: 5,
  },
  container3: {
    flex: 1,
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
  },
  selectedTxt: {
    borderColor: 'blue',
    borderWidth: 1.5,
  },
});

export default SelectedTemplatedScreen;
