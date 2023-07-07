import React, {useState} from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {StyleSheet, Text, View, Button} from 'react-native';
import {Overlay} from 'react-native-elements';

const TaxOption = ({
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
        <TouchableOpacity
          onPress={() => {
            selectedOption('On The Total');
            closeBottomSheet();
          }}
          style={styles.rowView}>
          <Text style={styles.titleTxt}>On The Total</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectedOption('Deducted');
            closeBottomSheet();
          }}
          style={styles.rowView}>
          <Text style={styles.titleTxt}>Deducted</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectedOption('Per Item');
            closeBottomSheet();
          }}
          style={styles.rowView}>
          <Text style={styles.titleTxt}>Per Item</Text>
        </TouchableOpacity>
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
    height: '18%',
    backgroundColor: '#F8FAFE',
    width: '100%',
    paddingBottom: 0,
    paddingHorizontal: 0,
  },
  innerView: {flex: 1, paddingHorizontal: 8},
});

export default TaxOption;
