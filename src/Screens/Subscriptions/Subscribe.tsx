//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import {Images} from '../../assets';
import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  initConnection,
  flushFailedPurchasesCachedAsPendingAndroid,
  requestPurchase, 
  requestSubscription,
  endConnection,
  finishTransaction,
  purchaseUpdatedListener,
  purchaseErrorListener,
  getProducts,
} from 'react-native-iap';

const featuresArray: any = [
  {
    image: Images.bill,
    title: 'Professional Invoices',
    description:
      'Easily bill customers with professional-looking invoices and estimates',
  },
  {
    image: Images.notificationBell,
    title: 'Reports and Notifications',
    description:
      'Keep track of who has paid and who hasn’t with simple reporting and notifications',
  },
  {
    image: Images.computer,
    title: 'On-the-go Access',
    description:
      'Send invoices and estimates on the fly with always-on-the-go mobile access',
  },
  {
    image: Images.fountainPen,
    title: 'Formatting and Design',
    description:
      'Have full control of invoices with customized formatting and design',
  },
];

const description = [
  'Up to 10 invoices per month',
  'Add photos',
  'Business owner signature',
  'Summary reports',
  'Due date reminders',
];

const featuresArray2 = [
  {
    category: 'Collaboration',
    features: [
      'Online payments',
      'Credit card processing',
      'QR code payments',
      'Accept deposits',
      'Top-rated mobile app',
      'Business owner signature',
      'Add photos',
      'Request customer ratings',
    ],
  },
  {
    category: 'Views & Reporting',
    features: [
      'Real-time read receipts',
      'Autofill client & item info',
      'Due date reminders',
      'Business summary reports',
    ],
  },
  {
    category: 'Support',
    features: [
      'Chat with specialist',
      'Email our support team',
      '1st response priority',
    ],
  },
];

const SubscriptionScreen = () => {
  const targetRef = useRef();
  let layout: any = null;
  const scrollViewRef = useRef();

  const [view, setView] = useState('monthly');
  const [isVisible, setIsVisible] = useState(true);
  const [monthly, setMonthly] = useState(true);
  const [yearly, setYearly] = useState(false);
  const [products, setProducts] = useState([]);

  
  // useEffect(() => {
  //   const initializeConnection = async () => {
  //     try {
  //       await initConnection();
  //       if (Platform.OS === "android") {
  //         await flushFailedPurchasesCachedAsPendingAndroid();
  //       }
  //     } catch (error) {
  //       console.error("An error occurred", error.message);
  //     }
  //   }
  //   const purchaseUpdate = purchaseUpdatedListener(
  //     async (purchase) => {
  //       const receipt = purchase.transactionReceipt;

  //       if (receipt) {
  //         try {
  //           await finishTransaction({ purchase, isConsumable: true });
  //         } catch (error) {
  //           console.error("An error occurred", error.message);
  //         }
  //       }
  //     });

  //   const purchaseError = purchaseErrorListener((error) =>
  //     console.error('Purchase error', error.message));
  //   initializeConnection();
  //   purchaseUpdate();
  //   purchaseError();
  //   fetchProducts();
  //   return () => {
  //     endConnection();
  //     purchaseUpdate.remove();
  //     purchaseError.remove();
  //   }
  // }, []);

  const fetchProducts = async () => {
    try {
      const products = await getProducts({
        skus: Platform.select({
          ios: ['com.rniap.product10', 'com.rniap.product20'],
          android: ['com.rniap.product100', 'com.rniap.product200'],
        })
      });
      setProducts(products);
    } catch (error) {
      console.error("Error occurred while fetching products", error.message);
    }
  };
  const makePurchase = async (sku) => {
    try {
      requestPurchase({ sku })
    } catch (error) {
      console.error("Error making purchase", error.message);
    }
  }


  const purchase = async (sku) => {
    try {
      await requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false,
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const subscribe = async (sku, offerToken) => {
    try {
      await requestSubscription({
        sku,
        ...(offerToken && { subscriptionOffers: [{ sku, offerToken }] }),
      });
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const switchVisible = () => {
    setIsVisible(!isVisible);
  };
  const handleToggle = () => {
    setView(prevView => (prevView === 'monthly' ? 'yearly' : 'monthly'));
  };

  const handleScrollToRef = () => {
    if (scrollViewRef.current && targetRef.current && layout.y) {
      scrollViewRef.current.scrollTo({y: layout.y, animated: true});
    }
  };
  const subscribeHandler = () => {
    console.log('Subscribe button pressed');
  };

  const displayCross = (item: any, index: number, wholeData: any) => {
    return (
      <View>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={styles.invoicePerTxt}>{item}</Text>
        </View>
        <View
          style={
            index + 1 === wholeData.length ? styles.perView3 : styles.perView2
          }>
          <Icon
            name={'checkmark-circle'}
            size={22}
            color={Colors.landingColor}
          />
          <Icon
            name={'checkmark-circle'}
            size={22}
            color={Colors.landingColor}
          />
          <Entypo name={'cross'} size={22} color={'#ccc'} />
        </View>
      </View>
    );
  };

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        stickyHeaderIndices={[3]}
        style={styles.container}>
        <View style={{backgroundColor: Colors.appColor, height: 60}} />
        <View style={{backgroundColor: '#fff'}}>
          <View style={styles.upgradeHover}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
              <Image source={Images.appLogo} style={[styles.image]} />
            </View>
            <View style={styles.upgradeTxtView}>
              <Text style={styles.upgradeNowTxt}>{'Upgrade Now'}</Text>
            </View>
            <View style={styles.upgradeDescription}>
              <Text
                style={
                  styles.upgradeDescriptionTxt
                }>{`to unlock the invoice tool with exactly what you need, nothing you don't`}</Text>
            </View>
          </View>
          {
        products.map((product) => (
          <View key={product.vendorProductId} style={styles.row}>
            <Text>{product.localizedTitle}</Text>
            <Pressable onPress={() => makePurchase(product)}>Buy Product</Pressable></View>
        ))
      }
          {featuresArray.map((item: any) => (
            <View style={styles.feaArrayView}>
              <Image source={item.image} style={[styles.image2]} />
              <View style={{paddingHorizontal: 10, flex: 0.9}}>
                <Text style={styles.feaTxt}>{item.title}</Text>
                <Text style={styles.feaDesTxt}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{backgroundColor: '#fff', marginTop: 15, padding: 15}}>
          <View style={styles.mainPlanView}>
            <Text style={styles.planTitle}>Basic Plan</Text>
            <Text style={styles.planDescription}>Access to basic features</Text>
            <TouchableOpacity
              onPress={() => {
                setMonthly(true);
                setYearly(false);
              }}
              style={[
                styles.planContainer,
                monthly && styles.borderColorStyle,
              ]}>
              <View style={styles.rowAndStart}>
                <RadioButton.Android
                  value="first"
                  status={monthly ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setMonthly(true);
                    setYearly(false);
                  }}
                  color={Colors.appColor}
                />
              </View>

              <View style={{marginLeft: 15}}>
                <Text style={styles.planTitle2}>Monthly</Text>
                <Text style={styles.planPrice2}>$9.99/mo</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMonthly(false);
                setYearly(true);
              }}
              style={[styles.planContainer, yearly && styles.borderColorStyle]}>
              <View style={styles.rowAndStart}>
                <RadioButton.Android
                  value="second"
                  status={yearly ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setMonthly(false);
                    setYearly(true);
                  }}
                  color={Colors.appColor}
                />
              </View>

              <View style={{marginLeft: 15}}>
                <Text style={styles.planTitle2}>Yearly</Text>
                <Text style={styles.planPrice2}>$9.99/yr</Text>
              </View>
            </TouchableOpacity>

            <View style={{marginTop: 10}}>
              {description.map(item => {
                return (
                  <View style={styles.rowAndCenter}>
                    <Icon name={'checkmark-sharp'} size={22} color="#000" />
                    <Text style={styles.featureTxt}>{'  ' + item}</Text>
                  </View>
                );
              })}
              <TouchableOpacity
                onPress={handleScrollToRef}
                style={styles.rowAndCenter}>
                <Feather name={'plus'} size={20} color={Colors.appColor} />
                <Text style={styles.featureTxt2}>{'   See Features'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          ref={targetRef}
          onLayout={event => (layout = event.nativeEvent.layout)}
          style={{backgroundColor: '#fff', marginTop: 15, padding: 15}}>
          <TouchableOpacity onPress={switchVisible} style={styles.listTxtView}>
            <Text style={styles.feactListTxt}>
              {'Complete Features List     '}
            </Text>
            <Entypo
              name={!isVisible ? 'chevron-down' : 'chevron-up'}
              size={20}
              color={'#000'}
            />
          </TouchableOpacity>
          {isVisible && (
            <>
              <View style={styles.toggleButtonView}>
                <View style={styles.toggleContainer}>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      view === 'monthly' && styles.activeButton,
                    ]}
                    onPress={handleToggle}>
                    <Text
                      style={[
                        styles.buttonText,
                        view === 'monthly' && styles.activeButtonTxt,
                      ]}>
                      Monthly Billing
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.toggleButton,
                      view === 'yearly' && styles.activeButton,
                    ]}
                    onPress={handleToggle}>
                    <Text
                      style={[
                        styles.buttonText,
                        view === 'yearly' && styles.activeButtonTxt,
                      ]}>
                      Yearly Billing
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.planView}>
                <Text style={styles.planText}>{'Essentials'}</Text>
                <Text style={styles.planText}>{'Plus'}</Text>
                <Text style={styles.planText}>{'Premium'}</Text>
              </View>
            </>
          )}
        </View>
        {isVisible && (
          <>
            <View style={{backgroundColor: '#fff', padding: 15}}>
              <View style={styles.coreView}>
                <Text style={styles.individualText}>{'Core'}</Text>
                <Entypo name={'minus'} size={20} color={'#000'} />
              </View>
              <View style={styles.contentBox}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.invoicePerTxt}>
                    {'Invoice per month'}
                  </Text>
                </View>
                <View style={styles.perView}>
                  <Text style={styles.invoiceCount}>{'Up to 3'}</Text>
                  <Text style={styles.invoiceCount}>{'Up to 10'}</Text>
                  <Text style={styles.invoiceCount}>{'Unlimited'}</Text>
                </View>
              </View>
              {featuresArray2.map(GlobalItem => (
                <>
                  <View style={styles.coreView}>
                    <Text style={styles.individualText}>
                      {GlobalItem.category}
                    </Text>
                    <Entypo name={'minus'} size={20} color={'#000'} />
                  </View>
                  <View style={styles.contentBox}>
                    {GlobalItem.features.map(
                      (item: any, index: number, wholeData: any) => {
                        return displayCross(item, index, wholeData);
                      },
                    )}
                  </View>
                </>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.bottomBtnView}>
        <TouchableOpacity onPress={()=>{

Product.subscriptionOfferDetails
        }} style={styles.submitBtn}>
          <Text style={styles.upgradeNowText}>Upgrade Now</Text>
          <Text style={styles.bellowTxt}>
            {'Plus yearly plan - bill $9.99 yearly'}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  planContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  planTitle2: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  planPrice2: {
    fontSize: 14,
    marginTop: 5,
    fontWeight: 'bold',
    color: Colors.landingColor,
  },
  planPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  planDescription: {
    fontSize: 14,
    marginTop: 5,
    color: '#666',
  },
  subscribeButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 14,
    fontWeight: '600',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  image2: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  featureTxt: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  featureTxt2: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.appColor,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginTop: 10,
    padding: 3,
    backgroundColor: '#eee',
    borderRadius: 5,
  },
  toggleButton: {
    padding: 12,
    backgroundColor: '#eee',
    width: '50%',
    alignItems: 'center',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: Colors.landingColor,
  },
  activeButtonTxt: {
    color: '#fff',
  },
  planText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  planView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginTop: 10,
  },
  individualText: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
  },
  invoiceCount: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
  },
  invoicePerTxt: {
    fontSize: 15,
    fontWeight: '400',
    color: 'grey',
  },
  contentBox: {
    paddingHorizontal: 15,
    marginTop: 5,
    padding: 12,
    borderRadius: 5,
    shadowColor: '#171717',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: '#fff',
  },
  perView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  coreView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
  },
  perView2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  perView3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  feactListTxt: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  listTxtView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  toggleButtonView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  rowAndCenter: {flexDirection: 'row', alignItems: 'center'},
  borderColorStyle: {
    borderColor: Colors.landingColor,
  },
  rowAndStart: {flexDirection: 'row', justifyContent: 'flex-start'},
  mainPlanView: {
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
  },
  upgradeHover: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginTop: -45,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  upgradeTxtView: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  upgradeNowTxt: {
    color: Colors.appColor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  upgradeDescription: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 5,
  },
  upgradeDescriptionTxt: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
  },
  submitBtn: {
    backgroundColor: Colors.landingColor,
    padding: 15,
    borderRadius: 5,
    width: '90%',
  },
  upgradeNowText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  bellowTxt: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomBtnView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 5,
  },
  feaArrayView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginVertical: 15,
    flex: 0.1,
  },
  feaTxt: {
    color: '#000',
    fontSize: 17,
    fontWeight: '500',
  },
  feaDesTxt: {
    color: '#000',
    fontSize: 15,
    fontWeight: '400',
  },row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SubscriptionScreen;
