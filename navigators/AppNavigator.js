import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import WelcomeScreen from '../screens/Welcome';
import DrawerNavigator from './DrawerNavigator';
import {WELCOME, SIGNUP, LOGIN, DASHBOARD} from '../utils/navigations';
import {initDbConnection} from '../reduxers/actions';
import {selectAuth} from '../reduxers/selectors';

const Stack = createNativeStackNavigator();

const WelcomeNav = () => {
  const isAuth = useSelector(selectAuth);
  const {navigate} = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (!isAuth) {
        navigate(LOGIN);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]),
  );

  return <WelcomeScreen />;
};

const DrawerNav = () => {
  const isAuth = useSelector(selectAuth);
  const {navigate} = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      if (!isAuth) {
        navigate(LOGIN);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]),
  );

  return <DrawerNavigator />;
};

const AppNavigator = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(initDbConnection());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Group>
        <Stack.Screen name={LOGIN} component={Login} />
        <Stack.Screen name={SIGNUP} component={SignUp} />
        <Stack.Screen name={WELCOME} component={WelcomeNav} />
        <Stack.Screen name={DASHBOARD} component={DrawerNav} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigator;
