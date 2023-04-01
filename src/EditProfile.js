import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Pressable, Image,Text, Alert, ToastAndroid } from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from './components/CustomButton';
import { COLORS } from './utilities/medicineTab';
import Feather from 'react-native-vector-icons/Feather'
import { darkStyles, lightStyles } from './theme/themeFile';
import { AuthContext } from './AuthContext';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import LoadingScreen from './components/LoadingScreen';
const EditProfile = () => {


  const [avatarSource, setAvatarSource] = useState(null)

  const [uploading, setUploading] = useState(false)
  const [transferred, setTransferred] = useState(0)

  const { isDarkTheme,signUp} = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [filePath,setFilePath] = useState(null)
  const [loading, setLoading] = useState(false);
  const [mobile,setMobile]=useState()

  const currentStyles = isDarkTheme ? darkStyles : lightStyles;
  useEffect(() => {
    const userRef = firestore().collection('users').doc(auth().currentUser.uid);

    userRef.get().then(doc => {
      const userData = doc.data();
      console.log("userdata =====",userData)
      setUserName(userData.userName);
      setEmail(userData.email);
      setFilePath(userData?.filePath)
      setMobile(userData.mobile)
    });
  }, []);

  const handleSubmit = () => {
    setLoading(true);

    const userRef = firestore().collection('users').doc(auth().currentUser.uid);

    userRef.update({
      filePath,
      userName,
      email,
      mobile
    }).then(() => {
      setLoading(false);
      console.log("update successfully !!!")
      ToastAndroid.show('Profle updated uccessfully !!', ToastAndroid.SHORT);
  
    }).catch(error => {
      console.log(error);
      setLoading(false);
    });
  };



  const selectPhotoTapped = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      allowEditing: true,

      storageOptions: {
        skipBackup: true,
      },
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const {uri} = response.assets[0];
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        setUploading(true);

        // setTransferred(0);

        const task = storage().ref(filename).putFile(uploadUri);

        // set progress state
        task.on('state_changed', snapshot => {});
        try {
          await task;
        } catch (e) {
          console.error(e);
        }
        setUploading(false);

        await storage()
          .ref(filename)
          .getDownloadURL()
          .then(downloadURL => {
            console.log('++++++++ photodownloadURL', downloadURL);
            setFilePath(downloadURL);
          });
      }
    });
  };

  return (
    <View style={[styles.container, currentStyles.container]}>
  <View style={[styles.subHeader,currentStyles.container]}>
       <Pressable 
        onPress={selectPhotoTapped} >
        <Image 
      
        source={{uri:filePath?filePath:'https://cdn-icons-png.flaticon.com/512/3177/3177440.png'}}
         style={styles.profileImageStyle}/>
        <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: currentStyles.container.backgroundColor,
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: 20,
              marginLeft: 80,
              marginTop: -35,
              elevation: 5,
            }}>
  
            <Feather name ="camera" size={15} color={currentStyles.container.color}/>
          </View>
          {uploading ? (
            <View style={{}}>
              <LoadingScreen/>
            </View>
          ) : null}
       </Pressable>
      </View>
      

      <Text style={[styles.headingStyle,currentStyles.text]}>Your Information</Text>

      <View style={[styles.inputContainer]}>
 <TextInput style={[styles.inputStyle,currentStyles.text]} value={userName}  onChangeText={(text)=>setUserName(text)} />
      </View>
      <View style={[styles.inputContainer]}>
 <TextInput style={[styles.inputStyle,currentStyles.text]}  value={mobile} onChangeText={(text)=>setMobile(text)} />
      </View>
      <View style={[styles.inputContainer]}>
 <TextInput style={[styles.inputStyle,currentStyles.text]}  value={email} onChangeText={(text)=>setEmail(text)} />
      </View>
      {loading && <LoadingScreen/>}
      <CustomButton onPress={handleSubmit}  title="Update Profile" buttonColor={COLORS.PRIMARY_COLOR}
        buttonStyle={{width:300, alignSelf:'center',marginTop:50 }}
      />
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container:{
    flex:1,
    
  },
  subHeader:{
    flex:0.5,
 
    justifyContent:'center',
    alignItems:'center'
  },
  profileImageStyle:{
    width:120,height:120,
    resizeMode:'cover',
    borderRadius:120/2
  },
  inputContainer:{
    margin:10
  },
  inputStyle:{
    height:50,
    borderColor:'#ddd',
    borderWidth:1,
    paddingLeft:10,
    borderRadius:5,
    fontFamily: 'Poppins-Regular'
  }, headingStyle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:20,
    fontFamily: 'Poppins-Thin'
  },
  

})
