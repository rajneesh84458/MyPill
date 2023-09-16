import moment from 'moment';
import React, {useState} from 'react';
import {View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {COLORS} from '../utilities/medicineTab';
import CustomButton from './CustomButton';

const TimePicker = ({callFunc}) => {
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleTimeConfirm = time => {
    setSelectedTime(moment(time).format('h:mm A'));
    callFunc(moment(time).format('h:mm A'));

    // console.log("time=========",moment(time).format('h:mm A'))
    hideTimePicker();
  };

  return (
    <View style={{flex: 1}}>
      <CustomButton
        buttonColor={'transparent'}
        buttonStyle={{
          width: 100,

          borderWidth: 1,
          borderColor: COLORS.PRIMARY_COLOR,
          borderRadius: 6,
        }}
        textStyle={{fontSize: 14}}
        titleColor="#000"
        title={selectedTime ? selectedTime : 'Select Time'}
        onPress={showTimePicker}
      />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={hideTimePicker}
      />
    </View>
  );
};

export default TimePicker;
