import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../Helper/Colors';
import {useTranslation} from 'react-i18next';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
const dateFormat = 'YYYY-MM-DD';

function ManualExpense({navigation}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: Colors.commonBg, padding: 8}]}>
        <DatePicker
          modal
          mode="date"
          open={openModal}
          date={selectedDate}
          onConfirm={date => {
            setSelectedDate(date);
            setOpenModal(false);
          }}
          onCancel={() => {
            setOpenModal(false);
          }}
        />
        <View style={styles.photoView}>
          <Text style={styles.photoText}>{t('Add photo')}</Text>
          <TouchableOpacity>
            <Icon name="attach" size={18} color="#d2d2d2" />
          </TouchableOpacity>
        </View>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 12,
            }}>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Merchant')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={t('Merchant Name')}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Category')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={t('Set Category')}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Date')}: </Text>
              <View
                style={[
                  styles.inputContainer,
                  {height: 40, justifyContent: 'center'},
                ]}>
                <Text
                  onPress={() => setOpenModal(true)}
                  style={styles.dateText}>
                  {moment(selectedDate).format(dateFormat)}
                </Text>
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Total')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Tax')}: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.detailView}>
          <TextInput placeholder="Description" style={styles.detailText} />
        </View>
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
    marginVertical: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  inputContainer: {
    width: '50%',
  },
  input: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    height: 40,
  },
  itemView: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
  },
  totalView: {
    backgroundColor: 'grey',
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
    height: 40,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    paddingVertical: 10,
  },
  saveText: {fontSize: 18, fontWeight: '400', color: '#000'},
  dateText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    textAlignVertical: 'center',
  },
  photoView: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  photoText: {fontSize: 17, fontWeight: '500', color: '#d1d1d1'},
});

export default ManualExpense;
