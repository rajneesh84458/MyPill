import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Alert,
  Switch,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLORS} from './utilities/medicineTab';
import {AuthContext} from './AuthContext';
import ImagePicker from 'react-native-image-crop-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {darkTheme, lightTheme} from './theme/themeFile';
const Profile = ({navigation}) => {
  const [imageUri, setImageUri] = useState(null);
  const {user, signOut, isDarkTheme, toggleTheme} = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);

  const theme = isDarkTheme ? darkTheme : lightTheme;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
    Alert.alert('', 'Are you sure want to Log out ?', [
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
            padding: 2,
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
              backgroundColor: '#f4f4f4',
              justifyContent: 'center',
              alignItems: 'center',

              borderRadius: 20,
              marginLeft: 90,
              marginTop: -30,
              elevation: 5,
            }}>
            <Text
              style={{
                fontSize: 26,

                // fontWeight: 'bold',
              }}>
              +
            </Text>
          </View>
        </Pressable>

        <View style={{height: 120, padding: 10}}>
          {/* email   */}
          <View>
            <Text
              style={[
                styles.stripTextStyle,
                {fontWeight: 'bold', fontSize: 20},
                {color: theme.textColor},
              ]}>
              {user.displayName}
            </Text>
            <Text style={[styles.stripTextStyle, {color: theme.textColor}]}>
              {user.email}
            </Text>
            <Pressable onPress={()=>navigation.navigate('EditProfile')}
             style={styles.editButtonStyle}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                }}>
                Edit Profile
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable onPress={() => alert('Added soon')} style={styles.stripStyle}>
        <Text style={[styles.stripTextStyle, {color: theme.textColor}]}>
          DarkMode
        </Text>
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
        <Text style={[styles.stripTextStyle, {color: theme.textColor}]}>
          Language
        </Text>
        <FontAwesome
          name="angle-right"
          size={20}
          color={COLORS.PRIMARY_COLOR}
        />
      </Pressable>
      <Pressable onPress={() => alert('Added soon')} style={styles.stripStyle}>
        <Text style={[styles.stripTextStyle, {color: theme.textColor}]}>
          Progress
        </Text>
        <FontAwesome
          name="angle-right"
          size={20}
          color={COLORS.PRIMARY_COLOR}
        />
      </Pressable>
      <Pressable onPress={() => onLogout(user)} style={styles.stripStyle}>
        <Text style={[styles.stripTextStyle, {color: theme.textColor}]}>
          Log Out
        </Text>
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

// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';
// import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
// const Profile = () => {
//   return (
//     <View style={{marginTop: 30}}>
//       <Text>Profile</Text>
//       <FontAwesomeIcon name="rocket" size={30} color="#900" />;
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({});
