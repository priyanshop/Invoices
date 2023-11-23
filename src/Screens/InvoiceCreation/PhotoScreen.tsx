import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Alert,
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
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ImagePickerComponent from '../../CustomComponent/ImagePickerComponent';
import {GlobalStyle} from '../../Helper/GlobalStyle';
import ToastService from '../../Helper/ToastService';
import Loader from '../../CustomComponent/Loader';
import {
  setEstimateList,
  setInvoiceList,
} from '../../redux/reducers/user/UserReducer';

function AddPhotoScreen({navigation, route}: any): JSX.Element {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const selector = useSelector((state: any) => state.user);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [descriptionError, setDescriptionError] = useState('');
  const [additionalDetailsError, setAdditionalDetailsError] = useState('');
  const setTrue = () => setIsLoading(true);
  const setFalse = () => setIsLoading(false);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => {
            DeletedImage();
          }}>
          <Icon name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.data) {
      setDescription(route.params?.data?.photo_description);
      setAdditionalDetails(route.params?.data?.photo_notes);
      if (selector.token === 'Guest') {
        setImage(route.params?.data?.photo);
      } else {
        setImage(IMAGE_BASE_URL + route.params?.data?.file_url);
      }
    }
  }, [route.params]);

  const validation = () => {
    let isValid = true;
    if (image.trim() == '') {
      Alert.alert(t('imageError'));
      isValid = false;
    }
    if (description.trim() == '') {
      setDescriptionError(t('descriptionError'));
      isValid = false;
    }
    if (additionalDetails.trim() == '') {
      setAdditionalDetailsError(t('additionalDetailsError'));
      isValid = false;
    }
    if (isValid) {
      handleCondition();
    }
  };
  const handleCondition = () => {
    setTrue();
    if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        offlineEstimateUpdate();
      } else {
        if (route?.params?.data?._id) {
          updateImageET();
        } else {
          addImageET();
        }
      }
    }
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        offlineInvoiceUpdate();
      } else {
        if (route?.params?.data?._id) {
          updateImage();
        } else {
          addImage();
        }
      }
    }
  };

  const DeletedImage = () => {
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        offlineInvoiceDelete();
      } else {
        deleteImage();
      }
    }
    if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        offlineEStimateDelete();
      } else {
        deleteImageET();
      }
    }
  };

  const offlineInvoiceDelete = () => {
    const updatedArray = selector.invoiceList.map((item: any) => {
      if (item.index === route?.params?.invoiceData?.index) {
        const myArray = [...item.photos];
        const indexToDelete = route.params.selectItemID;
        myArray.splice(indexToDelete, 1);
        return {
          ...item,
          photos: myArray,
        };
      }
      return item;
    });
    dispatch(setInvoiceList(updatedArray));
    successMessage();
  };

  const offlineEStimateDelete = () => {
    const updatedArray = selector.estimateList.map((item: any) => {
      if (item.index === route?.params?.estimateData.index) {
        const myArray = [...item.photos];
        const indexToDelete = route.params.selectItemID;
        myArray.splice(indexToDelete, 1);
        return {
          ...item,
          photos: myArray,
        };
      }
      return item;
    });
    dispatch(setEstimateList(updatedArray));
    successMessage();
  };

  const offlineEstimateUpdate = () => {
    const updatedArray = selector.estimateList.map((item: any) => {
      if (item.index === route?.params?.estimateData?.index) {
        return {
          ...item,
          photos: [
            ...item.photos,
            {
              photo_notes: additionalDetails,
              photo_description: description,
              photo: image,
            },
          ],
        };
      }
      return item;
    });
    dispatch(setEstimateList(updatedArray));
    successMessage();
  };

  const offlineInvoiceUpdate = () => {
    const updatedArray = selector.invoiceList.map((item: any) => {
      if (item.index === route?.params?.invoiceData?.index) {
        return {
          ...item,
          photos: [
            ...item.photos,
            {
              photo_notes: additionalDetails,
              photo_description: description,
              photo: image,
            },
          ],
        };
      }
      return item;
    });
    dispatch(setInvoiceList(updatedArray));
    successMessage();
  };

  const updateImage = async () => {
    try {
      const formData: any = new FormData();

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
        endpoint.updatePhotoIN(route?.params?.invoiceID,route?.params?.data?._id),
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

  const updateImageET = async () => {
    try {
      const formData: any = new FormData();

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
        endpoint.updatePhotoET(route?.params?.estimateID,route?.params?.data?._id),
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

  const addImage = async () => {
    try {
      const formData: any = new FormData();

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
        'post',
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
      const formData: any = new FormData();

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
        'post',
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

  const deleteImage = async () => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.deletePhotoIN(
          route?.params?.invoiceID,
          route.params?.data?._id,
        ),
        null,
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

  const deleteImageET = async () => {
    try {
      const data = await FetchAPI(
        'patch',
        endpoint.deletePhotoET(
          route?.params?.estimateID,
          route.params?.data?._id,
        ),
        null,
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
                  onBlur={() => {
                    if (description.trim() == '') {
                      setDescriptionError(t('descriptionError'));
                    } else {
                      setDescriptionError('');
                    }
                  }}
                />
                {descriptionError ? (
                  <Text style={styles.errorText}>{descriptionError}</Text>
                ) : null}
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
                onBlur={() => {
                  if (additionalDetails.trim() == '') {
                    setAdditionalDetailsError(t('additionalDetailsError'));
                  } else {
                    setAdditionalDetailsError('');
                  }
                }}
                multiline
              />
            </View>
            <View style={{marginLeft: 8, marginBottom: 8}}>
              {additionalDetailsError ? (
                <Text style={styles.errorText}>{additionalDetailsError}</Text>
              ) : null}
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={validation} style={GlobalStyle.statementBtn}>
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
  errorText: {
    color: 'red',
    fontSize: 12,
  },
});

export default AddPhotoScreen;
