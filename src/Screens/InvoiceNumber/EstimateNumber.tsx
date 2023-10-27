import React, {useEffect, useState} from 'react';
import {View, SectionList, Text, StyleSheet, TextInput} from 'react-native';
import TermsComponent from '../../CustomComponent/TermsComponent';
import DatePicker from 'react-native-date-picker';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import FetchAPI from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import ToastService from '../../Helper/ToastService';
import {TouchableOpacity} from 'react-native';
import {GlobalStyle} from '../../Helper/GlobalStyle';
import {setEstimateList, setInvoiceList} from '../../redux/reducers/user/UserReducer';

const EstimationNumber = ({navigation, route}: any) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState('Due on receipt');
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [date, setDate] = useState(new Date());
  const [poNumber, setPoNumber] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);
  const selector = useSelector((state: any) => state.user);

  useEffect(() => {
    setNewStateFromData(route.params?.estimateData);
  }, [route.params]);

  const setNewStateFromData = (data: any) => {
    if (data) {
      const {estimate_number, estimate_date, PO_number} = data;

      setInvoiceNumber(estimate_number || '');
      setDate(new Date(estimate_date) || new Date());
      setPoNumber(PO_number || '');
    }
  };

  const callAPI = async () => {
    const updatedData: any = {
      estimate_number: invoiceNumber,
      estimate_date: date,
      PO_number: poNumber,
    };
    if (selector.token === 'Guest') {
      const updatedArray = selector.estimateList.map((item: any) => {
        if (item.index === route?.params?.estimateData.index) {
          return {
            ...item,
            ...updatedData,
          };
        }
        return item;
      });
      dispatch(setEstimateList(updatedArray));
    } else {
      const data = await FetchAPI(
        'patch',
        endpoint.updateETNumber(route?.params?.estimateID),
        updatedData,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        successMessage();
      }
    }
  };

  const successMessage = () => {
    ToastService.showToast('Updated Successfully');
    navigation.goBack();
  };

  return (
    <View style={styles.mainContainer}>
      <View style={{borderRadius: 8, backgroundColor: '#fff', padding: 8}}>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Estimate Number')} : </Text>
          {/* <View style={{width: '50%'}}> */}
          <TextInput
            value={invoiceNumber}
            onChangeText={setInvoiceNumber}
            style={{...styles.titleTxt2, textAlign: 'right'}}
          />
          {/* </View> */}
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Date')} : </Text>
          <Text onPress={() => setOpenDate(!openDate)} style={styles.titleTxt}>
            {moment(dueDate).format(selector.globalDateFormat)}
          </Text>
        </View>
        <View style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('PO Number')} : </Text>
          {/* <View style={{width: '50%'}}> */}
          <TextInput
            value={poNumber}
            onChangeText={setPoNumber}
            style={{...styles.titleTxt2, textAlign: 'right'}}
          />
          {/* </View> */}
        </View>
      </View>
      <TouchableOpacity onPress={callAPI} style={GlobalStyle.statementBtn}>
        <Text style={[GlobalStyle.titleTxt2]}>{t('Update')}</Text>
      </TouchableOpacity>
      {/* <TermsComponent
        modalVisible={openModal}
        setModalVisible={() => setOpenModal(false)}
        setSelectedTerm={setSelectedTerm}
      /> */}
      <View>
        <DatePicker
          modal
          mode="date"
          open={openDate}
          date={new Date(dueDate)}
          onConfirm={date => {
            setDueDate(date);
            setOpenDate(false);
          }}
          onCancel={() => {
            setOpenDate(false);
          }}
        />
      </View>
    </View>
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
    marginVertical: 5,
    alignItems: 'center',
    paddingVertical: 2,
  },
  titleTxt: {fontSize: 16, color: '#000', fontWeight: '500'},
  titleTxt2: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
    // height: 40,
    textAlignVertical: 'center',
    width: '50%',
    paddingVertical: 2,
  },
});

export default EstimationNumber;
