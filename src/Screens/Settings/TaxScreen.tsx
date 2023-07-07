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
import {Switch} from 'react-native-paper';
import TaxOption from '../../CustomComponent/TaxOption';

function TaxScreen({navigation}: any): JSX.Element {
  const [openModal, setOpenModal] = useState(false);
  const [selectedTax, setSelectedTax] = useState('On The Total');

  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };
  
  return (
    <>
      <StatusBar backgroundColor={'#3B51C0'} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 3,
              paddingHorizontal: 8,
            }}>
            <View style={styles.mainView}>
              <Text style={styles.label}>Tax: </Text>
              <View
                style={[
                  styles.inputContainer,
                  {height: 40, justifyContent: 'center'},
                ]}>
                <Text onPress={closeBottomSheet} style={styles.dateText}>
                  {selectedTax}
                </Text>
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>Label: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value="GST"
                  style={styles.input}
                  placeholder={''}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            {selectedTax !== 'Per Item' && (
              <View style={styles.mainView}>
                <Text style={styles.label}>Rate: </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    value="18"
                    style={styles.input}
                    placeholder={'0'}
                    placeholderTextColor={'grey'}
                  />
                </View>
              </View>
            )}
          </View>
        </View>

        {selectedTax !== 'Deducted' && (
          <View style={styles.detailView}>
            <View style={styles.mainView}>
              <Text style={styles.label}>Taxable: </Text>
              <Switch value={true} />
            </View>
            <TextInput
              editable={false}
              value="Turn on if the prices already include Tax"
              placeholder="Description"
              style={styles.detailText}
            />
          </View>
        )}
        <TaxOption
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

export default TaxScreen;