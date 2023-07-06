import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import { Colors } from '../Helper/Colors';

const FloatingButton = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        {/* Add your button content here */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.appColor,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default FloatingButton;
