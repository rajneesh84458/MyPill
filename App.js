import React, {useEffect} from 'react';
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
