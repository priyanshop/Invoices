import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector, useDispatch} from 'react-redux';
import {Switch} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {Colors} from '../../Helper/Colors';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import DiscountOption from '../../CustomComponent/DiscountOption';
import {
  setEstimateList,
  setInvoiceList,
} from '../../redux/reducers/user/UserReducer';
import {
  calculateTaxedAmount,
  calculateTotalPrice2,
} from '../../Helper/CommonFunctions';

function AddItemScreen({navigation, route}: any): JSX.Element {
  const dispatch = useDispatch();
  const {t, i18n} = useTranslation();
  const selector = useSelector((state: any) => state.user);
  const [Description, setDescription] = useState('');
  const [Taxable, setTaxable] = useState(false);
  const [Notes, setNotes] = useState('');
  const [unitCost, setUnitCost] = useState('');
  const [unit, setUnit] = useState('');
  const [Quantity, setQuantity] = useState('1');
  const [Discount, setDiscount] = useState('No Discount');
  const [discountAmount, setDiscountAmount] = useState('');
  const [taxRate, setTaxRate] = useState('1');
  const [openModal, setOpenModal] = useState(false);

  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };
  const [saveToItem, setSaveToItem] = useState(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={navigateToAddPhotoScreen}>
          <Icon name="search" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (selector.token === 'Guest') {
      if (
        route.params.invoiceUpdate &&
        route.params.invoiceData.items.length > 0 &&
        route.params.index !== null &&
        route.params.index !== 'New'
      ) {
        const temp = route.params.invoiceData.items[route.params.index];
        fetchData(temp);
      }
    } else {
      if (
        route.params.invoiceUpdate &&
        route.params.invoiceData.items.length > 0 &&
        route.params.index !== null &&
        route.params.index !== 'New'
      ) {
        const temp = route.params.invoiceData.items[route.params.index];
        fetchData(temp);
      }
    }
  }, [route.params]);

  useEffect(() => {
    if (selector.token === 'Guest') {
      if (
        route.params.estimateUpdate &&
        route.params.estimateData.items.length > 0 &&
        route.params.index !== null &&
        route.params.index !== 'New'
      ) {
        const temp = route.params.estimateData.items[route.params.index];
        fetchData(temp);
      }
    } else {
      if (
        route.params.estimateUpdate &&
        route.params.estimateData.items.length > 0 &&
        route.params.index !== null &&
        route.params.index !== 'New'
      ) {
        const temp = route.params.estimateData.items[route.params.index];
        fetchData(temp);
      }
    }
  }, [route.params]);

  const fetchData = (temp: any) => {
    setDescription(temp.description);
    setDiscount(temp.discount_type);
    if (temp.discount_type === 'Percentage') {
      setDiscountAmount(temp.discount_rate?.toString() || '0');
    }
    if (temp.discount_type === 'Flat Amount') {
      setDiscountAmount(temp.discount_amount?.toString() || '0');
    }
    setNotes(temp.item_notes.toString() || '0');
    setQuantity(temp.quantity.toString() || '0');
    setUnit(temp.rate?.toString() || '0');
    setUnitCost(temp.unit?.toString() || '0');
    setTaxable(temp.is_taxable === 'true' ? true : false);
    setTaxRate(temp.item_tax_rate);
  };

  function navigateToAddPhotoScreen() {
    navigation.navigate('SelectItemScreen');
  }

  const handleTextInputChange = (value: any, setter: any) => {
    setter(value);
  };

  const calculateTotalPrice = (
    itemPrice: any,
    quantity: any,
    discountType: any,
    flatDiscount: any,
    percentageDiscount: any,
  ) => {
    let totalPrice = itemPrice * (quantity || 1);
    if (discountType !== 'No Discount') {
      if (discountType === 'Flat Amount' && flatDiscount && flatDiscount > 0) {
        totalPrice -= flatDiscount;
      }
      if (
        discountType === 'Percentage' &&
        percentageDiscount &&
        percentageDiscount > 0
      ) {
        const percentageAmount = (totalPrice * percentageDiscount) / 100;
        totalPrice -= percentageAmount;
      }
    }
    return totalPrice;
  };

  const discountPrice = (
    itemPrice: any,
    quantity: any,
    discountType: any,
    flatDiscount: any,
    percentageDiscount: any,
  ) => {
    let totalPrice = itemPrice * (quantity || 1);
    if (discountType !== 'No Discount') {
      if (discountType === 'Flat Amount' && flatDiscount && flatDiscount > 0) {
        return flatDiscount;
      }
      if (
        discountType === 'Percentage' &&
        percentageDiscount &&
        percentageDiscount > 0
      ) {
        const percentageAmount = (totalPrice * percentageDiscount) / 100;
        return percentageAmount;
      }
    }
    return 0;
  };

  const getTotal = (items: any) => {
    let total = 0;
    items.forEach((item: any) => {
      total += parseFloat(item.total);
    });
    return total.toFixed(2);
  };

  const getTotalDiscountAmount = (items: any) => {
    let totalDiscountAmount = 0;
    items.forEach((item: any) => {
      totalDiscountAmount += parseFloat(item.discount_amount || 0);
    });
    return totalDiscountAmount.toFixed(2);
  };

  function getTotalTaxAmount(products: any) {
    const totalTaxAmount = products.reduce((acc: any, product: any) => {
      const taxAmount =
        parseFloat(product.total || 0) *
        (parseFloat(product.item_tax_rate || 0) * 0.01);
      return acc + taxAmount;
    }, 0);

    return totalTaxAmount;
  }

  const update = async () => {
    try {
      const tempIndex = route.params.index;
      if (!tempIndex) {
        const payload: any = {
          description: Description,
          unit: unitCost,
          rate: unit,
          discount_rate: Discount === 'Percentage' ? discountAmount : '',
          discount_type: Discount,
          discount_value: Discount === 'Flat Amount' ? discountAmount : '',
          total: calculateTotalPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
          is_taxable: Taxable.toString(),
          item_notes: Notes,
          item_tax_rate: taxRate,
          quantity: Quantity,
          discount_total: discountPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
        };
        const updatedItems = [...route.params.invoiceData.items];
        updatedItems[0] = payload;
        const totalAmount = getTotal(updatedItems);
        const totalTax = getTotalTaxAmount(updatedItems);

        const tempPayload: any = {
          items: updatedItems,
          // invoice_discount_type: '',
          // invoice_discount_value: '',
          // invoice_discount_amount: discountAmount,
          // invoice_tax_type: '',
          // invoice_tax_label: '',
          // invoice_tax_rate: '',
          // is_invoice_tax_inclusive: 'false',
          // invoice_total_tax_amount: totalTax,
          invoice_total: totalAmount,
        };
        if (selector.token === 'Guest') {
          // navigation.goBack();
        } else {
          updateCall(tempPayload);
        }
      } else if (tempIndex === 'New') {
        const payload: any = {
          description: Description,
          unit: unitCost,
          rate: unit,
          discount_rate: Discount === 'Percentage' ? discountAmount : '',
          discount_type: Discount,
          discount_value: Discount === 'Flat Amount' ? discountAmount : '',
          total: calculateTotalPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
          is_taxable: Taxable.toString(),
          item_notes: Notes,
          item_tax_rate: taxRate,
          quantity: Quantity,
          discount_total: discountPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
        };

        const updatedItemIndex = route.params.index;
        let updatedItems = [...route.params.invoiceData.items];
        updatedItems = [...updatedItems, payload];
        const totalAmount = getTotal(updatedItems);
        const totalDiscountAmount = getTotalDiscountAmount(updatedItems);
        const data: any = route.params.invoiceData;
        const totalTax = getTotalTaxAmount(updatedItems);

        const tempPayload: any = {
          items: updatedItems,
          // invoice_discount_type: data.invoice_discount_type,
          // invoice_discount_value: data.invoice_discount_value,
          // invoice_discount_amount: totalDiscountAmount,
          // invoice_tax_type: data.invoice_tax_type,
          // invoice_tax_label: data.invoice_tax_label,
          // invoice_tax_rate: data.invoice_tax_rate,
          // is_invoice_tax_inclusive: data.is_invoice_tax_inclusive,
          // invoice_total_tax_amount: totalTax,
          invoice_total: totalAmount,
        };
        if (selector.token === 'Guest') {
          // navigation.goBack();
        } else {
          updateCall(tempPayload);
        }
      } else {
        const payload: any = {
          description: Description,
          unit: unitCost,
          rate: unit,
          discount_rate: Discount === 'Percentage' ? discountAmount : '',
          discount_type: Discount,
          discount_value: Discount === 'Flat Amount' ? discountAmount : '',
          total: calculateTotalPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
          is_taxable: Taxable.toString(),
          item_notes: Notes,
          item_tax_rate: taxRate,
          quantity: Quantity,
          discount_total: discountPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
        };

        const updatedItemIndex = route.params.index;
        const updatedItems = [...route.params.invoiceData.items];
        updatedItems[updatedItemIndex] = payload;
        const totalAmount = getTotal(updatedItems);
        const totalDiscountAmount = getTotalDiscountAmount(updatedItems);
        const data: any = route.params.invoiceData;
        const totalTax = getTotalTaxAmount(updatedItems);

        const tempPayload: any = {
          items: updatedItems,
          // invoice_discount_type: data.invoice_discount_type,
          // invoice_discount_value: data.invoice_discount_value,
          // invoice_discount_amount: totalDiscountAmount,
          // invoice_tax_type: data.invoice_tax_type,
          // invoice_tax_label: data.invoice_tax_label,
          // invoice_tax_rate: data.invoice_tax_rate,
          // is_invoice_tax_inclusive: data.is_invoice_tax_inclusive,
          // invoice_total_tax_amount: totalTax,
          invoice_total: totalAmount,
        };
        if (selector.token === 'Guest') {
          // navigation.goBack();
        } else {
          updateCall(tempPayload);
        }
      }
    } catch (error) {}
  };

  const updateEstimate = async () => {
    try {
      const tempIndex = route.params.index;
      if (!tempIndex) {
        const payload: any = {
          description: Description,
          unit: unitCost,
          rate: unit,
          discount_rate: Discount === 'Percentage' ? discountAmount : '',
          discount_type: Discount,
          discount_value: Discount === 'Flat Amount' ? discountAmount : '',
          total: calculateTotalPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
          is_taxable: Taxable.toString(),
          item_notes: Notes,
          item_tax_rate: taxRate,
          quantity: Quantity,
          discount_total: discountPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
        };
        const updatedItems = [...route.params.estimateData.items];
        updatedItems[0] = payload;
        const totalAmount = getTotal(updatedItems);
        const totalTax = getTotalTaxAmount(updatedItems);

        const tempPayload: any = {
          items: updatedItems,
          // estimate_discount_type: 'zero',
          // estimate_discount_value: '100',
          estimate_discount_amount: discountAmount,
          // estimate_tax_type: 'zero',
          // estimate_tax_label: 'aaaa',
          // estimate_tax_rate: '10',
          // is_estimate_tax_inclusive: 'false',
          estimate_total_tax_amount: totalTax,
          estimate_total: totalAmount,
        };
        if (selector.token === 'Guest') {
          // navigation.goBack();
        } else {
          updateETCall(tempPayload);
        }
      } else if (tempIndex === 'New') {
        const payload: any = {
          description: Description,
          unit: unitCost,
          rate: unit,
          discount_rate: Discount === 'Percentage' ? discountAmount : '',
          discount_type: Discount,
          discount_value: Discount === 'Flat Amount' ? discountAmount : '',
          total: calculateTotalPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
          is_taxable: Taxable.toString(),
          item_notes: Notes,
          item_tax_rate: taxRate,
          quantity: Quantity,
          discount_total: discountPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
        };

        const updatedItemIndex = route.params.index;
        let updatedItems = [...route.params.estimateData.items];
        updatedItems = [...updatedItems, payload];
        const totalAmount = getTotal(updatedItems);
        const totalDiscountAmount = getTotalDiscountAmount(updatedItems);
        const data: any = route.params.estimateData;
        const totalTax = getTotalTaxAmount(updatedItems);

        const tempPayload: any = {
          items: updatedItems,
          estimate_discount_type: data.estimate_discount_type,
          estimate_discount_value: data.estimate_discount_value,
          estimate_discount_amount: totalDiscountAmount,
          estimate_tax_type: data.estimate_tax_type,
          estimate_tax_label: data.estimate_tax_label,
          estimate_tax_rate: data.estimate_tax_rate,
          is_estimate_tax_inclusive: data.is_estimate_tax_inclusive,
          estimate_total_tax_amount: totalTax,
          estimate_total: totalAmount,
        };
        if (selector.token === 'Guest') {
          // navigation.goBack();
        } else {
          updateETCall(tempPayload);
        }
      } else {
        const payload: any = {
          description: Description,
          unit: unitCost,
          rate: unit,
          discount_rate: Discount === 'Percentage' ? discountAmount : '',
          discount_type: Discount,
          discount_value: Discount === 'Flat Amount' ? discountAmount : '',
          total: calculateTotalPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
          is_taxable: Taxable.toString(),
          item_notes: Notes,
          item_tax_rate: taxRate,
          quantity: Quantity,
          discount_total: discountPrice(
            unitCost,
            Quantity,
            Discount,
            discountAmount,
            discountAmount,
          ),
        };

        const updatedItemIndex = route.params.index;
        const updatedItems = [...route.params.estimateData.items];
        updatedItems[updatedItemIndex] = payload;
        const totalAmount = getTotal(updatedItems);
        const totalDiscountAmount = getTotalDiscountAmount(updatedItems);
        const data: any = route.params.estimateData;
        const totalTax = getTotalTaxAmount(updatedItems);

        const tempPayload: any = {
          items: updatedItems,
          estimate_discount_type: data.estimate_discount_type,
          estimate_discount_value: data.estimate_discount_value,
          estimate_discount_amount: totalDiscountAmount,
          estimate_tax_type: data.estimate_tax_type,
          estimate_tax_label: data.estimate_tax_label,
          estimate_tax_rate: data.estimate_tax_rate,
          is_estimate_tax_inclusive: data.is_estimate_tax_inclusive,
          estimate_total_tax_amount: totalTax,
          estimate_total: totalAmount,
        };
        if (selector.token === 'Guest') {
          // navigation.goBack();
        } else {
          updateETCall(tempPayload);
        }
      }
    } catch (error) {}
  };

  const updateOffline = async () => {
    try {
      const tempTotal = calculateTotalPrice(
        unitCost,
        Quantity,
        Discount,
        discountAmount,
        discountAmount,
      );
      const percentageAmount = (tempTotal * parseFloat(discountAmount)) / 100;
      const tempIndex = route.params.index;
      const payload: any = {
        description: Description,
        unit: unitCost,
        rate: unit,
        discount_rate: Discount === 'Percentage' ? discountAmount : '',
        discount_type: Discount,
        discount_value: Discount === 'Flat Amount' ? discountAmount : '',
        discount_amount:
          Discount === 'Flat Amount'
            ? discountAmount
            : Discount === 'Percentage'
            ? percentageAmount
            : '',
        total: tempTotal,
        is_taxable: Taxable.toString(),
        item_notes: Notes,
        item_tax_rate: taxRate,
        quantity: Quantity,
        discount_total: discountPrice(
          unitCost,
          Quantity,
          Discount,
          discountAmount,
          discountAmount,
        ),
      };

      let updatedItems = [...route.params.invoiceData.items];
      const data: any = route.params.invoiceData;

      if (tempIndex === 'New') {
        updatedItems = [...updatedItems, payload];
      } else if (!tempIndex) {
        updatedItems[0] = payload;
      } else {
        updatedItems[tempIndex] = payload;
      }

      const totalAmount = getTotal(updatedItems);
      const totalDiscountAmount = getTotalDiscountAmount(updatedItems);
      const totalTax = getTotalTaxAmount(updatedItems);
      const tempTotal2 = calculateTaxedAmount(
        route.params.invoiceData.invoice_total,
        route.params.invoiceData.invoice_tax_rate,
      );

      const tempPayload: any = {
        items: updatedItems,
        invoice_tax_type: data.invoice_tax_type,
        invoice_tax_label: 'GST',
        invoice_tax_rate:
          data.invoice_tax_type === 'On The Total' ? data.invoice_tax_rate : '',
        is_invoice_tax_inclusive: 'false',
        invoice_total_tax_amount:
          data.invoice_tax_type === 'On The Total'
            ? tempTotal2
            : data.invoice_tax_type === 'Per Item'
            ? totalTax
            : '',

        invoice_discount_type: data.invoice_discount_type,
        invoice_discount_value:
          data.invoice_discount_type === 'Flat Amount'
            ? data.invoice_discount_value
            : data.invoice_discount_type === 'Percentage'
            ? data.invoice_discount_value
            : '',
        invoice_discount_amount: calculateTotalPrice2(
          totalAmount,
          data.invoice_discount_type,
          data.invoice_discount_value,
          data.invoice_discount_value,
        ),
        invoice_total: totalAmount,
      };
      if (selector.token === 'Guest') {
        updateCallOffline(tempPayload);
      } else {
        updateCall(tempPayload);
      }
    } catch (error) {}
  };

  const updateCallOffline = async (tempPayload: any) => {
    const updatedArray = selector.invoiceList.map((item: any) => {
      if (item.index === route?.params?.invoiceData.index) {
        return {
          ...item,
          ...tempPayload,
        };
      }
      return item;
    });
    dispatch(setInvoiceList(updatedArray));
    navigation.goBack();
  };

  const updateEstimateOffline = async () => {
    try {
      const tempTotal = calculateTotalPrice(
        unitCost,
        Quantity,
        Discount,
        discountAmount,
        discountAmount,
      );
      const percentageAmount = (tempTotal * parseFloat(discountAmount)) / 100;
      const tempIndex = route.params.index;
      const payload: any = {
        description: Description,
        unit: unitCost,
        rate: unit,
        discount_rate: Discount === 'Percentage' ? discountAmount : '',
        discount_type: Discount,
        discount_value: Discount === 'Flat Amount' ? discountAmount : '',
        discount_amount:
          Discount === 'Flat Amount'
            ? discountAmount
            : Discount === 'Percentage'
            ? percentageAmount
            : '',
        total: tempTotal,
        is_taxable: Taxable.toString(),
        item_notes: Notes,
        item_tax_rate: taxRate,
        quantity: Quantity,
        discount_total: discountPrice(
          unitCost,
          Quantity,
          Discount,
          discountAmount,
          discountAmount,
        ),
      };

      let updatedItems = [...route.params.estimateData.items];
      const data: any = route.params.estimateData;

      if (!tempIndex) {
        updatedItems[0] = payload;
      } else if (tempIndex === 'New') {
        updatedItems = [...updatedItems, payload];
      } else {
        updatedItems[tempIndex] = payload;
      }

      const totalAmount = getTotal(updatedItems);
      const totalDiscountAmount = getTotalDiscountAmount(updatedItems);
      const totalTax = getTotalTaxAmount(updatedItems);
      const tempTotal2 = calculateTaxedAmount(
        route.params.estimateData.estimate_total,
        route.params.estimateData.estimate_tax_rate,
      );
      const tempPayload: any = {
        items: updatedItems,
        estimate_tax_type: data.estimate_tax_type,
        estimate_tax_label: 'GST',
        estimate_tax_rate:
          data.estimate_tax_type === 'On The Total'
            ? data.estimate_tax_type
            : '',
        is_estimate_tax_inclusive: 'false',
        estimate_total_tax_amount:
          data.estimate_tax_type === 'On The Total'
            ? tempTotal2
            : data.estimate_tax_type === 'Per Item'
            ? totalTax
            : '',

        estimate_discount_type: data.estimate_discount_type,
        estimate_discount_value:
          data.estimate_discount_type === 'Flat Amount'
            ? data.estimate_discount_value
            : data.estimate_discount_type === 'Percentage'
            ? data.estimate_discount_value
            : '',
        estimate_discount_amount: calculateTotalPrice2(
          totalAmount,
          data.estimate_discount_type,
          data.estimate_discount_value,
          data.estimate_discount_value,
        ),
        estimate_total: totalAmount,
      };
      if (selector.token === 'Guest') {
        updateEstimateCallOffline(tempPayload);
      } else {
        updateETCall(tempPayload);
      }
    } catch (error) {}
  };

  const updateEstimateCallOffline = async (tempPayload: any) => {
    const updatedArray = selector.estimateList.map((item: any) => {
      if (item.index === route?.params?.estimateData.index) {
        return {
          ...item,
          ...tempPayload,
        };
      }
      return item;
    });
    dispatch(setEstimateList(updatedArray));
    setTimeout(() => {
      navigation.goBack();
    }, 1000);
  };

  const updateCall = async (tempPayload: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.updateIVItem(route?.params?.invoiceID),
        tempPayload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        navigation.goBack();
      }
    } catch (error) {}
  };

  const updateETCall = async (tempPayload: any) => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.updateETItem(route?.params?.estimateID),
        tempPayload,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        navigation.goBack();
      }
    } catch (error) {}
  };

  const checkCondition = () => {
    if (route.params.invoiceUpdate) {
      // if (selector.token === 'Guest') {
      updateOffline();
      // } else {
      //   update();
      // }
    }
    if (route.params.estimateUpdate) {
      // if (selector.token === 'Guest') {
      updateEstimateOffline();
      // } else {
      //   updateEstimate();
      // }
    }
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 12,
            }}>
            <View style={[styles.mainView]}>
              {/* <View style={styles.inputContainer}> */}
              <TextInput
                value={Description}
                style={[styles.input2]}
                placeholder={t('Description')}
                placeholderTextColor={'grey'}
                onChangeText={value => setDescription(value)}
              />
              {/* <Text style={styles.errorTxt}>{'Error'}</Text> */}
              {/* </View> */}
            </View>
            <View style={[styles.mainView, {marginHorizontal: 4}]}>
              <Text style={styles.label}>{t('Unit Cost')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={unitCost}
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor={'grey'}
                  keyboardType="numeric"
                  onChangeText={value =>
                    handleTextInputChange(value, setUnitCost)
                  }
                />
              </View>
            </View>
            <View style={[styles.mainView, {marginHorizontal: 4}]}>
              <Text style={styles.label}>{t('Unit')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={unit}
                  style={styles.input}
                  placeholder={t('hours,days')}
                  placeholderTextColor={'grey'}
                  onChangeText={value => handleTextInputChange(value, setUnit)}
                />
              </View>
            </View>
            <View style={[styles.mainView, {marginHorizontal: 4}]}>
              <Text style={styles.label}>{t('Quantity')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={Quantity}
                  style={styles.input}
                  placeholder={'1'}
                  placeholderTextColor={'grey'}
                  keyboardType="numeric"
                  onChangeText={value =>
                    handleTextInputChange(value, setQuantity)
                  }
                />
              </View>
            </View>
            <View
              style={[
                styles.mainView,
                {marginVertical: 10, marginHorizontal: 4},
              ]}>
              <Text style={styles.label}>{t('Discount')}: </Text>
              <View style={styles.inputContainer}>
                {/* <TextInput
                  value={Discount}
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor={'grey'}
                  onChangeText={value =>
                    handleTextInputChange(value, setDiscount)
                  }
                /> */}
                <Text
                  onPress={closeBottomSheet}
                  style={{
                    fontSize: 18,
                    fontWeight: '400',
                    color: '#000',
                    textAlign: 'right',
                  }}>
                  {t(Discount)}
                </Text>
              </View>
            </View>
            {Discount !== 'No Discount' && (
              <View style={[styles.mainView, {marginHorizontal: 4}]}>
                <Text style={styles.label}>
                  {Discount === 'Percentage'
                    ? 'Discount Rate'
                    : t('Discount Amount')}
                  :{' '}
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={discountAmount}
                    style={styles.input}
                    placeholder={Discount === 'Percentage' ? '0%' : '$0'}
                    placeholderTextColor={'grey'}
                    onChangeText={value =>
                      handleTextInputChange(value, setDiscountAmount)
                    }
                  />
                </View>
              </View>
            )}
            <View style={[styles.mainView, {marginHorizontal: 4}]}>
              <Text style={styles.label}>{t('Taxable')}: </Text>
              <Switch
                value={Taxable}
                color={Colors.landingColor}
                onValueChange={(value: any) => setTaxable(value)}
              />
            </View>

            {Taxable && (
              <View style={[styles.mainView, {marginHorizontal: 4}]}>
                <Text style={styles.label}>{t('Tax Rate')}: </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value={taxRate}
                    style={styles.input}
                    placeholder={'1'}
                    placeholderTextColor={'grey'}
                    keyboardType="numeric"
                    onChangeText={value =>
                      handleTextInputChange(value, setTaxRate)
                    }
                  />
                </View>
              </View>
            )}
          </View>
          <View style={styles.totalView}>
            <Text style={styles.totalTxt}>{t('Total')}:</Text>
            <Text style={styles.totalTxt}>
              {calculateTotalPrice(
                unitCost,
                Quantity,
                Discount,
                discountAmount,
                discountAmount,
              )}
            </Text>
          </View>
        </View>

        <View style={styles.detailView}>
          <TextInput
            value={Notes}
            placeholder={t('Additional Details')}
            placeholderTextColor={'grey'}
            style={styles.detailText}
            numberOfLines={4}
            multiline
            onChangeText={value => handleTextInputChange(value, setNotes)}
          />
        </View>

        <View style={styles.itemView}>
          <View style={styles.saveView}>
            <Text style={styles.saveText}>{t('Save to "My Items"')}</Text>
            <Switch
              value={saveToItem}
              color={Colors.landingColor}
              onValueChange={(value: any) => setSaveToItem(value)}
            />
          </View>
        </View>

        <TouchableOpacity onPress={checkCondition} style={styles.statementBtn}>
          <Text style={[styles.titleTxt2, {color: '#fff', fontWeight: '600'}]}>
            {true ? t('Update') : t('Create')}
          </Text>
        </TouchableOpacity>
        <DiscountOption
          openModal={openModal}
          closeBottomSheet={closeBottomSheet}
          selectedOption={setDiscount}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: Platform.OS === 'ios' ? 5 : 0,
    alignItems: 'center',
    marginVertical: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  inputContainer: {
    width: '50%',
    justifyContent: 'center',
  },
  input: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    height: 40,
  },
  input2: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    height: 40,
    width:"100%",
  },
  itemView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  totalView: {
    backgroundColor: Colors.landingColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 8,
  },
  detailView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 5,
    paddingVertical: 5,
  },
  saveView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },
  totalTxt: {fontSize: 18, fontWeight: '500', color: '#fff'},
  detailText: {
    height: 75,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlignVertical: 'top',
  },
  saveText: {fontSize: 18, fontWeight: '400', color: '#000'},
  statementBtn: {
    backgroundColor: Colors.appColor,
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    marginVertical: 5,
  },
  titleTxt2: {fontSize: 17, color: '#000', fontWeight: '400'},
  errorTxt: {fontSize: 13, fontWeight: '500', color: 'red'},
});

export default AddItemScreen;
