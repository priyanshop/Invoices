import React, {useRef, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import SignaturePad from '../../SignaturePad';

const Test = ({text, onOK}: any) => {
  const ref = useRef();
  const handleClear = () => {
    ref.current.Clear();
  };

  const onChange = (text: any) => {
    console.log(text);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <SignaturePad
        ref={ref}
        onError={() => {}}
        onChange={(base64DataUrl: any) => {
          onChange(base64DataUrl);
        }}
        style={{flex: 1, backgroundColor: 'white'}}
      />
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleClear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btn} onPress={handleClear}>
          <Text style={styles.btnText}>Resign</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // height: 250,
    padding: 10,
    backgroundColor: Colors.commonBg,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 18,
  },
  textSign: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  text: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  textInput: {
    paddingVertical: 10,
    textAlign: 'center',
  },
  setButton: {
    backgroundColor: 'deepskyblue',
    textAlign: 'center',
    fontWeight: '900',
    color: '#fff',
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#c0c0c0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    // paddingHorizontal: 25,
    marginHorizontal: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});

export default Test;
