import React, {useLayoutEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-paper';
import {Colors} from '../../Helper/Colors';

function AddGlobalItemScreen({navigation}: any): JSX.Element {

  return (
    <>
      <StatusBar backgroundColor={'#3B51C0'} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <View style={styles.itemView}>
          <View
            style={{
              padding: 12,
            }}>
            <View style={styles.mainView}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, {textAlign: 'left'}]}
                  placeholder={'Description'}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>Unit Cost: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'$0.00'}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>Unit: </Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder={'hours,days'}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.label}>Taxable: </Text>
              <Switch value={true} />
            </View>
          </View>
          <View style={styles.totalView}>
            <Text style={styles.totalTxt}>Total:</Text>
            <Text style={styles.totalTxt}>195</Text>
          </View>
        </View>

        <View style={styles.detailView}>
          <TextInput
            placeholder="Additional Details"
            style={styles.detailText}
            numberOfLines={4}
            multiline
          />
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
    height: 75,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
    textAlignVertical: 'top',
  },
  saveText: {fontSize: 18, fontWeight: '400', color: '#000'},
});

export default AddGlobalItemScreen;
