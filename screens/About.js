import React from 'react';
import {ScrollView, View, Text, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import Header from '../components/Header';

const linkedIn = '../assets/images/LinkedIn.png';
const gitHub = '../assets/images/GitHub.png';
const web = '../assets/images/Web.png';

const About = () => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const handleNav = () => navigation.toggleDrawer();

  return (
    <>
      <Header theme={theme} handleNav={handleNav} />
      <ScrollView style={styles.container}>
        <View style={styles.aboutMe}>
          <View flexDirection={'row'} alignItems={'center'}>
            <Text style={styles.about}>About</Text>
            <View flexDirection={'row'} alignSelf={'center'}>
              <Image style={styles.img} source={require(linkedIn)} />
              <Image style={styles.img} source={require(gitHub)} />
              <Image style={styles.img} source={require(web)} />
            </View>
          </View>
          <Text style={styles.note}>
            I am a Software Engineer with over 5 years of coding experience. I
            hold a bachelor's degree in computer engineering.{'\n'}
            {'\n'}I have mastery in coding skills such as JavaScript, and
            Typescript. I have also used framework and tools, such as React,
            Angular, Ruby on rails, Postgres, SASS, Material UI, RESTful
            Services, GitHub, and GraphQL. My experience also extends to cloud
            infrastructure tools like AWS, Travis, and Kubernetes. And
            development collaboration such as JIRA and ClickUp.{'\n'}
            {'\n'}I have working experience in domain such as Fintech,
            Exploration, Staff management, Supply chain, and Education. My aim
            is to leverage the latest technology to optimize business operations
            and practice by providing innovative solutions. Strong in Agile &
            Scrum Methodology
          </Text>
        </View>
      </ScrollView>
    </>
  );
};

const useStyles = theme => {
  const makeStyles = StyleSheet.create({
    container: {
      marginLeft: 15,
      marginRight: 20,
    },
    aboutMe: {},
    about: {
      color: theme.colors.textColor,
      fontFamily: theme.fonts.main,
      fontSize: 40,
      marginTop: 40,
      marginBottom: 20,
      marginRight: 20,
    },
    note: {
      color: theme.colors.textColor,
      fontFamily: theme.fonts.second,
      fontSize: 17,
      lineHeight: 30,
      textAlign: 'justify',
    },
    img: {
      width: 30,
      height: 30,
    },
  });
  return makeStyles;
};

export default About;
