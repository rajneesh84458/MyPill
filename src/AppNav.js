import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Profile from './Profile';
import HomePage from './HomePage';
import withCodePush from './components/hoc/codePush';
import {navigationRef} from './components/RootNavigation';
import RegisterScreen from './AuthScreen/RegisterScreen';
import LoginScreen from './AuthScreen/LoginScreen';
import {AuthContext} from './AuthContext';
import {darkTheme, lightTheme} from './theme/themeFile';
import AddPill from './components/AddPill';
import EditProfile from './EditProfile';
import {FONT_FAMILY} from './utilities/helper';
import {COLORS} from './utilities/medicineTab';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const {isDarkTheme} = useContext(AuthContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          title: 'Register',
          headerStyle: {
            backgroundColor: theme.backgroundColor,
          },
          headerTintColor: theme.textColor,
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const {isDarkTheme} = useContext(AuthContext);
  const theme = isDarkTheme ? darkTheme : lightTheme;
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Add Pill"
        component={AddPill}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          title: 'My Profile',
          headerTitleStyle: {fontSize: 16, fontFamily: FONT_FAMILY.REGULAR},
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            borderBottomColor: COLORS.WHITE,
            borderBottomWidth: 1,
          },
          headerTintColor: theme.textColor,
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerTitleStyle: {fontSize: 16, fontFamily: FONT_FAMILY.REGULAR},
          headerStyle: {
            backgroundColor: theme.backgroundColor,
            borderBottomColor: COLORS.WHITE,
            borderBottomWidth: 1,
          },
          headerTintColor: theme.textColor,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

function AppNav() {
  const {user} = useContext(AuthContext);
  return (
    <NavigationContainer ref={navigationRef}>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default withCodePush(AppNav);
