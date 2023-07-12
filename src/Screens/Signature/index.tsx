import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import SignaturePad from 'react-native-signature-pad';
import {Colors} from '../../Helper/Colors';
import Sign from '../../CustomComponent/SinagturePad';
const imgWidth = 300;
const imgHeight = 200;
const style = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: ${imgWidth}px; height: ${imgHeight}px;}`;
const SignaturePadScreen = () => {
  const [signature, setSignature] = useState('');
  
  const [backupSignature, setBackupSignature] = useState('');
  const _signaturePadError = (error: any) => {
    console.error(error);
  };

  const _signaturePadChange = ({base64DataUrl}: any) => {
    console.log('Got new signature: ' + base64DataUrl);
    setSignature(base64DataUrl);
  };
  const handleCancel = () => {
    // do something when cancel is pressed
  };

  const handleSave = () => {
    // do something when save is pressed
  };

  const handleClear = () => {
    setSignature('');
    // do something when clear is pressed
  };

  const handleResign = () => {
    // do something when resign is pressed
  };
  return (
    <View style={{ width: imgWidth, height: imgHeight }}>
  <Sign
    // ref={ref}
    bgSrc="https://via.placeholder.com/300x200/ff726b"
    bgWidth={imgWidth}
    bgHeight={imgHeight}
    webStyle={style}
  onOK={(img:any) => console.log(img)}
  text={"Clear"}
  />
</View>

  )
  return (
    <SafeAreaView style={styles.container}>
        
      {/* <SignaturePad
        onError={_signaturePadError}
        onChange={_signaturePadChange}
        style={{flex: 1, backgroundColor: 'white'}}
        clear={}
      /> */}
      {/* <View
        style={{
          //   backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <TouchableOpacity style={styles.btn} onPress={handleCancel}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleSave}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleClear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleResign}>
          <Text style={styles.btnText}>Resign</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.commonBg,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#c0c0c0',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SignaturePadScreen;
