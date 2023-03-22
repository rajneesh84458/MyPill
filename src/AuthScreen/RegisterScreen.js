import React, {useState, createRef, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {handlePhotoClicker} from '../globalFunction/globalFile';
import {COLORS} from '../utilities/medicineTab';
import CustomButton from '../components/CustomButton';
import LoadingScreen from '../components/LoadingScreen';
import {setHeight, setWidth} from '../components/globalDimension';

import {AuthContext} from '../AuthContext';
import {darkTheme, lightTheme} from '../theme/themeFile';

const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassowrd, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [showVisiblity, setShowVisiblity] = useState(false);
  const [showVisiblityConfirm, setShowVisiblityConfirm] = useState(false);
  const [errortext, setErrortext] = useState('');
  const [loading, setLoading] = useState(false);
  const [filePath, setFilePath] = useState('');
  const [userToken, setUserToken] = useState('');
  const [uploading, setUploading] = useState(false);
  const emailInputRef = createRef();
  const passwordInputRef = createRef();
  const confirmPasswordRef = createRef();

  const setPasswordVisibility = () => {
    setShowVisiblity(!showVisiblity);
  };
  const setConfirmPasswordVisible = () => {
    setShowVisiblityConfirm(!showVisiblityConfirm);
  };

  // const handleSubmitButton = async () => {
  //   setErrortext('');
  //   if (!userName) return alert('Please fill Name');
  //   if (!email) return alert('Please fill Email');
  //   if (!userPassword) return alert('Please fill Address');
  //   if (!confirmPasswordRef) return alert('Please fill Address');
  //   if (userPassword != confirmPassowrd)
  //     return alert('Password is not matched');
  //   setLoading(true);
  //   auth()
  //     .createUserWithEmailAndPassword(email, userPassword)
  //     .then(user => {
  //       console.log('Registration Successful. Please Login to proceed');
  //       console.log(user);
  //       if (user) {
  //         auth().currentUser.updateProfile({
  //           displayName: userName,
  //           photoURL: filePath,
  //           token: userToken,
  //         });
  //         AsyncStorage.setItem('registeredUsers', JSON.stringify(user));
  //         console.log('++++++++++++++++', user.user.uid);
  //         console.log('====', user.user);
  //         firestore()
  //           .collection('users')
  //           .doc(user.uid)
  //           .set({
  //             name: userName,
  //             email: user.user.email,
  //             uid: user.user.uid,
  //             mobile: mobile,
  //             pic: filePath,
  //             token: userToken,
  //           })

  //           .then(() => {
  //             navigation.replace('Login');
  //             setLoading(false);
  //           })
  //           .catch(error => {
  //             alert(error);
  //             console.error(error);
  //           });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       if (error.code === 'auth/email-already-in-use') {
  //         setErrortext('That email address is already in use!');
  //         setLoading(false);
  //       } else {
  //         setErrortext(error.message);
  //       }
  //     });
  // };

  // const selectPhotoTapped = () => {
  //   const options = {
  //     quality: 1.0,
  //     maxWidth: 500,
  //     maxHeight: 500,
  //     allowEditing: true,

  //     storageOptions: {
  //       skipBackup: true,
  //     },
  //   };

  //   launchImageLibrary(options, async response => {
  //     if (response.didCancel) {
  //       console.log('User cancelled photo picker');
  //     } else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     } else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     } else {
  //       const {uri} = response.assets[0];
  //       const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //       const uploadUri =
  //         Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
  //       setUploading(true);

  //       // setTransferred(0);

  //       const task = storage().ref(filename).putFile(uploadUri);

  //       // set progress state
  //       task.on('state_changed', snapshot => {});
  //       try {
  //         await task;
  //       } catch (e) {
  //         console.error(e);
  //       }
  //       setUploading(false);

  //       await storage()
  //         .ref(filename)
  //         .getDownloadURL()
  //         .then(downloadURL => {
  //           console.log('++++++++photodownloadURL', downloadURL);
  //           setFilePath(downloadURL);
  //         });
  //     }
  //   });
  // };

  const {signUp, isLoading, isDarkTheme} = useContext(AuthContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const handleRegister = () => {
    if (userName === '' || mobile === '' || email === '' || password === '') {
      Alert.alert('Error', 'All fields are required.');
    } else if (!/^[A-Za-z\s]+$/.test(userName)) {
      Alert.alert('Error', 'Name can only contain letters and spaces.');
    } else if (!/^[0-9]+$/.test(mobile)) {
      Alert.alert('Error', 'Phone number can only contain digits.');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Error', 'Invalid email address.');
    } else if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
    } else {
      signUp(email, password, userName, mobile, filePath);
    }
  };
  const setFilePicker = () => {
    handlePhotoClicker(setFilePath);
    // uploadImage(filePath);
  };

  // const uploadImage = async filePath => {
  //   const filename = filePath.substring(filePath.lastIndexOf('/') + 1);
  //   const uploadUri =
  //     Platform.OS === 'ios' ? filePath.replace('file://', '') : filePath;
  //   setUploading(true);

  //   // setTransferred(0);

  //   const task = storage().ref(filename).putFile(uploadUri);

  //   // set progress state
  //   task.on('state_changed', snapshot => {});
  //   try {
  //     await task;
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   setUploading(false);

  //   await storage()
  //     .ref(filename)
  //     .getDownloadURL()
  //     .then(downloadURL => {
  //       console.log('++++++++photodownloadURL', downloadURL);
  //       setFilePath(downloadURL);
  //     });
  // };

  const showImage = () => {
    console.log('+++++++++=', filePath);

    return (
      <Image
        source={{
          uri: filePath
            ? filePath
            : 'https://cdn-icons-png.flaticon.com/512/1828/1828817.png',
        }}
        style={{
          // borderWidth: 1,
          // backgroundColor: '#dddd',
          width: filePath ? 100 : 20,
          height: filePath ? 100 : 20,
          resizeMode: 'contain',
          borderRadius: 50,
        }}
      />
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <View
          style={{
            height: setHeight(30),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.backgroundColor,
          }}>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderColor: theme.borderColor,
              borderWidth: 0.8,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={setFilePicker}>
            {showImage()}
          </TouchableOpacity>

          {uploading ? (
            <View style={{}}>
              <LoadingScreen />
            </View>
          ) : (
            <View
              style={{
                marginTop: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.textColor,
                  fontFamily: 'Poppins-Regular',
                  paddingLeft: 5,
                }}>
                Add Picture
              </Text>
            </View>
          )}
        </View>

        <KeyboardAvoidingView enabled>
          <View style={styles.sectionStyle}>
            <TextInput
              style={[styles.inputStyle, {color: theme.textColor}]}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
            <FontAwesome
              style={styles.touachableButton}
              name="user"
              size={20}
              color={COLORS.PRIMARY_COLOR}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              value={mobile}
              style={[styles.inputStyle, {color: theme.textColor}]}
              onChangeText={text => setMobile(text)}
              underlineColorAndroid="#f000"
              placeholder="Enter Mobile Number"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="number-pad"
              returnKeyType="next"
              // onSubmitEditing={() =>
              //   emailInputRef.current && emailInputRef.current.focus()
              // }
              blurOnSubmit={false}
            />
            <Ionicons
              style={styles.touachableButton}
              name="call"
              size={20}
              color={COLORS.PRIMARY_COLOR}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={[styles.inputStyle, {color: theme.textColor}]}
              onChangeText={email => setEmail(email)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              autoCapitalize="none"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
            <Ionicons
              style={styles.touachableButton}
              name="mail"
              size={20}
              color={COLORS.PRIMARY_COLOR}
            />
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={[styles.inputStyle, {color: theme.textColor}]}
              onChangeText={password => setPassword(password)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={!showVisiblity}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.touachableButton}
              onPress={setPasswordVisibility}>
              {/* <Image
                style={styles.buttonImage}
                source={{
                  uri: showVisiblity
                    ? 'https://cdn-icons-png.flaticon.com/512/159/159604.png'
                    : 'https://cdn-icons-png.flaticon.com/512/2355/2355322.png',
                }}
              /> */}

              {showVisiblity ? (
                <Ionicons name="eye" size={20} color={COLORS.PRIMARY_COLOR} />
              ) : (
                <Ionicons
                  name="eye-off"
                  size={20}
                  color={COLORS.PRIMARY_COLOR}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.sectionStyle}>
            <TextInput
              style={[styles.inputStyle, {color: theme.textColor}]}
              onChangeText={confirmPassowrd =>
                setConfirmPassword(confirmPassowrd)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Confirm Password"
              placeholderTextColor="#8b9cb5"
              ref={confirmPasswordRef}
              returnKeyType="next"
              secureTextEntry={!showVisiblityConfirm}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.touachableButton}
              onPress={setConfirmPasswordVisible}>
              {/* <Image
                style={styles.buttonImage}
                source={{
                  uri: showVisiblityConfirm
                    ? 'https://cdn-icons-png.flaticon.com/512/159/159604.png'
                    : 'https://cdn-icons-png.flaticon.com/512/2355/2355322.png',
                }}
              /> */}
              {showVisiblityConfirm ? (
                <Ionicons name="eye" size={20} color={COLORS.PRIMARY_COLOR} />
              ) : (
                <Ionicons
                  name="eye-off"
                  size={20}
                  color={COLORS.PRIMARY_COLOR}
                />
              )}
            </TouchableOpacity>
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}

          <View
            style={{
              marginVertical: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <CustomButton title="Register" onPress={handleRegister} />
            )}
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionStyle: {
    // flexDirection: 'row',
    // height: setHeight(7),
    marginBottom: 15,
    marginLeft: 35,
    marginRight: 35,

    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    width: setWidth(90),
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    fontFamily: 'Poppins-Regular',
    borderRadius: 10,
    backgroundColor: COLORS.LIGHT_BLUE,
  },
  errorTextStyle: {
    color: COLORS.RED,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  touachableButton: {
    position: 'absolute',
    right: 10,
    height: 20,
    width: 20,
  },
  buttonImage: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
});
