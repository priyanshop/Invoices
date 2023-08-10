import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const EmptyHistory = ({message}: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <MaterialIcons name="history-toggle-off" style={styles.icon} />
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

export default EmptyHistory;

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
    color: 'grey',
  },
  text: {
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    marginTop: 10,
  },
});
