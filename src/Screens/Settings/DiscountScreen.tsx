import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import DiscountOption from '../../CustomComponent/DiscountOption';
import {useTranslation} from 'react-i18next';

function DiscountScreen({navigation}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const [openModal, setOpenModal] = useState(false);
  const [selectedTax, setSelectedTax] = useState('No Discount');

  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };

  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 3,
              paddingHorizontal: 10,
            }}>
            <View style={styles.mainView}>
              <Text style={styles.label}>{t('Discount')}: </Text>
              <View
                style={[
                  styles.inputContainer,
                  {height: 40, justifyContent: 'center'},
                ]}>
                <Text onPress={closeBottomSheet} style={styles.dateText}>
                  {t(selectedTax)}
                </Text>
              </View>
            </View>
            {selectedTax === 'Flat Amount' && (
              <View style={styles.mainView}>
                <Text style={styles.label}>{t('Amount')}: </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value="0"
                    style={styles.input}
                    placeholder={''}
                    placeholderTextColor={'grey'}
                  />
                </View>
              </View>
            )}
            {selectedTax === 'Percentage' && (
              <View style={styles.mainView}>
                <Text style={styles.label}>{t('Percentage')}: </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value="0"
                    style={styles.input}
                    placeholder={'0'}
                    placeholderTextColor={'grey'}
                  />
                </View>
              </View>
            )}
          </View>
        </View>

        <DiscountOption
          openModal={openModal}
          closeBottomSheet={closeBottomSheet}
          selectedOption={setSelectedTax}
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
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlign: 'right',
    height: 35,
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
    height: 35,
    fontSize: 16,
    fontWeight: '400',
    color: 'grey',
    textAlignVertical: 'top',
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

export default DiscountScreen;
