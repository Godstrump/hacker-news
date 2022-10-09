import React from 'react';
import {useDispatch} from 'react-redux';
import About from '../screens/About';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HOME, ABOUT} from '../utils/navigations';
import {LOGOUT} from '../reduxers/types';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch({type: LOGOUT});
  };

  return (
    <Drawer.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={HOME}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Logout"
              onPress={handleLogOut}
              icon={({focused, size}) => (
                <Ionicons
                  color={focused ? '#C31B1B' : '#444242'}
                  size={size}
                  name={'md-log-out-outline'}
                />
              )}
            />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen
        name={HOME}
        component={TabNavigator}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name={'md-home-outline'}
              size={size}
              color={focused ? '#C31B1B' : '#444242'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name={ABOUT}
        component={About}
        options={{
          drawerIcon: ({focused, size}) => (
            <Ionicons
              name={'md-person-outline'}
              size={size}
              color={focused ? '#C31B1B' : '#444242'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
