import moment from 'moment';
import React, {useState} from 'react';
import {View, FlatList} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {COLORS} from '../utilities/medicineTab';
import CustomText from './CustomText';

const AgendaScreen = () => {
  const [selectedDate, setSelectedDate] = useState(moment());

  const data = [
    {id: 1, title: 'Event 1', date: '2023-03-03'},
    {id: 2, title: 'Event 2', date: '2023-03-05'},
    {id: 3, title: 'Event 3', date: '2023-03-05'},
    {id: 4, title: 'Event 4', date: '2023-03-05'},
    {id: 5, title: 'Event 5', date: '2023-03-08'},
  ];

  const filteredData = data.filter(
    item => item.date === selectedDate?.format('YYYY-MM-DD'),
  );
  console.log('firfilteredDatast', filteredData);
  return (
    <View style={{flex: 1}}>
      <CalendarStrip
        style={{height: 120, paddingTop: 20, paddingBottom: 10}}
        selectedDate={selectedDate}
        calendarHeaderStyle={{color: 'white'}}
        calendarColor={'#7743CE'}
        dateNumberStyle={{color: 'white'}}
        dateNameStyle={{color: 'white'}}
        highlightDateContainerStyle={{backgroundColor: '#fff'}}
        highlightDateNumberStyle={{color: '#000'}}
        highlightDateNameStyle={{color: '#000'}}
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
        onDateSelected={date => setSelectedDate(date)}
      />

      {filteredData.length > 0 ? (
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: COLORS.RED,
                  marginBottom: 10,
                }}>
                <CustomText title={item.title} />
              </View>
            );
          }}
        />
      ) : (
        <CustomText title="No data" style={{textAlign: 'center'}} />
      )}
    </View>
  );
};

export default AgendaScreen;
