import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {Overlay} from 'react-native-elements';
import {Colors} from '../Helper/Colors';

let months = [
  {name: 'English (U.S.)', common: 'en'},
  {name: 'Portuguese', common: 'pt'},
];

const LangFormat = ({
  closeBottomSheet,
  openModal = false,
  selectedOption,
  selectedItem = '',
}: any) => {
  const {t, i18n} = useTranslation();

  return (
    <Overlay
      animationType={'slide'}
      isVisible={openModal}
      onBackdropPress={closeBottomSheet}
      overlayStyle={styles.bottomSheetContainer}>
      <ScrollView style={styles.innerView}>
        {months.map(item => (
          <TouchableOpacity
            onPress={() => {
              selectedOption(item);
              closeBottomSheet();
            }}
            style={styles.rowView}>
            <Text
              style={[
                styles.titleTxt,
                selectedItem === item.name && {color: Colors.appColor},
              ]}>
              {item.name}
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
    height: '25%',
    backgroundColor: '#F8FAFE',
    width: '100%',
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  innerView: {flex: 1, paddingHorizontal: 8},
});

export default LangFormat;
