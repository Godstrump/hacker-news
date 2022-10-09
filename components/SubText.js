import React from 'react';
import {Text, View, StyleSheet, Pressable} from 'react-native';

const SubText = ({handleNavigate, question, link, theme}) => {
  const styles = useStyles(theme);

  return (
    <View style={styles.subContainer}>
      <Pressable>
        <Text style={styles.subText}>
          {question}
          <Text onPress={handleNavigate} style={styles.link}>
            {` ${link}`}
          </Text>
        </Text>
      </Pressable>
    </View>
  );
};

const useStyles = theme => {
  const makeStyles = StyleSheet.create({
    subContainer: {
      width: '100%',
      alignSelf: 'center',
      justifyContent: 'center',
      marginTop: 24,
      marginHorizontal: '24.5%',
      flexDirection: 'row',
    },
    subText: {
      fontFamily: theme?.fonts.main,
      color: theme?.colors.textColor,
    },
    link: {
      color: '#C31B1B',
      fontFamily: theme?.fonts.main,
    },
  });
  return makeStyles;
};

export default SubText;
