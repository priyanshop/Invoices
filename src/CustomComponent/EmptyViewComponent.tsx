import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EmptyViewComponent = ({message}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <MaterialIcons name="inbox" style={styles.icon} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

export default EmptyViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
  },
  icon: {
    fontSize: 65,
    color: '#d4d4d4',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
});
