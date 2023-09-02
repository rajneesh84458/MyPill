import {Image, Pressable, StyleSheet, View, Alert, Switch} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLORS} from './utilities/medicineTab';
import {AuthContext} from './AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
  darkStyles,
  darkTheme,
  lightStyles,
  lightTheme,
} from './theme/themeFile';
import CustomButton from './components/CustomButton';
import Feather from 'react-native-vector-icons/Feather';
import CustomText from './components/CustomText';
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
        console.log(image.path);
        setImageUri(image.path);
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

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <View
        style={[
          styles.headerStyle,
          {borderBottomColor: theme.borderBottomCOlor, borderBottomWidth: 0.2},
        ]}>
        {/* profile  */}

        <Pressable
          onPress={takeImage}
          style={{
            marginTop: 10,
            // padding: 2,
            width: 140,
            height: 140,
            borderRadius: 70,
            backgroundColor: '#f4f4f4',
          }}>
          <Image
            source={{
              uri: imageUri ? imageUri : user?.photoURL,
            }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 70,

              resizeMode: 'cover',
            }}
          />
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: currentStyles.container.backgroundColor,
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: 20,
              marginLeft: 90,
              marginTop: -30,
              elevation: 5,
            }}>
            <Feather
              name="camera"
              size={15}
              color={currentStyles.container.color}
            />
          </View>
        </Pressable>

        <View style={{height: 120, padding: 10}}>
          {/* email   */}
          <View>
            <CustomText
              title={user.displayName}
              style={[
                styles.stripTextStyle,
                {fontWeight: 'bold', fontSize: 20},
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
              buttonStyle={{
                width: 140,
                marginTop: 20,
                borderRadius: 10,
              }}
            />
          </View>
        </View>
      </View>

      <Pressable onPress={() => alert('Added soon')} style={styles.stripStyle}>
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
      <Pressable onPress={() => alert('Added soon')} style={styles.stripStyle}>
        <CustomText
          title="Language"
          style={[styles.stripTextStyle, {color: theme.textColor}]}
        />
        <FontAwesome
          name="angle-right"
          size={20}
          color={COLORS.PRIMARY_COLOR}
        />
      </Pressable>
      <Pressable onPress={() => alert('Added soon')} style={styles.stripStyle}>
        <CustomText
          title="Progress"
          style={[styles.stripTextStyle, {color: theme.textColor}]}
        />
        <FontAwesome
          name="angle-right"
          size={20}
          color={COLORS.PRIMARY_COLOR}
        />
      </Pressable>
      <Pressable onPress={() => onLogout(user)} style={styles.stripStyle}>
        <CustomText
          title="Log out"
          style={[styles.stripTextStyle, {color: theme.textColor}]}
        />
        <SimpleLineIcons name="logout" size={20} color={COLORS.PRIMARY_COLOR} />
      </Pressable>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
    // backgroundColor: 'red',
    margin: 5,
    padding: 10,
  },
  stripTextStyle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginVertical: 5,
  },
});
