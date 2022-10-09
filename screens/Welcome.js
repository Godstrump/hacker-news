import React, {useCallback} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {TouchableRipple, useTheme} from 'react-native-paper';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import {DASHBOARD} from '../utils/navigations';

const WelcomeScreen = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const {navigate} = useNavigation();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleNavigate = useCallback(() => navigate(DASHBOARD), []);

  useFocusEffect(
    useCallback(() => {
      const timeout = setTimeout(() => handleNavigate(), 5000);

      return () => clearTimeout(timeout);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <View style={styles.welcome}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome</Text>
        <Image
          style={styles.img}
          source={require('../assets/images/anonymous_mask.png')}
        />
        <TouchableRipple onPress={handleNavigate}>
          <View style={styles.circle}>
            <Image
              style={styles.arrow}
              source={require('../assets/images/rw.png')}
            />
          </View>
        </TouchableRipple>
      </View>
    </View>
  );
};

const useStyles = theme => {
  const makeStyles = StyleSheet.create({
    welcome: {
      height: '100%',
      justifyContent: 'center',
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: theme.fonts.main,
      fontSize: 64,
      color: theme.colors.textColor,
    },
    img: {
      marginTop: 23,
    },
    circle: {
      width: 100,
      height: 100,
      backgroundColor: theme.colors.primary,
      borderRadius: 50,
      marginTop: 177,
      justifyContent: 'center',
      alignItems: 'center',
    },
    arrow: {
      width: 30,
      height: 30,
      zIndex: 100,
      color: theme.colors.textColor,
    },
  });
  return makeStyles;
};

export default WelcomeScreen;
