import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorage from 'i18next-react-native-async-storage';

import en from './locales/en.json'; // English translations
import fr from './locales/fr.json'; // French translations
// Add more language translation files as needed
import {getLocales} from 'react-native-localize';

i18n.use(initReactI18next).init({
  lng: getLocales()[0].languageCode,
  fallbackLng: 'fr',
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
});
export default i18n;
