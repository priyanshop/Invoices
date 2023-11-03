import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import {Overlay} from 'react-native-elements';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../Helper/Permissions';
import {useTranslation} from 'react-i18next';

const ImagePickerComponent = ({
  closeBottomSheet,
  openModal = false,
  setImage,
}: any) => {
  const {t, i18n} = useTranslation();

  const captureImage = async () => {
    console.log("SSLSLS");
    
    let options = {
      mediaType: 'photo',
      quality: 1,
    };
    let isCameraPermitted = await requestCameraPermission();
    // let isStoragePermitted = await requestExternalWritePermission();
    console.log("chooseFile",isCameraPermitted);

    if (isCameraPermitted) {
       launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setImage(response.assets[0].uri);
        closeBottomSheet();
      });
    }
  };

  const chooseFile = async () => {
    console.log("chooseFile");

    let options = {
      mediaType: 'photo',
      quality: 1,
    };
    // let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    console.log("chooseFile",isStoragePermitted);
    if (isStoragePermitted) {
      launchImageLibrary(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        console.log('base64 -> ', response.base64);
        console.log('uri -> ', response.assets[0].uri);
        console.log('width -> ', response.width);
        console.log('height -> ', response.height);
        console.log('fileSize -> ', response.fileSize);
        console.log('type -> ', response.type);
        console.log('fileName -> ', response.fileName);
        setImage(response.assets[0].uri);
        closeBottomSheet();
      });
    }
  };

  return (
    <Overlay
      animationType={'slide'}
      isVisible={openModal}
      onBackdropPress={closeBottomSheet}
      overlayStyle={styles.bottomSheetContainer}>
      <View style={styles.innerView}>
        <TouchableOpacity onPress={captureImage} style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Take photo')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={chooseFile} style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Select a photo')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={closeBottomSheet} style={styles.rowView}>
          <Text style={styles.titleTxt}>{t('Cancel')}</Text>
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

export default ImagePickerComponent;
