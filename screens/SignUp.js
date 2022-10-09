import React, {useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Text, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Input from '../components/Input';
import Btn from '../components/Btn';
import SubText from '../components/SubText';
import {useTheme} from 'react-native-paper';
import {WELCOME, LOGIN} from '../utils/navigations';
import {signUpUser} from '../reduxers/actions';
import {selectUserLoader} from '../reduxers/selectors';

const SignUp = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectUserLoader);

  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securePass, setSecurePass] = useState(true);
  const [secureConfPass, setSecureConfPass] = useState(true);
  const [passError, setPassError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [confirmPassError, setConfirmPassError] = useState(null);

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
  const onChangeConfirmPass = value => {
    if (confirmPassError) {
      setConfirmPassError(null);
    }
    setConfirmPassword(value);
  };
  const handleNavigate = () => navigation.navigate(LOGIN);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const navigate = useCallback(() => navigation.navigate(WELCOME), []);
  const naught = useCallback(() => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    dispatch({type: 'CLEAR_LOG'});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {
    if (!username?.trim() && !password?.trim() && !confirmPassword?.trim()) {
      setConfirmPassError('Please confirm your password');
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
    if (!confirmPassword?.trim()) {
      setConfirmPassError('Please confirm your password');
      return;
    }
    if (password !== confirmPassword) {
      setPassError('Passwords must be the same');
      setConfirmPassError(true);
      return;
    }
    dispatch(signUpUser(username, password, navigate, naught));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SignUp</Text>
      <View style={styles.inputContainer}>
        <Input
          onChange={onChangeUsername}
          ph="Username"
          phtc="#959595"
          fi={true}
          theme={theme}
          error={usernameError}
        />
        <Input
          fi={true}
          ph="Password"
          phtc="#959595"
          onChange={onChangePass}
          theme={theme}
          error={passError}
          secureInput={securePass}
          handleEye={() => setSecurePass(state => !state)}
        />
        <Input
          ph="Confirm Password"
          phtc="#959595"
          onChange={onChangeConfirmPass}
          theme={theme}
          error={confirmPassError}
          secureInput={secureConfPass}
          handleEye={() => setSecureConfPass(state => !state)}
        />
      </View>
      <Btn loading={loading} submit={onSubmit} name="SignUp" theme={theme} />
      <SubText
        handleNavigate={handleNavigate}
        question="Already a hacker?"
        link="Login"
        theme={theme}
      />
    </View>
  );
};

const useStyles = theme => {
  const makeStyles = StyleSheet.create({
    container: {
      height: '100%',
      paddingLeft: 32,
      paddingRight: 30,
    },
    header: {
      fontFamily: theme.fonts.main,
      color: theme.colors.textColor,
      fontSize: 64,
      marginTop: 50,
    },
    inputContainer: {
      marginTop: 54,
    },
  });
  return makeStyles;
};

export default SignUp;
