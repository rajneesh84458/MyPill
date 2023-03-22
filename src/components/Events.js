// import React, {useState} from 'react';
// import {View} from 'react-native';
// import {Calendar} from 'react-native-calendars';

// const MarkUnmarkCalendar = () => {
//   const [markedDates, setMarkedDates] = useState({});

//   const onDayPress = day => {
//     const date = day.dateString;
//     if (markedDates[date]) {
//       console.log('marked', markedDates[date]);
//       // Date is already marked, unmark it
//       const {[date]: removed, ...rest} = markedDates;
//       setMarkedDates(rest);
//     } else {
//       // Date is not marked, mark it
//       setMarkedDates({
//         ...markedDates,
//         [date]: {marked: true, selected: true, selectedColor: 'blue'},
//       });
//       console.log('unmarked', markedDates);
//     }
//   };

//   return (
//     <View>
//       <Calendar selected onDayPress={onDayPress} markedDates={markedDates} />
//     </View>
//   );
// };

// export default MarkUnmarkCalendar;

// import React, {useEffect, useState} from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import {getData} from '../src/utilities/asyncstorage';
// import {COLORS} from '../src/utilities/medicineTab';

// const data = [
//   {day: 'Monday', task: 'Do laundry'},
//   {day: 'Tuesday', task: 'Buy groceries'},
//   {day: 'Wednesday', task: 'Clean the house'},
//   {day: 'Thursday', task: 'Go to the gym'},
//   {day: 'Friday', task: 'Watch a movie'},
// ];

// const App = ({route, navigation}) => {
//   const [query, setQuery] = useState('');
//   const [data, setData] = useState([]);
//   const [refreshing, setRefreshing] = React.useState(false);

//   const filteredData = data.filter(item =>
//     item.name.toLowerCase().includes(query.toLowerCase()),
//   );
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     // try {
//     //   const productsArray = await getData('products');

//     //   console.log('+++++ fetchProducts', productsArray);
//     //   if (productsArray) {
//     //     const list = productsArray;
//     //     if (list.length > 0) {
//     //       setData(list);
//     //     }
//     //     setIsLoading(false);
//     //     setRefreshing(false);
//     //     console.log('++++++++++++++++++++++', data);
//     //   }
//     // } catch (error) {
//     //   console.error(error);
//     // }
//     const result = await fetch('https://jsonplaceholder.typicode.com/users');
//     const res2 = await result.json();
//     setData(res2);
//     console.log('data========', data);
//   };
//   return (
//     <View style={{flex: 1}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           height: 40,
//           backgroundColor: '#dddd',
//           margin: 10,
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           paddingHorizontal: 20,
//           borderRadius: 10,
//         }}>
//         <TextInput
//           maxLength={20}
//           style={{
//             letterSpacing: 1,
//             width: 300,
//           }}
//           placeholder="Search by day"
//           onChangeText={text => setQuery(text)}
//         />
//         <Image
//           source={{
//             uri: 'https://cdn-icons-png.flaticon.com/512/2811/2811806.png',
//           }}
//           style={{width: 25, height: 25, resizeMode: 'contain'}}
//         />
//       </View>

//       {filteredData.length > 0 ? (
//         <FlatList
//           data={filteredData}
//           renderItem={({item}) => (
//             <View style={[styles.cardContainer]}>
//               <View style={styles.ImageContainer}>
//                 <Image
//                   source={{uri: item.pillImage}}
//                   style={[styles.imageStyle]}
//                 />
//               </View>

//               <View style={{flexDirection: 'row', padding: 10}}>
//                 <View
//                   style={{
//                     width: 90,
//                     height: 80,
//                     justifyContent: 'flex-start',
//                   }}>
//                   <Text style={{paddingVertical: 10, fontSize: 16}}>
//                     {item.name}
//                   </Text>
//                   {/* <Text>{item.pillType}</Text> */}
//                 </View>

//                 <View
//                   style={{
//                     width: 130,
//                     height: 80,

//                     alignItems: 'flex-end',
//                     justifyContent: 'center',
//                     marginLeft: 10,
//                     padding: 10,
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 20,
//                       paddingVertical: 10,
//                     }}>
//                     {/* {item.notificationTime} */}test
//                   </Text>
//                   <Text style={{fontSize: 16}}>
//                     {/* {item.foodStatus}  */}test
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           )}
//           keyExtractor={item => item.day}
//         />
//       ) : (
//         <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
//           Data not found
//         </Text>
//       )}
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   tab: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     width: 110,
//     height: 50,
//     borderRadius: 10,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#000',
//     marginHorizontal: 5,
//     marginVertical: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   selectedTab: {
//     backgroundColor: '#03203C',
//     borderColor: '#03203C',
//     borderWidth: 1,
//   },
//   cardContainer: {
//     width: 350,
//     height: 120,
//     marginHorizontal: 20,
//     borderRadius: 10,
//     justifyContent: 'center',
//     borderColor: 'pink',
//     borderWidth: 1,
//     flexDirection: 'row',
//     marginVertical: 10,
//   },
//   ImageContainer: {
//     width: 80,
//     height: 80,
//     padding: 5,
//     marginTop: 15,
//     marginHorizontal: 10,
//     borderRadius: 80 / 2,
//   },
//   imageStyle: {
//     width: 70,
//     height: 70,
//     resizeMode: 'center',
//   },
//   pastDate: {
//     backgroundColor: '#ddd',
//     // any other styles you want to apply
//   },
//   touchableOpacityStyle: {
//     position: 'absolute',
//     width: 100,
//     height: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     right: 20,
//     bottom: 20,
//     backgroundColor: COLORS.REDDISH,
//     borderRadius: 30,
//   },

//   centeredView: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',

//     backgroundColor: 'rgba(0,0,0,0.8)',
//   },
//   modalView: {
//     margin: 20,
//     width: 300,
//     height: 200,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//   },
//   button: {
//     padding: 10,
//     width: 200,
//     // elevation: 1,
//     marginVertical: 40,
//   },

//   textStyle: {
//     color: '#000',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center',
//   },
// });

import moment from 'moment';
import React, {useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

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
              <View style={{flex: 1, backgroundColor: 'red', marginBottom: 10}}>
                <Text>{item.title}</Text>
              </View>
            );
          }}
        />
      ) : (
        <Text style={{textAlign: 'center'}}>Not data </Text>
      )}
    </View>
  );
};

export default AgendaScreen;
