import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const Ham = ({handleNav, theme}) => {
  const styles = useStyles(theme);

  return (
    <Pressable onPress={handleNav}>
      <View style={[styles.hamContainer]}>
        <Text style={[styles.ham, styles.line_1]} />
        <Text style={[styles.ham, styles.line_2]} />
        <Text style={[styles.ham, styles.line_3]} />
      </View>
    </Pressable>
  );
};

const useStyles = theme => {
  const styles = StyleSheet.create({
    hamContainer: {
      width: 35,
      height: 20,
      justifyContent: 'space-between',
      cursor: 'pointer',
      zIndex: 5,
      transition: 'all 500ms linear',
    },
    ham: {
      height: 4,
      color: '#ffff',
      backgroundColor: '#ffff',
      transition: 'all 400ms linear',
      borderTopLeftRadius: 0,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 30,
    },
    line_1: {
      width: '50%',
    },
    line_2: {
      width: '100%',
    },
    line_3: {
      width: '50%',
    },
    ham_close: {
      transform: 'rotate(90deg)',
    },

    line_close_1: {
      transform: 'rotate(45deg)',
    },

    line_close_2: {
      transform: 'rotate(-45deg)',
    },

    line_close_3: {
      transform: 'rotate(45deg)',
    },
  });
  return styles;
};

export default Ham;
