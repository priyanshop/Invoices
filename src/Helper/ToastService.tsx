import Toast from 'react-native-simple-toast';

const showToast = (message: any) => {
  Toast.show(message, Toast.SHORT);
};

const showLongToast = (message: any) => {
  Toast.show(message, Toast.LONG);
};

export default {
  showToast,
  showLongToast,
};
