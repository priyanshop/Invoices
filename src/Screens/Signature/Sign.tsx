//@ts-nocheck
import {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, View, useWindowDimensions} from 'react-native';
import Orientation from 'react-native-orientation-locker';
// import SignatureScreen from 'react-native-signature-canvas';
import {Colors} from '../../Helper/Colors';
import {useTranslation} from 'react-i18next';
import SignatureScreen from '../../Library/react-native-signature-canvas';
import {endpoint} from '../../Networking/endpoint';
import FetchAPI, {IMAGE_BASE_URL} from '../../Networking';
import {useDispatch, useSelector} from 'react-redux';
import ToastService from '../../Helper/ToastService';
import {Images} from '../../assets';
import {TouchableOpacity, Image} from 'react-native';
import {
  setEstimateList,
  setInvoiceList,
} from '../../redux/reducers/user/UserReducer';

const Sign = ({navigation, route}: any) => {
  const ref = useRef();
  const dispatch = useDispatch();

  const {t, i18n} = useTranslation();
  const {width, height} = useWindowDimensions();
  const selector = useSelector((state: any) => state.user);
  const [image, setImage] = useState('');
  const [alreadyExist, setAlreadyExist] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [base64Image, setBase64Image] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const convertImageUrlToBase64 = imageUrl => {
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64Data = reader.result as string;
          const base64WithMimeType = `data:image/png;base64,${
            base64Data.split(',')[1]
          }`;

          setBase64Image(base64WithMimeType);
          setAlreadyExist(true);
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => {
        console.error('Error converting image to Base64:', error);
        setBase64Image(null);
      });
  };
  useEffect(() => {
    // Orientation.lockToLandscape();
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {
    if (route.params.signature) {
      if (selector.token === 'Guest') {
        setBase64Image(route.params.signature);
        setAlreadyExist(true);
        setImageURL(route.params.signature);
      } else {
        convertImageUrlToBase64(IMAGE_BASE_URL + route.params.signature);
        // setAlreadyExist(true);
        setImageURL(route.params.signature);
      }
    } else {
      setAlreadyExist(true);
    }
  }, [route.params,selector]);

  const successMessage = () => {
    ToastService.showToast('Updated Successfully');
    navigation.goBack();
  };

  const getImage = async imageData => {
    try {
      const data = await FetchAPI(
        'get',
        endpoint.addSignatureIN(route?.params?.invoiceID),
        null,
        {
          Authorization: 'Bearer ' + selector.token,
        },
      );
      if (data.status === 'success') {
        const element = data.data;
        successMessage();
      }
    } catch (error) {}
  };

  const checkUpdate = () => {
    if (route?.params?.invoiceUpdate) {
      if (selector.token === 'Guest') {
        offlineInvoiceUpdate();
      } else {
        addImage(image);
      }
    }
    if (route?.params?.estimateUpdate) {
      if (selector.token === 'Guest') {
        offlineEstimateUpdate();
      } else {
        addImageET(image);
      }
    }
  };
  const offlineInvoiceUpdate = () => {
    const updatedArray = selector.invoiceList.map((item: any) => {
      if (item.index === route?.params?.data?.index) {
        return {
          ...item,
          signature: image,
        };
      }
      return item;
    });    
    dispatch(setInvoiceList(updatedArray));
    successMessage();
  };

  const offlineEstimateUpdate = () => {
    const updatedArray = selector.estimateList.map((item: any) => {
      if (item.index === route?.params?.data?.index) {
        return {
          ...item,
          signature: image,
        };
      }
      return item;
    });
    dispatch(setEstimateList(updatedArray));
    successMessage();
  };
  const addImage = async imageData => {
    try {
      const formData = new FormData();
      formData.append('signature', {
        uri: imageData,
        type: 'image/png',
        name: 'image.png',
      });

      const data = await FetchAPI(
        'patch',
        endpoint.addSignatureIN(route?.params?.invoiceID),
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
    } catch (error) {}
  };

  const addImageET = async imageData => {
    try {
      const formData = new FormData();
      formData.append('signature', {
        uri: imageData,
        type: 'image/png',
        name: 'image.png',
      });

      const data = await FetchAPI(
        'patch',
        endpoint.addSignatureET(route?.params?.estimateID),
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
    } catch (error) {}
  };

  const handleCondition = () => {
    if (route?.params?.estimateUpdate) {
      addImageET(image);
    }
    if (route?.params?.invoiceUpdate) {
      addImage(image);
    }
  };
  const handleOK = signature => {
    console.log(signature);
    // onOK(signature); // Callback from Component props
  };

  const handleSignature = signature => {
    console.log(signature);
    setImage(signature);
  };

  const handleEmpty = () => {
    console.log('Empty');
  };

  const handleClear = () => {
    console.log('clear success!');
  };

  const handleEnd = () => {
    ref.current.readSignature();
  };

  const handleData = data => {
    if(image){
      checkUpdate();
    }else{
      Alert.alert("", "Please do the signature before saving")
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const signaturePadHtml = `
  <div style="display: flex; flex-direction: column; align-items: center;">
    <canvas id="signatureCanvas" style="border: 1px solid black;"></canvas>
    <button id="clearButton" style="margin-top: 10px; background-color: red; color: white; padding: 10px; border: none; border-radius: 5px;">Clear</button>
    <button id="cancelButton" style="margin-top: 10px; background-color: gray; color: white; padding: 10px; border: none; border-radius: 5px;">Cancel</button>
  </div>
`;

  const handleCustomHtmlLoaded = ref => {
    const cancelButton = ref.contentDocument.getElementById('cancelButton');
    cancelButton.addEventListener('click', handleCancel);
  };

  return (
    <View style={{flex: 1}}>
      {/* {false && (
        <TouchableOpacity
          style={{
            // flex: 1,
            zIndex: 1000,
            position: 'absolute',
            top: 250,
            bottom: 155,
            left: -200,
            right: 110,
            height: width - 65,
            width: height,
          }}
          onPress={() => setAlreadyExist(false)}>
          <Image
            source={{uri: IMAGE_BASE_URL + imageURL}}
            style={{
              width: height,
              height: width - 65,
              // zIndex: 1000,
              // position: 'absolute',
              // top: 0,
              // // bottom: 0,
              // left: 0,
              // right: 0,
              backgroundColor: '#fff',
              transform: [{rotate: '90deg'}],
            }}
            resizeMode="cover"
          />
        </TouchableOpacity>
      )} */}
      {alreadyExist ? (
        <SignatureScreen
          ref={ref}
          onEnd={handleEnd}
          onOK={handleSignature}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onGetData={handleData}
          onCancel={handleCancel}
          descriptionText={''}
          clearText={t('Clear')}
          confirmText={t('Save')}
          cancelText={t('Cancel')}
          style={{flex: 1}}
          dataURL={base64Image || ''}
          webStyle={`.m-signature-pad {
            height: ${width - 65}px;
            margin: 0;
          }.m-signature-pad--footer
        .button {
        background-color: ${Colors.landingColor};
        color: #FFF;
        flex: 1;
        height: 45px;
        margin-top: 8px;
        margin-right: 1px;
        margin-left: 1px;
        font-size: 16px;
        font-weight: 500;
        }
        .save {
        font-size: 16px;
        font-weight: 500;
        }
        .clear {
        font-size: 16px;
        font-weight: 500;
        }`}
          rotated
          // customHtml={signaturePadHtml}
          // onCustomHtmlLoaded={handleCustomHtmlLoaded}
        />
      ) : null}
    </View>
  );
};

export default Sign;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signaturePad: {
    width: 600, // Adjust width as needed
    height: 300, // Adjust height as needed
    backgroundColor: 'white',
  },
  clearButton: {
    backgroundColor: 'red', // Customize Clear button color
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  clearButtonText: {
    color: 'white',
  },
  saveButton: {
    backgroundColor: 'green', // Customize Submit button color
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
  },
});
