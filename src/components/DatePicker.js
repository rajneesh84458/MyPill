import moment from 'moment';
import React, { useState } from 'react';
import { View, Button,Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { COLORS } from '../utilities/medicineTab';
import CustomButton from './CustomButton';

const DatePicker = () => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setselectedDate] = useState('');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDatePicker = (date) => {
    setselectedDate(date.toString)
    
    callFunc(date)
    hideDatePicker();
  };

  const time =moment(selectedDate).format('h:mm A')
  // const selectdate = selectedDate
  return (
    <View style={{flexDirection:'row',marginHorizontal:10}}>
     <CustomButton
        buttonColor={'transparent'}
        buttonStyle={{
           width:250,
         
            borderWidth: 1,
            borderColor: COLORS.PRIMARY_COLOR,
            borderRadius: 6,
          }}
          textStyle={{fontSize:14}}
        titleColor="#000"
        title={selectedDate ? selectedDate  : 'Select Date'}
        onPress={showDatePicker}
      />
      <CustomButton   buttonColor={'transparent'} title={selectedDate?time:'select Time'}  buttonStyle={{
           width:100,
         
            borderWidth: 1,
            borderColor: COLORS.PRIMARY_COLOR,
            borderRadius: 6,
            marginHorizontal:10
          }}
          textStyle={{fontSize:14}}
        titleColor="#000"/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleDatePicker}
        onCancel={hideDatePicker}
      />
    
    </View>
  );
};

export default DatePicker;
