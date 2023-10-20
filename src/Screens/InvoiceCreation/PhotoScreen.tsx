import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../Helper/Colors';
import {useTranslation} from 'react-i18next';
import FetchAPI, {IMAGE_BASE_URL} from '../../Networking';
import {endpoint} from '../../Networking/endpoint';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ImagePickerComponent from '../../CustomComponent/ImagePickerComponent';
import {GlobalStyle} from '../../Helper/GlobalStyle';
import ToastService from '../../Helper/ToastService';
import Loader from '../../CustomComponent/Loader';

function AddPhotoScreen({navigation, route}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const selector = useSelector((state: any) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setTrue = () => setIsLoading(true);
  const setFalse = () => setIsLoading(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{marginRight: 10}} onPress={() => {}}>
          <Icon name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.data) {
      setDescription(route.params?.data?.photo_description);
      setAdditionalDetails(route.params?.data?.photo_notes);
      setImage(IMAGE_BASE_URL + route.params?.data?.file_url);
    }
  }, [route.params]);

  const handleCondition = () => {
    setTrue();
    if (route?.params?.estimateUpdate) {
      addImageET();
    }
    if (route?.params?.invoiceUpdate) {
      addImage();
    }
  };

  const addImage = async () => {
    try {
      const formData = new FormData();

      const localImageUri = image;
      const imageFileName = localImageUri.split('/').pop();
      const extension = localImageUri.split('.').pop();
      formData.append('photo', {
        uri: localImageUri,
        name: imageFileName,
        type: `image/${extension}`,
      });
      formData.append('photo_description', description);
      formData.append('photo_notes', additionalDetails);
      const data = await FetchAPI(
        'patch',
        endpoint.addPhotoIN(route?.params?.invoiceID),
        formData,
        {
          Authorization: 'Bearer ' + selector.token,
          'Content-Type': 'multipart/form-data',
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage();
      }
    } catch (error) {
      setFalse;
    }
  };

  const addImageET = async () => {
    try {
      const formData = new FormData();

      const localImageUri = image;
      const imageFileName = localImageUri.split('/').pop();
      const extension = localImageUri.split('.').pop();
      formData.append('photo', {
        uri: localImageUri,
        name: imageFileName,
        type: `image/${extension}`,
      });
      formData.append('photo_description', description);
      formData.append('photo_notes', additionalDetails);
      const data = await FetchAPI(
        'patch',
        endpoint.addPhotoET(route?.params?.estimateID),
        formData,
        {
          Authorization: 'Bearer ' + selector.token,
          'Content-Type': 'multipart/form-data',
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage();
      }
    } catch (error) {
      setFalse;
    }
  };
  const closeBottomSheet = () => {
    setOpenModal(!openModal);
  };
  const successMessage = () => {
    ToastService.showToast('Updated Successfully');
    navigation.goBack();
  };
  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} />
      <Loader visible={isLoading} size="large" color={Colors.landingColor} />
      <ScrollView
        style={[styles.scene, {backgroundColor: '#d2d2d2', padding: 8}]}>
        <TouchableOpacity onPress={closeBottomSheet} style={styles.detailView}>
          {image ? (
            <Image
              source={{uri: image}}
              resizeMode="contain"
              style={{width: 200, height: 280}}
            />
          ) : (
            <Feather name="camera" style={styles.cameraIcon} />
          )}
        </TouchableOpacity>
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
                  placeholder={t('Description')}
                  placeholderTextColor={'grey'}
                />
              </View>
            </View>
            <View style={styles.mainView}>
              <TextInput
                value={additionalDetails}
                onChangeText={setAdditionalDetails}
                placeholder={t('Additional Details')}
                placeholderTextColor={'grey'}
                style={styles.detailText}
                numberOfLines={4}
                multiline
              />
            </View>
          </View>
        </View>
        <TouchableOpacity
          onPress={handleCondition}
          style={GlobalStyle.statementBtn}>
          <Text style={[GlobalStyle.titleTxt2]}>{t('Update')}</Text>
        </TouchableOpacity>
        <ImagePickerComponent
          openModal={openModal}
          closeBottomSheet={closeBottomSheet}
          setImage={setImage}
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
  cameraIcon: {
    fontSize: 50,
    color: '#d4d4d4',
  },
});

export default AddPhotoScreen;
