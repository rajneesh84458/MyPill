import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import {COLORS} from '../utilities/medicineTab';
import {AuthContext} from '../AuthContext';
import {darkTheme, lightTheme} from '../theme/themeFile';
import LoadingScreen from '../components/LoadingScreen';
import CustomTextInput from '../components/CustomTextInput';
import CustomText from '../components/CustomText';
import {appStyle, FONT_FAMILY, setHeight, setWidth} from '../utilities/helper';
import CustomImage from '../components/CustomImage';
import Icon, {IconType} from '../components/IconComponent';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <View
      style={[appStyle.container, {backgroundColor: theme.backgroundColor}]}>
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
          <Icon
            type={IconType.Ionicons}
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
              <Icon
                type={IconType.Ionicons}
                name="eye-off"
                size={20}
                color={COLORS.PRIMARY_COLOR}
              />
            ) : (
              <Icon
                type={IconType.Ionicons}
                name="eye"
                size={20}
                color={COLORS.PRIMARY_COLOR}
              />
            )}
          </TouchableOpacity>
        </View>
        <CustomText
          title={errortext}
          style={{color: COLORS.RED, textAlign: 'center'}}
        />
        {isLoading && <LoadingScreen />}
        <View
          style={{
            height: setHeight(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CustomButton
            buttonColor={COLORS.PRIMARY_COLOR}
            buttonStyle={{
              width: setWidth(90),
              alignSelf: 'center',
              borderRadius: 6,
            }}
            onPress={handleLogin}
            textStyle={{fontSize: 20}}
            title="Login"
          />
        </View>
        <CustomButton
          buttonColor={COLORS.PRIMARY_COLOR}
          buttonStyle={{
            width: setWidth(90),
            alignSelf: 'center',
            borderRadius: 6,
          }}
          onPress={() => navigation.navigate('Register')}
          textStyle={{fontSize: 20}}
          title="Register"
        />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: COLORS.WHITE,
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
    fontFamily: FONT_FAMILY.REGULAR,
    borderRadius: 10,
    backgroundColor: 'rgba(82,107,242,0.1)',
  },
  errorTextStyle: {
    color: COLORS.RED,
    textAlign: 'center',
    fontSize: 14,
    fontFamily: FONT_FAMILY.REGULAR,
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
