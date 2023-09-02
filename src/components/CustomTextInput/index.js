import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {setWidth} from '../globalDimension';

const CustomTextInput = ({
  placeholder,
  editable = true,
  onPress = () => {},
  value,
  onChangeText = () => {},
  style,
  ...rest
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      onPress={onPress}
      style={[styles.defaultStyle, style]}
      {...rest}
    />
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  defaultStyle: {
    width: setWidth(90),
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    backgroundColor: 'rgba(82,107,242,0.1)',
  },
});
