import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';

const Btn = ({name, theme, submit, loading}) => {
  const styles = useStyles(theme);

  const Loader = () =>
    loading ? (
      <ActivityIndicator size={'small'} color={'#aaa'} />
    ) : (
      <Text style={styles.buttonText}>{name}</Text>
    );

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.press} onPress={submit}>
        <Loader />
      </Pressable>
    </View>
  );
};

const useStyles = theme => {
  const makeStyles = StyleSheet.create({
    buttonContainer: {
      width: 132,
      height: 38,
      alignSelf: 'center',
      justifyContent: 'center',
      paddingHorizontal: 5,
      paddingVertical: 5,
      flexDirection: 'row',
      backgroundColor: theme?.colors.primary,
      borderRadius: 5,
      marginTop: 33,
    },
    press: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontFamily: theme?.fonts.main,
      fontSize: 20,
      textAlign: 'center',
      color: theme?.colors.textColor,
    },
  });
  return makeStyles;
};

export default Btn;
