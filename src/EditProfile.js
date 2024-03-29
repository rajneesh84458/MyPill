import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  ToastAndroid,
  Platform,
  ScrollView,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import CustomButton from './components/CustomButton';
import {COLORS} from './utilities/medicineTab';
import {darkStyles, lightStyles} from './theme/themeFile';
import {AuthContext} from './AuthContext';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import LoadingScreen from './components/LoadingScreen';
import CustomTextInput from './components/CustomTextInput';
import CustomImage from './components/CustomImage';
import Icon, {IconType} from './components/IconComponent';
import CustomText from './components/CustomText';
import {appStyle, FONT_FAMILY, setWidth} from './utilities/helper';

const EditProfile = () => {
  const [uploading, setUploading] = useState(false);
  const {isDarkTheme} = useContext(AuthContext);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [filePath, setFilePath] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState();

  const currentStyles = isDarkTheme ? darkStyles : lightStyles;
  useEffect(() => {
    const userRef = firestore().collection('users').doc(auth().currentUser.uid);
    userRef.get().then(doc => {
      const userData = doc.data();
      console.log('userdata =====', userData);
      setUserName(userData.userName);
      setEmail(userData.email);
      setFilePath(userData?.filePath);
      setMobile(userData.mobile);
    });
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    const userRef = firestore().collection('users').doc(auth().currentUser.uid);
    userRef
      .update({
        filePath,
        userName,
        email,
        mobile,
      })
      .then(() => {
        setLoading(false);
        console.log('update successfully !!!');
        ToastAndroid.show('Profle updated uccessfully !!', ToastAndroid.SHORT);
      })
      .catch(error => {
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
        const task = storage().ref(filename).putFile(uploadUri);
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
    <ScrollView style={[appStyle.container, currentStyles.container]}>
      <View style={[styles.subHeader, currentStyles.container]}>
        <Pressable onPress={selectPhotoTapped}>
          <CustomImage
            source={{
              uri: filePath
                ? filePath
                : 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
            }}
            style={styles.profileImageStyle}
          />
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
            <Icon
              type={IconType.Feather}
              name="camera"
              size={15}
              color={currentStyles.container.color}
            />
          </View>
          {uploading ? (
            <View style={{}}>
              <LoadingScreen />
            </View>
          ) : null}
        </Pressable>
      </View>
      <CustomText
        title="Your Information"
        style={[styles.headingStyle, currentStyles.text]}
      />

      <View style={[styles.inputContainer]}>
        <CustomTextInput
          style={[styles.inputStyle]}
          value={userName}
          onChangeText={setUserName}
        />
      </View>
      <View style={[styles.inputContainer]}>
        <CustomTextInput
          style={[styles.inputStyle]}
          value={mobile}
          onChangeText={setMobile}
        />
      </View>
      <View style={[styles.inputContainer]}>
        <CustomTextInput
          style={[styles.inputStyle]}
          value={email}
          onChangeText={setEmail}
        />
      </View>
      {loading && <LoadingScreen />}
      <CustomButton
        onPress={handleSubmit}
        title="Update Profile"
        buttonColor={COLORS.PRIMARY_COLOR}
        buttonStyle={{width: 300, alignSelf: 'center', marginTop: 50}}
      />
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  subHeader: {
    marginVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImageStyle: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 120 / 2,
  },
  inputContainer: {
    margin: 10,
  },
  inputStyle: {
    height: 50,
    width: setWidth(95),
    borderColor: '#ddd',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    fontFamily: FONT_FAMILY.REGULAR,
    backgroundColor: COLORS.WHITE,
  },
  headingStyle: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
    fontFamily: FONT_FAMILY.THIN,
  },
});
