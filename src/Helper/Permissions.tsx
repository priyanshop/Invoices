import {PermissionsAndroid, Platform} from 'react-native';

export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const androidVersion = Platform.Version;
      console.log(`Android version: ${androidVersion}`);

      // You can now use androidVersion for comparisons or other logic

      let granted = PermissionsAndroid.RESULTS.DENIED;
      if (androidVersion >= 33) {
        // granted = PermissionsAndroid.RESULTS.GRANTED;
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        );
      } else {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
      }

      // const granted = await PermissionsAndroid.request(
      //   PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
      //   {
      //     title: 'External Storage Write Permission',
      //     message: 'App needs write permission',
      //   },
      // );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
    }
    return false;
  } else return true;
};
