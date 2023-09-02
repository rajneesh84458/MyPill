import React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import {COLORS} from '../utilities/medicineTab';
import CustomText from './CustomText';
const CustomButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
}) => {
  return (
    <Pressable
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || '#512DA8',
      }}
      onPress={onPress}>
      <CustomText
        title={title}
        style={{
          ...styles.title,
          ...textStyle,
          color: titleColor || COLORS.WHITE,
        }}
      />
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: COLORS.WHITE,
    fontSize: 16,
  },
});
