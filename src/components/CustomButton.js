// import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import React from 'react';
// import {setHeight, setWidth} from './globalDimension';
// import {COLORS} from '../utilities/medicineTab';

// const CustomButton = ({title, onPress}) => {
//   return (
//     <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
//       <Text
//         style={{
//           fontSize: 18,
//           color: '#fff',
//           fontFamily: 'Poppins-Bold',
//         }}>
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );
// };

// export default CustomButton;

// const styles = StyleSheet.create({
//   buttonStyle: {
//     width: setWidth(80),
//     height: setHeight(6),
//     justifyContent: 'center',
//     backgroundColor: COLORS.PRIMARY_COLOR,
//     borderRadius: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });



import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {setHeight, setWidth} from './globalDimension';
import {COLORS} from '../utilities/medicineTab';
const CustomButton = ({
  title,
  onPress,
  buttonColor,
  titleColor,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...buttonStyle,
        backgroundColor: buttonColor || '#512DA8',
      }}
      onPress={onPress}>
      <Text
        style={{...styles.title, ...textStyle, color: titleColor || '#fff'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: '#512DA8',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
