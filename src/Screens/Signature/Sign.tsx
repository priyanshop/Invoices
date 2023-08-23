//@ts-nocheck
import {useEffect, useRef} from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import Orientation from 'react-native-orientation-locker';
// import SignatureScreen from 'react-native-signature-canvas';
import {Colors} from '../../Helper/Colors';
import {useTranslation} from 'react-i18next';
import SignatureScreen from '../../Library/react-native-signature-canvas';

const Sign = ({navigation, route}: any) => {
  const ref = useRef();
  const {t, i18n} = useTranslation();
  const {width} = useWindowDimensions();

  useEffect(() => {
    // Orientation.lockToLandscape();
    Orientation.lockToPortrait();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  const handleOK = signature => {
    console.log(signature);
    // onOK(signature); // Callback from Component props
  };

  const handleSignature = signature => {
    console.log(signature);
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
    console.log(data);
  };

  const handleCancel = () => {
    console.log('Empty');
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
        webStyle={`.m-signature-pad {
            height: ${width - 80}px;
            margin: 0;
          }.m-signature-pad--footer
        .button {
        background-color: ${Colors.landingColor};
        color: #FFF;
        flex: 1;
        height: 40px;
        margin-horizontal : 5;
        margin-right: 10px;
        margin-left: 10px;
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
