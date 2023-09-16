import {
  Pressable,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
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
import {AuthContext} from '../AuthContext';
import {darkTheme, lightTheme} from '../theme/themeFile';
import CustomButton from './CustomButton';
import KeepAwake from 'react-native-keep-awake';
import {saveDataToFirestore} from '../globalFunction/globalFile';
import CustomTextInput from './CustomTextInput';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import LoadingScreen from './LoadingScreen';
import {appStyle, setHeight, setWidth} from '../utilities/helper';
import Icon, {IconType} from './IconComponent';

const DUMMY_IMAGE = 'https://cdn-icons-png.flaticon.com/512/807/807165.png';
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
  const [dumyLoading, setLoading] = useState(true);
  const {isDarkTheme} = useContext(AuthContext);
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

  const callingSometime = () => {
    if (dumyLoading) {
      if (!pillName) {
        return Alert.alert('Enter Pill Name');
      }
      setLoading(false);
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
    if (Platform.OS === 'android') {
      PushNotification.localNotificationSchedule({
        channelId: 'default',
        title: pillName,
        message: `Hello ${user.displayName} This is your Medicine Time`,
        picture: imageUri || DUMMY_IMAGE,
        date: new Date(selectedDate),
        smallIcon: pillImage,
        allowWhileIdle: true,
        repeatType: 'day',
        timeStatus: timeStatus,
        repeatTime: 1,
      });
      KeepAwake.activate();
    } else {
      console.log('ios platform');
    }
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
    let chosenDate = moment(selectedDate).format('YYYY-MM-DD');
    let chosenTime = moment(selectedDate).format('h:mm A');
    const products = {
      id: uuid.v4(),
      name: pillName,
      foodStatus: foodStatus,
      timeStatus: timeStatus,
      pillType: pillType,
      pillImage: pillImage || DUMMY_IMAGE,
      choosenImage: imageUri || DUMMY_IMAGE,
      notificationDate: chosenDate,
      day: weekday,
      notifyTime: chosenTime,
      uid: user.uid,
    };

    handleScheduleNotify();
    saveDataToFirestore(products);
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

  const selectedTime = moment(selectedDate).format('h:mm A');
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[appStyle.container, {backgroundColor: theme.backgroundColor}]}>
      <Icon
        onPress={() => navigation.goBack()}
        name="chevron-back"
        size={30}
        color={theme.borderColor}
        type={IconType.Ionicons}
        style={{padding: 10}}
      />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={takeImage} style={styles.imgContainer}>
          <CustomImage
            source={{
              uri: imageUri || DUMMY_IMAGE,
            }}
            style={styles.img}
          />
        </TouchableOpacity>
        <CustomText
          title="Add you medicine photo"
          style={[styles.title, {color: theme.textColor}]}
        />
      </View>
      <View style={{height: setHeight(10), marginTop: 20}}>
        <CustomText
          title="Enter the name of your medicine"
          style={[styles.headingStyle, {color: theme.textColor}]}
        />
        <CustomTextInput
          placeholderTextColor="#ccc"
          placeholder="Enter Pill Name"
          value={pillName}
          onChangeText={setPillName}
          style={{
            color: theme.textColor,
            backgroundColor: theme.backgroundColor,
          }}
        />
      </View>

      {/* food and Pills */}
      <View style={{height: setHeight(15)}}>
        <CustomText
          title="When would you take your dose ?"
          style={[styles.headingStyle, {color: theme.textColor}]}
        />
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
                        : COLORS.GREY,
                  },
                ]}>
                <CustomText
                  title={item.intake}
                  style={{
                    color:
                      foodStatus === item.intake ? COLORS.WHITE : COLORS.BLACK,
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <CustomText
          title="Choose a medicine form"
          style={[styles.headingStyle, {color: theme.textColor}]}
        />
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
                        : COLORS.GREY,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                  }}>
                  <CustomImage
                    source={{uri: item.tabImage}}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: 'cover',
                      tintColor: pillImage === item.tabImage ? '#fff' : '#000',
                    }}
                  />
                  <CustomText
                    title={item.tabLabel}
                    style={{
                      fontSize: 12,
                      paddingVertical: 10,
                      color:
                        pillType === item.tabLabel
                          ? COLORS.WHITE
                          : COLORS.BLACK,
                    }}
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/* schedule time  */}
      <CustomText
        title="Choose a desired Time"
        style={[styles.headingStyle, {color: theme.textColor}]}
      />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {timeOfDay.map(item => {
          return (
            <Pressable
              key={item.id}
              onPress={() => selectTimeStatus(item)}
              style={[
                styles.foodPillStyle,
                {
                  backgroundColor:
                    timeStatus === item.intakeTime
                      ? COLORS.PRIMARY_COLOR
                      : COLORS.GREY,
                },
              ]}>
              <CustomText
                title={item.intakeTime}
                style={{
                  color:
                    timeStatus === item.intakeTime
                      ? COLORS.WHITE
                      : COLORS.BLACK,
                  fontSize: 12,
                  fontWeight: 'bold',
                }}
              />
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

      <View style={{height: setHeight(15)}}>
        <CustomText
          title="Notification"
          style={[styles.headingStyle, {color: theme.textColor}]}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Pressable style={styles.timeStyle}>
            <Icon
              name="notifications"
              type={IconType.Ionicons}
              size={26}
              color={COLORS.BLACK}
            />

            <CustomText
              title={selectedTime}
              style={{fontSize: 20, paddingHorizontal: 10}}
            />
            <CustomText
              title={selectedDate.toDateString()}
              style={{textAlign: 'right', paddingLeft: 30}}
            />
          </Pressable>
          <Pressable onPress={showDatePicker} style={styles.plusBtn}>
            <CustomText title="+" style={{fontSize: 20}} />
          </Pressable>
        </View>
      </View>
      {!dumyLoading && <LoadingScreen />}
      <CustomButton
        buttonColor={COLORS.PRIMARY_COLOR}
        title="Add Remainder"
        buttonStyle={styles.addBtn}
        onPress={callingSometime}
        textStyle={{fontSize: 20}}
      />
    </ScrollView>
  );
};

export default AddPill;

const styles = StyleSheet.create({
  amountContainer: {
    width: 120,
    height: 30,
    borderRadius: 2,
    backgroundColor: COLORS.GREY,
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
  foodPillStyle: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 5,
  },
  tabbarContainer: {
    flexDirection: 'row',
  },
  tabText: {
    fontSize: 14,
  },
  plusBtn: {
    width: 60,
    height: 60,
    backgroundColor: COLORS.GREY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 10,
  },
  timeStyle: {
    margin: 10,
    flexDirection: 'row',
    height: 60,
    backgroundColor: COLORS.GREY,
    alignItems: 'center',
    width: setWidth(75),
    paddingHorizontal: 10,
  },
  imgContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: '#f4f4f4',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    resizeMode: 'contain',
  },
  addBtn: {
    width: setWidth(85),
    alignSelf: 'center',
    borderRadius: 6,
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    marginVertical: 5,
  },
});
