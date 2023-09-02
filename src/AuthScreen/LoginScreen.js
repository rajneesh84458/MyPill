import React, {useContext, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Pressable,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import {COLORS} from '../utilities/medicineTab';
import {setHeight, setWidth} from '../components/globalDimension';
import {AuthContext} from '../AuthContext';
import {darkTheme, lightTheme} from '../theme/themeFile';
import LoadingScreen from '../components/LoadingScreen';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/CustomText';
import {FONT_FAMILY} from '../utilities/helper';
import CustomImage from '../components/CustomImage';

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

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <KeyboardAvoidingView behavior="position">
        <View style={[styles.box1, {backgroundColor: theme.backgroundColor}]}>
          <CustomImage
            style={[styles.img]}
            source={{
              uri: 'https://t3.ftcdn.net/jpg/00/37/93/86/360_F_37938684_xbSDgZbd0VMsjzJDkLizUhIRAHCmrbXf.jpg',
            }}
          />
          <CustomText
            title="Take Your Pills Carefully !"
            style={[styles.text, {color: theme.textColor}]}
          />
        </View>
        <View
          style={[
            styles.sectionStyle,
            {backgroundColor: theme.backgroundColor},
          ]}>
          <CustomTextInput
            autoCapitalize="none"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{color: theme.textColor}}
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
          <CustomTextInput
            autoCapitalize="none"
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={showVisiblity}
            style={{color: theme.textColor}}
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
        <CustomText
          title={errortext}
          style={{color: COLORS.RED, textAlign: 'center'}}
        />
        {isLoading ? (
          <LoadingScreen />
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
                marginBottom: 20,
              }}
              onPress={handleLogin}
              textStyle={{fontSize: 20}}
              title="Login"
            />
          </View>
        )}
        <Pressable onPress={() => navigation.navigate('Register')}>
          <CustomText
            title="New to app?"
            style={{
              textAlign: 'center',
              marginTop: 20,
              fontFamily: FONT_FAMILY.REGULAR,
              color: theme.textColor,
            }}>
            <CustomText
              title="Register"
              style={[{fontFamily: FONT_FAMILY.BOLD, color: theme.textColor}]}
            />
          </CustomText>
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
    borderRadius: 10,
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
