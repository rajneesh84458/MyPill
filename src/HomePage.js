import moment from 'moment';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from './utilities/medicineTab';
import {getData} from './utilities/asyncstorage';
import CalendarStrip from 'react-native-calendar-strip';
import {AuthContext} from './AuthContext';
import { darkTheme, lightTheme } from './theme/themeFile';

const HomePage = ({route, navigation}) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const {signIn, isLoading, isDarkTheme,setIsLoading} = useContext(AuthContext);

  console.log('routeparams', route.params);

  const theme = isDarkTheme ? darkTheme : lightTheme;


  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const {user} = useContext(AuthContext);
  console.log('Getting usr', user);
  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    if (data.length < 10) {
      try {
        const productsArray = await AsyncStorage.getItem('products');

        console.log('+++++ fetchProducts', productsArray);
        if (productsArray) {
          const list = JSON.parse(productsArray);
          if (list.length > 0) {
            setData(list);
            setIsLoading(false);
            setRefreshing(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      ToastAndroid.show('No more new data available', ToastAndroid.SHORT);
      setRefreshing(false);
    }
  }, [refreshing]);
  const filteredData = data.filter(
    item => item.notificationDate === selectedDate?.format('YYYY-MM-DD'),
  );
  console.log('filteredData', filteredData);

  const fetchProducts = async () => {
    try {
      const productsArray = await getData('products');

      console.log('+++++ fetchProducts', productsArray);
      if (productsArray) {
        const list = productsArray;
        if (list.length > 0) {
          setData(list);
        }
        setIsLoading(false);
        setRefreshing(false);
        console.log('++++++++++++++++++++++', data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [route.params]);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View
        style={{
          // backgroundColor: theme.backgroundColor,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding:8,
          flex:0.2,
          // backgroundColor:'red'
         
        }}>
        <View>
          <Text style={[styles.headerTextStyle,{color:theme.textColor}]}>Hello,</Text>
          <Text style={[styles.headerTextStyle,{color:theme.textColor}]}>{user.displayName}</Text>
        </View>

        <TouchableOpacity
          // onPress={() => setModalVisible(true)}
          onPress={() => navigation.navigate('Profile')}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            
          }}>
          <Image
            source={{
              uri: user?.photoURL
                ? user?.photoURL
                : 'https://cdn-icons-png.flaticon.com/512/3237/3237472.png',
            }}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: 'cover',
            
            }}
          />
        </TouchableOpacity>
      </View>

      <CalendarStrip
        style={{backgroundColor:theme.backgroundColor,flex:0.2}}
        selectedDate={selectedDate}
        calendarHeaderStyle={{color:theme.textColor, fontSize: 20,fontFamily: 'Poppins-Regular',}}
        calendarColor={COLORS.REDDISH}
        dateNumberStyle={{color:theme.textColor}}
        dateNameStyle={{color:theme.textColor}}
        highlightDateContainerStyle={{backgroundColor:COLORS.PRIMARY_COLOR}}
        highlightDateNumberStyle={{color:theme.textColor}}
        highlightDateNameStyle={{color:theme.textColor,borderRadius:20}}
        disabledDateNameStyle={{color: 'grey'}}
        disabledDateNumberStyle={{color: 'grey'}}
        onDateSelected={date => setSelectedDate(date)}
        //  minDate={selectedDate}
      />

      {filteredData.length > 0 ? (
        <FlatList
         style={{flex:1}}
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <View style={[styles.cardContainer,{backgroundColor:theme.backgroundColor}]}>
                <View style={styles.ImageContainer}>
                  <Image
                    source={{uri: item.choosenImage}}
                    style={[styles.imageStyle]}
                  />
                </View>

                <View style={{flexDirection: 'row', padding: 10}}>
                  <View
                    style={{
                    width:120,
                   
             
                    }}>
                    <Text style={{paddingVertical: 10, fontSize: 16,color:theme.textColor, fontFamily: 'Poppins-Regular'}}>
                      {item.name}
                    </Text>
                    <Text style={{color:theme.textColor,fontSize:12, fontFamily: 'Poppins-Regular'}}>{item.foodStatus}</Text>
                    <Text style={{color:theme.textColor,fontSize:12, fontFamily: 'Poppins-Regular'}}>{item.timeStatus}</Text>
                  </View>

                  <View
                    style={{
                      width: 130,
                      height: 80,

                      alignItems: 'flex-end',
                
                      marginLeft: 10,
                     
                    
                    }}>
                    <Text
                      style={{
                        fontSize:20,
                        // paddingVertical: 10,
                        color:theme.textColor
                      }}>
                      {item.notifyTime}
                    </Text>
                    <Image
                    source={{uri: item.pillImage}}
                    style={[[styles.imageStyle,{width:30,height:30,resizeMode:'contain', paddingVertical:5}]]}
                  />
                    <Text style={{fontSize: 12, paddingVertical:10,color:theme.textColor, fontFamily: 'Poppins-Regular'}}>{item.pillType} </Text>
                  </View>
                </View>
              </View>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={{ flex:1, justifyContent:'center',alignItems:'center',}}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/404-error-with-tired-person-concept-illustration_114360-7969.jpg?w=1060&t=st=1677839009~exp=1677839609~hmac=63fc170aae3c2a11db8d87446ce30f48cab4529e36526974011783c152d3ecce',
            }}
            style={{width: 250, height: 250, resizeMode: 'cover',borderRadius:20}}
          />
          <Text style={{textAlign: 'center', fontWeight: 'bold',color:theme.textColor,marginTop:20}}>
            Data not found !!
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('Add Pill')}
        style={styles.touchableOpacityStyle}>
        <Text style={{color: '#fff',fontFamily:'NunitoSans-Bold'}}>AddPill</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container:{
   flex:1,
   
   
  },
  
  cardContainer: {

    height: 100,
    marginHorizontal: 10,
   
    justifyContent: 'center',
    borderColor: '#ddd',
    borderWidth: 0.5,
    flexDirection: 'row',
    marginVertical:5,
    
  },
  ImageContainer: {
    width: 60,
    height: 60,
    // padding: 5,
    marginTop: 15,
    marginHorizontal: 10,
    borderRadius: 60 / 2,
   
  },
  imageStyle: {
    width: 70,
    height: 70,
    resizeMode: 'center',
    borderRadius:35
    // backgroundColor: 'red',
  },
  

  
  button: {
    padding: 10,
    width: 200,
    // elevation: 1,
    marginVertical: 40,
  },

  textStyle: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
 

  headerTextStyle:{fontSize: 20, color: '#000', fontFamily: 'Poppins-Regular',}

});


