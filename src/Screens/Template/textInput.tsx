import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';

const TextInputWithLabel = ({
  label,
  prefix,
  placeholder,
  value,
  onChangeText,
}:any) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-start',
          marginTop: 5,
        }}>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.prefix}>{prefix}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'left',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
  },
  prefix: {
    fontSize: 18,
    marginRight: 8,
    color: '#333333',
    paddingLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 8,
  },
});

export default TextInputWithLabel;
