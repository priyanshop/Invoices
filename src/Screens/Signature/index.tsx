import React, {useRef, useState} from 'react';
import {TextInput, TouchableOpacity} from 'react-native';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import {Colors} from '../../Helper/Colors';
import Sign from '../../CustomComponent/SinagturePad';
import SignatureScreen from 'react-native-signature-canvas';

const imgWidth = 300;
const imgHeight = 200;
const style = `.m-signature-pad {box-shadow: none; border: none; } 
              .m-signature-pad--body {border: none;}
              .m-signature-pad--footer {display: none; margin: 0px;}
              body,html {
              width: ${imgWidth}px; height: ${imgHeight}px;}`;

const SignaturePadScreen = ({text, onOK}: any) => {
  const [colorText, setPenColor] = useState('');
  const ref = useRef();

  const handleOK = signature => {
    console.log(signature);
    onOK(signature); // Callback from Component props
  };

  const handleClear = () => {
    console.log("ref.current",JSON.stringify('ref.current',ref.current));
    
    ref.current.readSignature();
  };

  const handleColorChange = () => {
    ref.current.changePenColor(colorText);
  };

  const handleUndo = () => {
    ref.current.undo();
  };

  const handleRedo = () => {
    ref.current.redo();
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn} onPress={handleUndo}>
          <Text style={styles.text}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleRedo}>
          <Text style={styles.text}>Redo</Text>
        </TouchableOpacity>
      </View>

      <SignatureScreen
        ref={ref}
        onEmpty={handleEmpty}
        onClear={handleClear}
        penColor={colorText}
        descriptionText={'Please Sign Here'}
        rotated
      />
      <View
        style={{
          //   backgroundColor: 'red',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleClear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleClear}>
          <Text style={styles.btnText}>Resign</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 250,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textSign: {
    color: 'deepskyblue',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  text: {
    color: '#fff',
    fontWeight: '900',
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
    marginHorizontal: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default SignaturePadScreen;
