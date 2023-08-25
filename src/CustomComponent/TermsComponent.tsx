import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {Overlay} from 'react-native-elements';
const array = [
  {label: 'None', value: 'None'},
  {label: 'Custom', value: 'Custom'},
  {label: 'Due on receipt', value: 'Due on receipt'},
  {label: 'Next Day', value: 'Next Day'},
  {label: '2 Days', value: '2 Days'},
  {label: '3 Days', value: '3 Days'},
  {label: '4 Days', value: '4 Days'},
  {label: '5 Days', value: '5 Days'},
  {label: '6 Days', value: '6 Days'},
  {label: '7 Days', value: '7 Days'},
  {label: '10 Days', value: '10 Days'},
  {label: '14 Days', value: '14 Days'},
  {label: '21 Days', value: '21 Days'},
  {label: '30 Days', value: '30 Days'},
  {label: '45 Days', value: '45 Days'},
  {label: '60 Days', value: '60 Days'},
  {label: '90 Days', value: '90 Days'},
  {label: '120 Days', value: '120 Days'},
  {label: '180 Days', value: '180 Days'},
  {label: '365 Days', value: '365 Days'},
  {label: 'Cancel', value: 'Cancel'},
];

const TermsComponent = ({
  modalVisible = false,
  setModalVisible,
  setSelectedTerm,
}: any) => {
  const {t, i18n} = useTranslation();
  const [data, setData] = useState(array);

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        if (item.value === 'Cancel') {
          setModalVisible();
        } else {
          setSelectedTerm(item.value);
          setModalVisible();
        }
      }}
      style={styles.item}>
      <Text style={styles.itemText}>{t(item.value)}</Text>
    </TouchableOpacity>
  );

  return (
    // <SafeAreaView style={styles.container}>
    // <Modal
    //   visible={modalVisible}
    //   style={{marginTop:50}}
    //   animationType="slide"
    //   onRequestClose={() => setModalVisible(false)}>
    //   <View style={styles.modalContainer}>
    //     <FlatList
    //       data={data}
    //       renderItem={renderItem}
    //       keyExtractor={(item: any, index: any) => item + index}
    //       style={{flex: 1, marginTop: 50}}
    //       contentContainerStyle={{flex: 1}}
    //     />
    //   </View>
    // </Modal>
    // </SafeAreaView>
    <Overlay
      animationType={'slide'}
      isVisible={modalVisible}
      onBackdropPress={() => setModalVisible(false)}
      overlayStyle={styles.bottomSheetContainer}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item: any, index: any) => item + index}
        // style={{flex: 1}}
        // contentContainerStyle={{flex: 1}}
      />
      <View style={{height: 10}}></View>
    </Overlay>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    padding: 10,
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default TermsComponent;
