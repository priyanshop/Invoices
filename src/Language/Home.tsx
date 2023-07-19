import React from 'react';
import { useTranslation } from 'react-i18next';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';

const Home = (props:any) => {
    const {t, i18n} = useTranslation();
    // I got my functions
  // t is function and takes the key as paramater where key is the string you want to translate
  // i18n is an object which contains tonsg of things but we only need changeLanguage(LANG) function
  // which changes the langauge to the one passed inside the function in place of LANG
  // This is your OP1 and go for it without any hesitation. Easy peasy
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          margin: 20,
          fontSize: 30,
        }}>
        {t('welcome')}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          margin: 10,
        }}>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('en')} //Here I change the language to "en" English
          style={Styles.button}>
          <Text style={{color: '#fff'}}>EN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('fr')} //Here I change the language to "es" Spanish
          style={Styles.button}>
          <Text style={{color: '#fff'}}>ES</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => i18n.changeLanguage('de')} //Here I change the language to "de" German
          style={Styles.button}>
          <Text style={{color: '#fff'}}>DE</Text>
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 20}} />
      <TouchableOpacity
        onPress={() => props.navigation.push('Room')}
        style={{
          backgroundColor: '#71a7ff',
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={{color: '#fff'}}>Go To Room</Text>
      </TouchableOpacity>
    </View>
  );
};
const Styles = StyleSheet.create({
  button: {
    backgroundColor: '#61e3a5',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
});
export default Home;