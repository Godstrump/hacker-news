import React, {lazy} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TOP, NEW} from '../utils/navigations';

const Tab = createBottomTabNavigator();
const TopStories = lazy(() => import('../screens/TopStories'));
const NewStories = lazy(() => import('../screens/NewStories'));

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Top') {
          iconName = focused ? 'md-newspaper-outline' : 'md-stopwatch-outline';
        } else {
          iconName = focused
            ? 'md-newspaper-outline'
            : 'md-refresh-circle-outline';
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#C31B1B',
      tabBarInactiveTintColor: '#444242',
      headerShown: false,
    })}
    initialRouteName="Top">
    <Tab.Screen name={TOP} component={TopStories} />
    <Tab.Screen name={NEW} component={NewStories} />
  </Tab.Navigator>
);

export default TabNavigator;
