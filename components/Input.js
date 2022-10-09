import React from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Input = ({
  onChange,
  ph,
  phtc,
  fi,
  theme,
  secureInput,
  icon,
  ...props
}) => {
  const styles = useStyles(theme, props?.error);

  const HideInput = ({handleEye}) => {
    return secureInput === true ? (
      <Ionicons
        style={styles.eye}
        name={'md-eye-off-outline'}
        size={20}
        color={theme.colors.secondary}
        onPress={handleEye}
      />
    ) : secureInput === false ? (
      <Ionicons
        onPress={handleEye}
        style={styles.eye}
        name={'md-eye-outline'}
        size={20}
        color={theme.colors.secondary}
      />
    ) : (
      ''
    );
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        onChangeText={onChange}
        secureTextEntry={secureInput}
        placeholder={ph}
        placeholderTextColor={phtc}
        inlineImageLeft={icon}
        style={[styles.input]}
      />
      <HideInput {...props} />
      <Text style={styles.error}>
        {props?.error !== true ? props?.error : ''}
      </Text>
    </View>
  );
};

const useStyles = (theme, error) => {
  const styles = StyleSheet.create({
    inputContainer: {
      position: 'relative',
    },
    input: {
      height: 47,
      width: '100%',
      paddingLeft: 17,
      fontFamily: theme.fonts.main,
      fontSize: 16,
      color: theme.colors.secondary,
      borderRadius: 5,
      borderLeftWidth: 2,
      borderTopWidth: 2,
      borderRightWidth: 2,
      borderStartWidth: 2,
      borderBottomWidth: 2,
      borderColor: error ? 'red' : theme.colors.secondary,
      marginBottom: 32,
    },
    eye: {
      position: 'absolute',
      right: 10,
      top: 14,
    },
    error: {
      position: 'absolute',
      color: 'red',
      bottom: 11,
      fontSize: 12,
      fontFamily: theme.fonts.secondary,
    },
  });
  return styles;
};

export default Input;
