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
  Pressable,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS} from './utilities/medicineTab';
import {clearData, getData} from './utilities/asyncstorage';
import CalendarStrip from 'react-native-calendar-strip';
import {AuthContext} from './AuthContext';
import { darkTheme, lightTheme } from './theme/themeFile';
import CustomButton from './components/CustomButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firestore from '@react-native-firebase/firestore';
import LoadingScreen from './components/LoadingScreen';
import { useIsFocused } from '@react-navigation/native';

const HomePage = ({route, navigation}) => {
  const isFocused = useIsFocused()
  const [selectedDate, setSelectedDate] = useState(moment());
  const [docid,setDocid]=useState(null)
  const {signIn, isLoading, isDarkTheme,setIsLoading} = useContext(AuthContext);

  console.log('routeparams', route.params);

  const theme = isDarkTheme ? darkTheme : lightTheme;


  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const {user} = useContext(AuthContext);
  console.log('Getting usr', user.uid);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    fetchMedicines()
  }, [refreshing]);
  


  // const fetchProducts = async () => {
  //   try {
  //     const productsArray = await getData('products');

  //     console.log('+++++ fetchProducts', productsArray);
  //     if (productsArray) {
  //       const list = productsArray;
  //       if (list.length > 0) {
  //         setData(list);
  //       }
  //       setIsLoading(false);
  //       setRefreshing(false);
  //       console.log('++++++++++++++++++++++', data);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchProducts();
  // }, [route.params]);



const fetchMedicines =()=>{
  setIsLoading(true)
  const userId = user.uid; // Replace with the user ID you want to fetch

const usersRef = firestore().collection('userMedicine');

const query = usersRef.where('uid', '==', userId);

query.get().then(querySnapshot => {
  const newData = [];
  querySnapshot.forEach((doc) => {
    setDocid(doc.id)
          newData.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setData(newData);
        setIsLoading(false)
        setRefreshing(false);
        console.log("=============",data)
  
})
}
  
  useEffect(() => {
    const unsubscribe = fetchMedicines()
    return unsubscribe;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);
  
  const deleteTile = () => {
    Alert.alert('Delete !!', 'Do you want it delete it ?.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: ()=>handleDelete()},
    ]);
    
  };

  const handleDelete =  () => {
    firestore()
  .collection('userMedicine')
  .doc(docid)
  .delete()
  .then(() => {
    ToastAndroid.show('Deleted Successfully !!', ToastAndroid.SHORT);
  });
  fetchMedicines()
  };
 
  
  const filteredData = data.filter(
    item => item.notificationDate === selectedDate?.format('YYYY-MM-DD'),
  );


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
      
      
   

      {   isLoading ? <LoadingScreen/>
      : filteredData.length > 0 ? (
        
        <FlatList
         style={{flex:1}}
          data={filteredData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity onPress={()=>deleteTile()} style={[styles.cardContainer,{backgroundColor:theme.backgroundColor}]}>
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
                      width: 140,
                      height: 80,

                      alignItems: 'flex-end',
                
                      // marginLeft: 20,
                      // backgroundColor:'red'
                     
                    
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
                    style={{width:30,height:30,marginTop:10,resizeMode:'center',padding:5}}
                  />
                    {/* <Text style={{fontSize: 12, paddingVertical:10,color:theme.textColor, fontFamily: 'Poppins-Regular'}}>{item.pillType} </Text> */}
                    
                  </View>
                  
                </View>
              </TouchableOpacity>
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
      
  
      <CustomButton buttonColor={COLORS.PRIMARY_COLOR}  onPress={() => navigation.navigate('Add Pill')}
      title="Add Pill" buttonStyle={styles.touchableOpacityStyle}/>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container:{
   flex:1,
   
   
  },
  
  touchableOpacityStyle: {
    position: 'absolute',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 20,
    borderRadius:50
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


