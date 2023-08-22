//@ts-nocheck
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import {Colors} from '../../Helper/Colors';
// import SignaturePad from '../../SignaturePad';
import {useTranslation} from 'react-i18next';
import SignaturePad from '../../Helper/SignaturePad';

const SignaturePadScreen = ({navigation}: any) => {
  const {t, i18n} = useTranslation();
  const [content, setContent] = useState('');
  const [saved, setSaved] = useState(false);
  const ref = useRef();

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const handleClear = () => {
    ref.current.cleare();
  };

  const onChange = (text: any) => {
    setContent(text);
  };

  useEffect(() => {
    handleClear();
  }, []);
  return (
    <View
      style={{
        flex: 1,
      }}>
      {saved ? (
        <Image
          source={{uri: content}}
          style={{
            flex: 1,
            resizeMode: 'contain',
          }}
        />
      ) : (
        <SignaturePad
          ref={ref}
          onError={() => {}}
          onChange={(base64DataUrl: any) => {
            onChange(base64DataUrl);
          }}
          style={{
            flex: 1,
            backgroundColor: '#fff',
          }}
        />
      )}
      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btn} onPress={() => {}}>
          <Text style={styles.btnText}>{t('Cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setSaved(!saved);
          }}>
          <Text style={styles.btnText}>{t('Save')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={handleClear}>
          <Text style={styles.btnText}>{t('Clear')}</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btn} onPress={handleClear}>
          <Text style={styles.btnText}>Resign</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    backgroundColor: Colors.landingColor,
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

export default SignaturePadScreen;
