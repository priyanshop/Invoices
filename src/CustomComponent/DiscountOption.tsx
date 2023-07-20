import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Overlay} from 'react-native-elements';

const DiscountOption = ({
  closeBottomSheet,
  openModal = false,
  selectedOption,
}: any) => {
  const {t, i18n} = useTranslation();

  const option = [
    {name: t('No Discount'), key: 'No Discount'},
    {name: t('Percentage'), key: 'Percentage'},
    {name: t('Flat Amount'), key: 'Flat Amount'},
  ];

  return (
    <Overlay
      animationType={'slide'}
      isVisible={openModal}
      onBackdropPress={closeBottomSheet}
      overlayStyle={styles.bottomSheetContainer}>
      <View style={styles.innerView}>
        {option.map((item: any) => (
          <TouchableOpacity
            onPress={() => {
              selectedOption(item.key);
              closeBottomSheet();
            }}
            style={styles.rowView}>
            <Text style={styles.titleTxt}>{item.name}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={closeBottomSheet} style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Cancel')}</Text>
        </TouchableOpacity>
      </View>
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
    justifyContent: 'space-between',
    marginVertical: 8,
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
    height: '23%',
    backgroundColor: '#F8FAFE',
    width: '100%',
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  innerView: {flex: 1, paddingHorizontal: 8},
});

export default DiscountOption;
