import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

function SignInScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#FF5733'} />
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, styles.addressInput1]}
        placeholder={'Email'}
      />
      {/* <View style={styles.errorView}>
        <Text>Error</Text>
      </View> */}
      <TextInput style={styles.input} placeholder={'Password'} />
      <TouchableOpacity style={[styles.input, styles.lastAddressInput]}>
        <Text style={{alignSelf: 'center'}}>Login</Text>
      </TouchableOpacity>

      <View style={styles.hyperlinkView}>
        <Text style={styles.hyperlink}>Forgot Password?</Text>
        <Text style={styles.hyperlink}>Contact Support</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF5733',
    padding: 8,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    width: '75%',
    alignSelf: 'center',
    height: 30,
    padding: 4,
  },
  errorView: {
    backgroundColor: '#fff',
    width: '75%',
    alignSelf: 'center',
    padding: 4,
  },
  addressInput1: {
    padding: 4,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
  },
  lastAddressInput: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    borderTopWidth: 0.3,
    borderTopColor: 'grey',
    marginBottom: 10,
    padding: 4,
  },
  hyperlink: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    textDecorationLine: 'underline',
  },
  hyperlinkView: {
    width: '75%',
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
  },
});

export default SignInScreen;
