import React, {useLayoutEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

function AddPhotoScreen({navigation}: any): JSX.Element {
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={() => {}}>
          <Icon name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
      <StatusBar backgroundColor={'#3B51C0'} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <View style={styles.detailView}>
          <Image
            source={{uri: image}}
            resizeMode="contain"
            style={{width: 200, height: 280}}
          />
        </View>
        <View style={styles.itemView}>
          <View>
            <View
              style={[
                styles.mainView,
                {borderBottomWidth: 0.3, borderBottomColor: 'grey'},
              ]}>
              <View style={styles.inputContainer}>
                <TextInput
                  value={description}
                  onChangeText={setDescription}
                  style={[styles.input, {textAlign: 'left'}]}
                  placeholder={'Description'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <TextInput
                value={additionalDetails}
                onChangeText={setAdditionalDetails}
                placeholder="Additional Details"
                style={styles.detailText}
                numberOfLines={4}
                multiline
              />
            </View>
          </View>
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
    // marginVertical: 5,
    alignItems: 'center',
    padding: 2,
    paddingHorizontal: 8,
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
    fontSize: 18,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    height: 70,
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textAlignVertical: 'top',
  },
  saveText: {fontSize: 18, fontWeight: '400', color: '#000'},
});

export default AddPhotoScreen;
