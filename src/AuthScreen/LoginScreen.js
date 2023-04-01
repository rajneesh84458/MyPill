import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';


import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CustomButton from '../components/CustomButton';
import {COLORS} from '../utilities/medicineTab';
import {setHeight, setWidth} from '../components/globalDimension';
import {AuthContext} from '../AuthContext';
import {darkTheme, lightTheme} from '../theme/themeFile';
import LoadingScreen from '../components/LoadingScreen';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('arun@test.com');
  const [password, setPassword] = useState('123456');
  const [showVisiblity, setShowVisiblity] = useState(false);
  const [errortext, setErrortext] = useState('');

  const setPasswordVisibility = () => {
    setShowVisiblity(!showVisiblity);
  };

  const {signIn, isLoading, isDarkTheme} = useContext(AuthContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;

  const handleLogin = () => {
    if (email === '') {
      return setErrortext('Email address are required.');
    } else if (password === '' || password.length < 6) {
      return setErrortext(
        password.length < 8
          ? 'Password must be at least 8 characters'
          : 'Password are required.',
      );
    } else {
      signIn(email, password);
    }
  };
  // const userLogin = () => {
  //   setErrortext('');
  //   if (!email) {
  //     alert('Please fill Email');
  //     return;
  //   }
  //   if (!password) {
  //     alert('Please fill Password');
  //     return;
  //   }

  //   setLoading(true);
  //   auth()
  //     .signInWithEmailAndPassword(email, password)
  //     .then(user => {
  //       console.log('+++++Login', user);
  //       setLoading(false);
  //       // If server response message same as Data Matched
  //       if (user) navigation.navigate('Home');
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       if (error.code === 'auth/invalid-email') {
  //         setErrortext('Invalid email');
  //         setLoading(false);
  //       }
  //       if (error.code === 'auth/wrong-password') {
  //         setErrortext('Password invalid !!');
  //         setLoading(false);
  //       } else if (error.code === 'auth/user-not-found') {
  //         setErrortext('No User Found');
  //         setLoading(false);
  //       }
  //     });
  // };

  // async function saveTokenToDatabase(token) {
  //   // Assume user is already signed in
  //   const userId = auth().currentUser.uid;

  //   // Add the token to the users data store
  //   await firestore()
  //     .collection('users')
  //     .doc(userId)
  //     .update({
  //       tokens: firestore.FieldValue.arrayUnion(token),
  //     });
  // }



  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <KeyboardAvoidingView behavior="position">
        <View style={[styles.box1, {backgroundColor: theme.backgroundColor}]}>
          <Image
            style={[styles.img]}
            source={{
              uri: 'https://t3.ftcdn.net/jpg/00/37/93/86/360_F_37938684_xbSDgZbd0VMsjzJDkLizUhIRAHCmrbXf.jpg',
            }}
          />
          <Text style={[styles.text, {color: theme.textColor}]}>
            Take Your Pills Carefully !{' '}

          </Text>

        </View>
        <View
          style={[
            styles.sectionStyle,
            {backgroundColor: theme.backgroundColor},
          ]}>
          <TextInput
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={[styles.inputStyle, {color: theme.textColor}]}
          />

          <Ionicons
            style={styles.touachableButton}
            name="mail"
            size={20}
            color={COLORS.PRIMARY_COLOR}
          />
        </View>

        <View
          style={[
            styles.sectionStyle,
            {backgroundColor: theme.backgroundColor},
          ]}>
          <TextInput
            autoCapitalize="none"
            placeholder="password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={showVisiblity}
            style={[styles.inputStyle, {color: theme.textColor}]}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.touachableButton}
            onPress={setPasswordVisibility}>
            {showVisiblity ? (
              <Ionicons name="eye" size={20} color={COLORS.PRIMARY_COLOR} />
            ) : (
              <Ionicons name="eye-off" size={20} color={COLORS.PRIMARY_COLOR} />
            )}
          </TouchableOpacity>
        </View>

        <Text style={{color: 'red', textAlign: 'center'}}>{errortext}</Text>

        {isLoading ? (
          <LoadingScreen/>
        ) : (
          <View
            style={{
              height: setHeight(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomButton 
            buttonColor={COLORS.PRIMARY_COLOR}
             buttonStyle={{
          width: '80%',
          alignSelf: 'center',
        
          borderRadius: 6,
          marginBottom:20 
        }}
        onPress={handleLogin}
        textStyle={{fontSize: 20}}
             title="Login"  />
          </View>
        )}
        <Pressable onPress={() => navigation.navigate('Register')}>
          <Text
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontFamily: 'Poppins-Regular',
              color: theme.textColor,
            }}>
            New to app?{' '}
            <Text
              style={[{fontFamily: 'Poppins-Bold', color: theme.textColor}]}>
              Register
            </Text>
          </Text>
        
        </Pressable>
        
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: COLORS.PRIMARY_COLOR,
    margin: 10,
    fontFamily: 'Poppins-Regular',
  },
  img: {
    width: setWidth(70),
    height: setHeight(25),
    resizeMode: 'cover',
    borderRadius:10
  },
  box1: {
    height: setHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  sectionStyle: {
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
    backgroundColor: 'rgba(82,107,242,0.1)',
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
