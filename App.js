import React, { useEffect, useState, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { registerForPushNotificationsAsync } from './utils/pushNotifications';
import Front from './screens/front';
import UserLogin from './screens/userLogin';
import Home from './screens/home';
import UserSignup from './screens/userSignup';
import SearchScreen from './screens/searchScreen';
import Profile from './screens/profile';
import EditProfile from './screens/editProfile';
import HostDetail from './screens/hostDetail';
import CategoryItems from './screens/CategoryItems';
import Wishlist from './screens/Wishlist';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Main() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'heart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF8C00',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

const App = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => {
      setExpoPushToken(token);
      console.log('Push Token:', token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('Notification Received:', notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification Interaction:', response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Front' options={{ headerTransparent: true, headerTitle: '', headerTintColor: 'white' }}>
        <Stack.Screen name="Front" component={Front} />
        <Stack.Screen name="UserLogin" component={UserLogin} />
        <Stack.Screen name="UserSignup" component={UserSignup} />
        <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="HostDetail" component={HostDetail} />
        <Stack.Screen name="CategoryItems" component={CategoryItems} />
      </Stack.Navigator>
    </NavigationContainer>
    //<Front/>

  );
}



export default App;



