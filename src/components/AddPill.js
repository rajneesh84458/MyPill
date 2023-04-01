import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useId, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PushNotification, {Importance} from 'react-native-push-notification';
import {
  COLORS,
  foodStatusList,
  tabData,
  timeOfDay,
} from '../utilities/medicineTab';
import ImagePicker from 'react-native-image-crop-picker';
import uuid from 'react-native-uuid';
import moment from 'moment';
import { AuthContext } from '../AuthContext';
import { darkTheme, lightTheme } from '../theme/themeFile';
import CustomButton from './CustomButton';
import KeepAwake from 'react-native-keep-awake';
import { saveDataToFirestore, saveToFireStore } from '../globalFunction/globalFile';



const AddPill = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const {user} = useContext(AuthContext);
  const [pillName, setPillName] = useState('');
  const [foodStatus, setFoodStatus] = useState('');
  const [timeStatus, setTimeStatus] = useState('');
  const [pillType, setPillType] = useState('');
  const [pillImage, setPillImage] = useState('');
 const [dumyLoading,setLoading]=useState(true)
  const { isLoading, isDarkTheme,setIsLoading} = useContext(AuthContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  const selectedPill = item => {
    console.log('item+++++', item);
    const {tabImage, tabLabel} = item;
    setPillType(tabLabel);
    setPillImage(tabImage);
  };

  const selectFoodStatus = item => {
    setFoodStatus(item.intake);
  };
  const selectTimeStatus = item => {
    setTimeStatus(item.intakeTime);
  };

  useEffect(() => {
    createChannels();
  }, []);

  const takeImage = () => {
    const title = 'Error title..';
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image.path);
        setImageUri(image.path);
      })

      .catch(e => Alert.alert(title, e.message));
    // .finally(close);
  };

  // const addNewProduct = product => {
  //   console.log('product', product);
  //   addProducts(product);
  //   setProducts([...products, product]);

  //   handleScheduleNotify();
  //   navigation.goBack();
  //   console.log('Schedule Successfully');
  // };

  const callingSometime = () => {
    if (dumyLoading) {
        if(!pillName){
          return Alert.alert('Enter Pill Name')
        }
      setLoading(false)
    }
    setTimeout(() => {
      addProducts();
    }, 2000);
  };

  //  Push Notification...

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: 'default',
        channelName: 'Test',
        soundName: 'adventure.mp3',
        importance: Importance.HIGH,
        vibrate: true,

      },
      created => console.log(`createChannel returned '${created}'`),
    );
  };
  // const handleLocalNotification = () => {
  //   PushNotification.localNotification({
  //     channelId: 'default',
  //     title: 'Rajneesh notif',
  //     message: 'Dus ka Dum !!!',

  //     repeatType: 'day',
  //     repeatTime: '2',
  //     largeIcon: 'ic_launcher',
  //   });
  // };

  const handleScheduleNotify = () => {
     if(Platform.OS =='android'){
      PushNotification.localNotificationSchedule({
        channelId: 'default',
        title: pillName,
        message: `Hello ${user.displayName} This is your Medicine Time`,
        picture:
          imageUri || 'https://cdn-icons-png.flaticon.com/512/807/807165.png',
        date: new Date(selectedDate),
        smallIcon: pillImage,
      
        allowWhileIdle: true,
  
        repeatType: 'day',
        timeStatus: timeStatus,
        repeatTime: 1,
      });
      KeepAwake.activate();
     }

     else {
      console.log("ios platform")
     }
   
    console.log('first', selectedDate);
  };

  const cancelNotifications = () => {
    PushNotification.cancelAllLocalNotifications();
  };

  let dateString = selectedDate;
  let date = new Date(dateString);

  let weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  let weekday = weekdays[date.getDay()];

  const addProducts = async () => {
   
    let chosenDate =moment(selectedDate).format('YYYY-MM-DD')
    let chosenTime = moment(selectedDate).format('h:mm A')
    const products = {
      id: uuid.v4(),
      name: pillName,
      foodStatus: foodStatus,
      timeStatus: timeStatus,
      pillType: pillType,
      pillImage: pillImage || 'https://cdn-icons-png.flaticon.com/512/807/807165.png',
      choosenImage: imageUri || 'https://cdn-icons-png.flaticon.com/512/807/807165.png',
      notificationDate: chosenDate,
      day: weekday,
      notifyTime:chosenTime,
      uid:user.uid
    
    };

    // await storeData('products', products);
    // try {
    //   let productsArray = await AsyncStorage.getItem('products');
    //   if (productsArray) {
    //     productsArray = JSON.parse(productsArray);
    //     productsArray.push(products);
    //     await AsyncStorage.setItem('products', JSON.stringify(productsArray));
    //     console.log('data Saved ');
    //   } else {
    //     productsArray = [];
    //     productsArray.push(products);
    //     await AsyncStorage.setItem('products', JSON.stringify(productsArray));
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    handleScheduleNotify();
    // saveDataToFirestore(uuid.v4(),pillName,foodStatus,timeStatus,pillType,pillImage,imageUri,chosenDate,weekday,chosenTime)
         saveDataToFirestore(products)
    navigation.navigate('Home', products);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
   setSelectedDate(date);
   
    hideDatePicker();
  };

  const selectedTime =moment(selectedDate).format('h:mm A')
  return (
    <ScrollView style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <TouchableOpacity
        style={{margin: 20}}
        onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/130/130882.png',
          }}
          style={{width: 20, height: 20, resizeMode: 'cover',tintColor:theme.borderColor}}
        />
      </TouchableOpacity>
      <View
        style={{
          // backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',

          // padding: 10,
        }}>
        <TouchableOpacity
          onPress={takeImage}
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            borderColor: '#f4f4f4',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: imageUri
                ? imageUri
                : 'https://cdn-icons-png.flaticon.com/512/807/807165.png',
            }}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              resizeMode: 'contain',
             
            }}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 14, marginVertical: 5,color:theme.textColor}}>
          Add you medicine photo
        </Text>
      </View>
      <View style={{height: 100, marginTop: 20}}>
        <Text style={[styles.headingStyle,{color:theme.textColor}]}>Enter the name of your medicine</Text>
        <TextInput
          placeholderTextColor="#ccc"
          placeholder="Enter Pill Name"
          value={pillName}
          onChangeText={text => setPillName(text)}
          style={[styles.pilltabStyle,{color:theme.textColor,backgroundColor:theme.backgroundColor}]}
        />
      </View>

      {/* food and Pills */}
      <View style={{height: 120}}>
      <Text style={[styles.headingStyle,{color:theme.textColor}]}>When would you take your dose ?</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{}}>
          {foodStatusList.map(item => {
            return (
              <Pressable
                key={item.id}
                onPress={() => selectFoodStatus(item)}
                style={[
                  styles.foodPillStyle,
                  {
                    backgroundColor:
                      foodStatus === item.intake
                        ? COLORS.PRIMARY_COLOR
                        : '#f4f4f4',
                  },
                ]}>
                <Text
                  style={{
                    color: foodStatus === item.intake ? 'white' : '#000',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  {item.intake}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View>
      <Text style={[styles.headingStyle,{color:theme.textColor}]}>Choose a medicine form</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={{margin: 10, flexDirection: 'row'}}>
            {tabData.map((item, index) => {
              return (
                <Pressable
                  key={item.id}
                  onPress={() => selectedPill(item)}
                  style={{
                    width: 80,
                    height: 100,
                    backgroundColor:
                      pillType === item.tabLabel
                        ? COLORS.PRIMARY_COLOR
                        : '#f4f4f4',
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                  }}>
                  <Image
                    source={{uri: item.tabImage}}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'cover',
                      tintColor: pillImage === item.tabImage ? '#fff' : '#000',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,

                      paddingVertical: 10,
                      color: pillType === item.tabLabel ? '#fff' : '#000',
                    }}>
                    {item.tabLabel}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/* schedule time  */}
      <Text style={[styles.headingStyle,{color:theme.textColor}]}>Choose a desired Time</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
        {timeOfDay.map(item => {
          return (
            <Pressable
              key={item.id}
              onPress={() => selectTimeStatus(item)}
              // onPress={() => alert(item.intakeTime)}
              style={[
                styles.foodPillStyle,
                {
                  backgroundColor:
                    timeStatus === item.intakeTime
                      ? COLORS.PRIMARY_COLOR
                      : '#f4f4f4',
                },
              ]}>
              <Text
                style={{
                  color: timeStatus === item.intakeTime ? 'white' : '#000',
                  fontSize: 12,
                  fontWeight: 'bold',
                }}>
                {item.intakeTime}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <View style={{height: 120}}>
      <Text style={[styles.headingStyle,{color:theme.textColor}]}>Notification</Text>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            // justifyContent: 'space-between',
          }}>
          <Pressable
            style={{
              margin: 10,
              flexDirection: 'row',
              // width: 200,
              height: 60,
              backgroundColor: '#f4f4f4',
              alignItems: 'center',
              paddingHorizontal:10
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3602/3602123.png',
              }}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'cover',
                marginLeft: 5,
              }}
            /> 

            <Text style={{fontSize: 20, paddingHorizontal: 10}}>
              {selectedTime}
            </Text> 
             <Text style={{textAlign: 'right', paddingLeft: 30}}>
              {selectedDate.toDateString()}
            </Text> 
        </Pressable>

        <Pressable
            onPress={showDatePicker}
            style={{
              width: 60,
              height: 60,
              backgroundColor: '#f4f4f4',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              marginRight: 10,
            }}>
            <Text style={{fontSize: 20}}>+</Text>
          </Pressable>
         
        </View>
      </View>

    
        {/* <Pressable
          onPress={handleLocalNotification}
          style={{
            width: 60,
            height: 60,
            backgroundColor: '#f4f4f4',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 20}}>Test</Text>
        </Pressable> */}
      
      {!dumyLoading && (
          <ActivityIndicator size="small" color={COLORS.PRIMARY_COLOR} />
        ) 
      }

      <CustomButton  buttonColor={COLORS.PRIMARY_COLOR}
        // titleColor="#000"
        title="Add Remainder"
        buttonStyle={{
          width: '80%',
          alignSelf: 'center',
          // borderWidth: 1,
          // borderColor: '#1c1c1c',
          borderRadius: 6,
          marginBottom:20 
        }}
        onPress={callingSometime}
        textStyle={{fontSize: 20}}/>
    </ScrollView>
  );
};

export default AddPill;

const styles = StyleSheet.create({
  container:{
flex:1
  },
  amountContainer: {
    width: 120,
    height: 30,
    borderRadius: 2,
    backgroundColor: '#f4f4f4',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dropDownIconStyle: {
    width: 10,
    height: 10,
    tintColor: '#fff',
    resizeMode: 'cover',
  },
  headingStyle: {
    margin: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  backButtonStyle: {
    width: 50,
    height: 40,

    justifyContent: 'center',

    margin: 20,
  },
  pilltabStyle: {
    width: '95%',
    height: 40,
     backgroundColor: '#f4f4f4',
    marginLeft: 10,
    fontSize: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    
  },
  foodPillStyle: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    marginTop: 10,
    marginHorizontal: 5,
    // borderColor: COLORS.PRIMARY_COLOR,
  },

  tabbarContainer: {
    flexDirection: 'row',
  },
  tab: {
    // width: 85,
    flex: 1,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
  },
});
