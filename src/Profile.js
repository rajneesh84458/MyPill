import {
  Pressable,
  StyleSheet,
  View,
  Alert,
  Switch,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLORS} from './utilities/medicineTab';
import {AuthContext} from './AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import {
  darkStyles,
  darkTheme,
  lightStyles,
  lightTheme,
} from './theme/themeFile';
import CustomButton from './components/CustomButton';
import CustomText from './components/CustomText';
import CustomImage from './components/CustomImage';
import Icon, {IconType} from './components/IconComponent';
import {appStyle, FONT_FAMILY, setWidth} from './utilities/helper';

const Profile = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const {user, signOut, isDarkTheme, toggleTheme} = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  const currentStyles = isDarkTheme ? darkStyles : lightStyles;

  const takeImage = () => {
    const title = 'Error title..';
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setImageUri(image?.path);
      })
      .catch(e => Alert.alert(title, e.message));
  };

  const onLogout = () =>
    Alert.alert('Alert', 'Are you sure want to Log out ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => signOut(user)},
    ]);

  const toggleSwitch = () =>
    setIsEnabled(previousState => !previousState, toggleTheme());

  const addedSoon = () => {
    ToastAndroid.show('Added Soon', ToastAndroid.SHORT);
  };

  return (
    <View
      style={[appStyle.container, {backgroundColor: theme.backgroundColor}]}>
      <View
        style={[
          styles.headerStyle,
          {borderBottomColor: theme.borderBottomCOlor, borderBottomWidth: 0.2},
        ]}>
        <Pressable onPress={takeImage} style={styles.imgContainer}>
          <CustomImage
            source={{
              uri: imageUri || user?.photoURL,
            }}
            style={styles.img}
          />
          <View
            style={[
              styles.camerContainer,
              {backgroundColor: currentStyles.container.backgroundColor},
            ]}>
            <Icon
              type={IconType.Feather}
              name="camera"
              size={15}
              color={currentStyles.container.color}
            />
          </View>
        </Pressable>
        <View style={{padding: 10}}>
          <CustomText
            title={user.displayName}
            style={[
              styles.stripTextStyle,
              {fontFamily: FONT_FAMILY.BOLD, fontSize: 20},
              {color: theme.textColor},
            ]}
          />
          <CustomText
            title={user.email}
            style={[styles.stripTextStyle, {color: theme.textColor}]}
          />
          <CustomButton
            onPress={() => navigation.navigate('EditProfile')}
            title="Edit Profile"
            buttonColor={COLORS.PRIMARY_COLOR}
            buttonStyle={styles.btn}
          />
        </View>
      </View>

      <Pressable onPress={addedSoon} style={styles.stripStyle}>
        <CustomText
          title="DarkMode"
          style={[styles.stripTextStyle, {color: theme.textColor}]}
        />
        <Switch
          trackColor={{false: '#767577', true: COLORS.PRIMARY_COLOR}}
          thumbColor={
            isEnabled
              ? COLORS.PRIMARY_COLOR
              : {backgroundColor: theme.textColor}
          }
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </Pressable>
      <Pressable onPress={addedSoon} style={styles.stripStyle}>
        <CustomText
          title="Language"
          style={[styles.stripTextStyle, {color: theme.textColor}]}
        />
        <Icon
          type={IconType.FontAwesome}
          name="angle-right"
          size={30}
          color={COLORS.PRIMARY_COLOR}
        />
      </Pressable>
      <Pressable onPress={addedSoon} style={styles.stripStyle}>
        <CustomText
          title="Progress"
          style={[styles.stripTextStyle, {color: theme.textColor}]}
        />
        <Icon
          type={IconType.FontAwesome}
          name="angle-right"
          size={30}
          color={COLORS.PRIMARY_COLOR}
        />
      </Pressable>
      <Pressable onPress={() => onLogout(user)} style={styles.stripStyle}>
        <CustomText
          title="Log out"
          style={[styles.stripTextStyle, {color: theme.textColor}]}
        />
        <Icon
          type={IconType.MaterialCommunityIcons}
          name="logout"
          size={30}
          color={COLORS.PRIMARY_COLOR}
        />
      </Pressable>
    </View>
  );
};
export default Profile;
const styles = StyleSheet.create({
  headerStyle: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomColor: '#f4f4f4',
    borderBottomWidth: 1,
    // alignItems: 'center',
  },
  editButtonStyle: {
    width: 150,
    height: 40,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY_COLOR,
    borderRadius: 10,
  },
  stripStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    margin: 5,
    padding: 10,
  },
  stripTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  imgContainer: {
    marginTop: 10,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#f4f4f4',
  },
  img: {
    width: 140,
    height: 140,
    borderRadius: 70,
    resizeMode: 'cover',
  },
  camerContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 90,
    marginTop: -30,
    elevation: 5,
  },
  btn: {
    width: setWidth(50),
    marginTop: 20,
    borderRadius: 10,
  },
});
