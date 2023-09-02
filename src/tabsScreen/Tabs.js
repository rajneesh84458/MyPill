import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, TouchableOpacity} from 'react-native';
import AddPill from '../../components/AddPill';
import CustomImage from '../components/CustomImage';
import CustomText from '../components/CustomText';
import HomePage from '../HomePage';
import Profile from '../Profile';
import {COLORS} from '../utilities/medicineTab';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -25,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
      }}>
      {children}
    </View>
  </TouchableOpacity>
);
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 10,
          right: 10,
          elevation: 0,
          backgroundColor: '#dddd',
          borderRadius: 15,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <CustomImage
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/1946/1946436.png',
                }}
                resizeMode="cover"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.BLACK,
                }}
              />
              <CustomText
                title="Home"
                style={{
                  color: focused ? COLORS.PRIMARY_COLOR : COLORS.BLACK,
                  fontSize: 14,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Add Pill"
        component={AddPill}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomImage
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/1828/1828919.png',
              }}
              resizeMode="cover"
              style={{
                width: 45,
                height: 45,
                tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.BLACK,
              }}
            />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <CustomImage
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/709/709722.png',
                }}
                resizeMode="cover"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? COLORS.PRIMARY_COLOR : COLORS.BLACK,
                }}
              />
              <CustomText
                title="Profile"
                style={{
                  color: focused ? COLORS.PRIMARY_COLOR : COLORS.BLACK,
                  fontSize: 14,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;
