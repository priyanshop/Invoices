import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Overlay} from 'react-native-elements';

const option = [
  {name: 'No Discount', key: 'No Discount'},
  {name: 'Percentage', key: 'Percentage'},
  {name: 'Flat Amount', key: 'Flat Amount'},
];
const DiscountOption = ({
  closeBottomSheet,
  openModal = false,
  selectedOption,
}: any) => {
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
            <Text style={styles.titleTxt}>{item.key}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity onPress={closeBottomSheet} style={styles.rowView}>
          <Text style={styles.titleTxt}>Cancel</Text>
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
