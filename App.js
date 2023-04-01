
import React, {useEffect, } from 'react';
import AppNav from './src/AppNav';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './src/AuthContext';

const App = () => {
  useEffect(() => {
     SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
    
      <AppNav />
    </AuthProvider>
  );
};

export default App;


// import React, {useState,useEffect} from 'react'
// import {View, StyleSheet, Image, Text, TouchableOpacity, SafeAreaView, Alert, Platform} from 'react-native'
// import storage from '@react-native-firebase/storage';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
// import SplashScreen from 'react-native-splash-screen';
// import LoadingScreen from './src/components/LoadingScreen';
// import { setHeight } from './src/components/globalDimension';

// const App = () => {
//   const [imageData, setImageData] = useState(null)
//   const [uploading, setUploading] = useState(false) 

//   useEffect(() => {
//          SplashScreen.hide();
//       }, []);
 
// // App.js
// const pickImage = async () => {
  
  
// await launchImageLibrary({mediaType:'photo'},(response)=>{
//   console.log("++++++++++++++++++result",response)
//   setImageData(response)
//   console.log("imageData======",imageData)

// })



// }

// const uploadImage = async () =>{
//   setUploading(true)
//   const reference = storage().ref(imageData.assets[0].fileName);
//   const pathToFile = imageData.assets[0].uri
//   await reference.putFile(pathToFile)
//   const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();
//   console.log("url========",url)
//   Alert.alert('alert success')
//   setUploading(false)
// }

// const selectPhotoTapped = () => {
//     const options = {
//       quality: 1.0,
//       maxWidth: 500,
//       maxHeight: 500,
//       allowEditing: true,

//       storageOptions: {
//         skipBackup: true,
//       },
//     };

//     launchImageLibrary(options, async response => {
//       if (response.didCancel) {
//         console.log('User cancelled photo picker');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         const uri = response.assets[0].uri;
//         const filename = uri.substring(uri.lastIndexOf('/') + 1);
//         const uploadUri =
//           Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//         setUploading(true);

//         // setTransferred(0);

//         const task = storage().ref(filename).putFile(uploadUri);

//         // set progress state
//         task.on('state_changed', snapshot => {});
//         try {
//           await task;
//         } catch (e) {
//           console.error(e);
//         }
//         setUploading(false);

//         await storage()
//           .ref(filename)
//           .getDownloadURL()
//           .then(downloadURL => {
//             console.log('++++++++photodownloadURL', downloadURL);
//             setImageData(downloadURL);
//           });
//       }
//     });
//   };

//   return (
//     <SafeAreaView style={{flex:1,}}>
//   <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
//     {/* <Text style={styles.btnText}>Pick an Image</Text>  */}
//   </TouchableOpacity> 
//   <TouchableOpacity  onPress={selectPhotoTapped} style={{
             
//             // height: setHeight(20),
//             width:100,height:100,
//              backgroundColor: 'red',
//             marginVertical: 10,
//             marginHorizontal: 10,
//             justifyContent:'center',alignItems:'center',
//             borderRadius:100/2
//           }}>
//    {imageData  !== null ? <Image source={{uri: imageData}} style={{
//           backgroundColor: '#dddd',
//           width: 100,
//           height: 100,
//           resizeMode: 'contain',
//           borderRadius: 50,
//         }}/>: null}
//    {uploading ? (
//             <View style={{}}>
//               <LoadingScreen />
//             </View>
//           ) : (
//             <View style={{justifyContent: 'center'}}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#000',
//                   fontFamily: 'Poppins-Regular',
//                   paddingLeft: 5,
//                 }}>
//                 Add Picture
//               </Text>
//             </View>
//           )}
 
 
//   </TouchableOpacity> 


//   <TouchableOpacity style={{marginTop:20}} onPress={uploadImage}>
//       <Text style={styles.btnText}>Upload Image</Text> 
//   </TouchableOpacity> 
 
// </SafeAreaView>
//   )
// }

// export default App

// const styles = StyleSheet.create({})


