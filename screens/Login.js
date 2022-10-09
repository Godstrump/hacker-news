import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ScrollView, Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/Input';
import Btn from '../components/Btn';
import SubText from '../components/SubText';
import {useTheme} from 'react-native-paper';
import {signInUser} from '../reduxers/actions';
import {SIGNUP, DASHBOARD} from '../utils/navigations';
import {selectUserLoader} from '../reduxers/selectors';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoader);

  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [passError, setPassError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);

  console.log('hello');

  const onChangeUsername = value => {
    if (usernameError) {
      setUsernameError(null);
    }
    setUsername(value);
  };
  const onChangePass = value => {
    if (passError) {
      setPassError(null);
    }
    setPassword(value);
  };

  const handleNavigate = () => navigation.navigate(SIGNUP);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigate = useCallback(() => navigation.navigate(DASHBOARD), []);

  const naught = useCallback(() => {
    setUsername('');
    setPassword('');
    dispatch({type: 'CLEAR_LOG'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = () => {
    if (!username?.trim() && !password?.trim()) {
      setUsernameError('This field can not be empty');
      setPassError('Please enter a password');
      return;
    }
    if (!username?.trim()) {
      setUsernameError('This field can not be empty');
      return;
    }
    if (!password?.trim()) {
      setPassError('Please enter a password');
      return;
    }
    setUsername(null);
    setPassword(null);
    dispatch(signInUser(username, password, navigate, naught));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <View style={styles.inputContainer}>
        <Input
          onChange={onChangeUsername}
          ph="Username"
          phtc="#959595"
          fi={true}
          theme={theme}
          error={usernameError}
          icon={'md-person-outline'}
        />
        <Input
          ph="Password"
          phtc="#959595"
          onChange={onChangePass}
          theme={theme}
          error={passError}
          secureInput={securePass}
          handleEye={() => setSecurePass(state => !state)}
        />
      </View>
      <Btn
        loading={loading}
        submit={onSubmit}
        name="Login"
        theme={theme}
        nav="Dashboard"
      />
      <SubText
        handleNavigate={handleNavigate}
        question="Not a hacker?"
        link="SignUp"
        theme={theme}
      />
    </ScrollView>
  );
};

const useStyles = theme => {
  const makeStyles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      paddingLeft: 32,
      paddingRight: 30,
    },
    header: {
      fontFamily: theme?.fonts.main,
      color: theme?.colors.textColor,
      fontSize: 64,
      marginTop: 50,
    },
    inputContainer: {
      marginTop: 54,
    },
  });
  return makeStyles;
};

export default Login;
