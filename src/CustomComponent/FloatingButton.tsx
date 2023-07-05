import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

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
    backgroundColor: '#3B51C0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FloatingButton;
