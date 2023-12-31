import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {Overlay} from 'react-native-elements';

let currencies = [
  {name: 'USD', symbol: '$'},
  {name: 'EUR', symbol: '€'},
  {name: 'CAD', symbol: '$'},
  {name: 'AUD', symbol: '$'},
  {name: 'AED', symbol: 'د.إ'},
  {name: 'AFN', symbol: '؋'},
  {name: 'ALL', symbol: 'L'},
  {name: 'AMD', symbol: '֏'},
  {name: 'AKS', symbol: '$'},
  {name: 'AWG', symbol: 'ƒ'},
];

const CurrencyFormat = ({
  closeBottomSheet,
  openModal = false,
  selectedOption,
}: any) => {
  const {t, i18n} = useTranslation();

  return (
    <Overlay
      animationType={'slide'}
      isVisible={openModal}
      onBackdropPress={closeBottomSheet}
      overlayStyle={styles.bottomSheetContainer}>
      <ScrollView style={styles.innerView}>
        {currencies.map(item => (
          <TouchableOpacity
            onPress={() => {
              selectedOption(item.name);
              closeBottomSheet();
            }}
            style={styles.rowView}>
            <Text style={styles.titleTxt}>{item.name}</Text>
            <Text style={styles.titleTxt}>
              {' ('} {item.symbol}
              {')'}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={closeBottomSheet} style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Cancel')}</Text>
        </TouchableOpacity>
      </ScrollView>
    </Overlay>
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
    // justifyContent: 'space-between',
    marginVertical: 15,
  },
  titleTxt: {fontSize: 17, color: '#000', fontWeight: '400'},
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
    height: '75%',
    backgroundColor: '#F8FAFE',
    width: '100%',
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  innerView: {flex: 1, paddingHorizontal: 8},
});

export default CurrencyFormat;
