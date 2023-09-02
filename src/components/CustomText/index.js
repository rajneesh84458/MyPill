import {StyleSheet, Text} from 'react-native';
import React from 'react';
import {FONT_FAMILY} from '../../utilities/helper';

const CustomText = ({title, style, ...rest}) => {
  return (
    <Text style={[styles.defaultStyle, style]} {...rest}>
      {title}
    </Text>
  );
};

export default CustomText;
const styles = StyleSheet.create({
  defaultStyle: {
    fontFamily: FONT_FAMILY.REGULAR,
  },
});
