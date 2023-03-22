import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
export const AuthContext = createContext();

export const AuthProvider = ({children, navigation}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(prevState => !prevState);
  };

  useEffect(() => {
    // Check if the user is already signed in
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (user) {
        console.log('user', user);
        setUser(user);
        await AsyncStorage.setItem('user', JSON.stringify(user));
      } else {
        await AsyncStorage.removeItem('user');
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const signUp = async (email, password, userName, mobile, filePath) => {
    console.log('mobile', mobile);
    setIsLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      const currentUser = auth().currentUser;
        console.log("current user",currentUser)
      await currentUser.updateProfile({
        displayName: userName,
        photoURL: filePath,
      });

      console.log('registerd user', currentUser);
      await firestore().collection('users').doc(currentUser.uid).set({
        userName,
        email,
        filePath,
        mobile,
      });

      setIsLoading(true);
     
    } catch (e) {
      console.log(e);
    }
  };

  const signIn = async (email, password) => {
    setIsLoading(true);
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);

      setUser(user);
      console.log('userLogged in', user);
      navigation.replace('Home');

      await AsyncStorage.setItem('user', JSON.stringify(user));
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/invalid-email') {
        // setErrortext('Invalid email');
        setIsLoading(false);
        return alert('Invalid email');
      }
      if (error.code === 'auth/wrong-password') {
        // setErrortext('Password invalid !!');
        setIsLoading(false);
        return alert('Invalid password');
      } else if (error.code === 'auth/user-not-found') {
        // setErrortext('No User Found');

        setIsLoading(false);
        return alert('This user does not exits');
      }
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await auth().signOut();
      await AsyncStorage.removeItem('user');
      setUser(null);
      setIsLoading(false);
      // navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };

  const value = {
    user,
    isLoading,
    signUp,
    signIn,
    signOut,
    isDarkTheme,
    toggleTheme,
    setIsLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
