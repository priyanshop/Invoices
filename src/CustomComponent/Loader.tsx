//@ts-nocheck
import React from 'react';
import {ActivityIndicator, View} from 'react-native';

export default ModalActivityIndicator = (props: any) => (
  <View
    style={{
      flex: 1,
      backgroundColor: '#00000033',
      zIndex: props.visible ? 999999 : -999999,
      position: 'absolute',
      left: 0,
      top: 0,
      width: props.visible ? '100%' : 0,
      height: props.visible ? '100%' : 0,
    }}>
    {!props.visible ? null : (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            paddingHorizontal: 20,
            backgroundColor: '#fff',
            paddingVertical: 10,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator
            size={props.size ? props.size : 'large'}
            color={props.color ? props.color : 'white'}
          />
        </View>
      </View>
    )}
  </View>
);
