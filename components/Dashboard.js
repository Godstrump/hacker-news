import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import {useTheme} from 'react-native-paper';
import {selectStoryIds} from '../reduxers/selectors';
import Story from '../components/Story';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';

const Dashboard = ({header, onReload}) => {
  const theme = useTheme();
  const styles = useStyles(theme);
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(10);
  const storyIds = useSelector(selectStoryIds(currentPage));

  const handleNav = () => navigation.openDrawer();

  const renderStory = ({item}) => <Story theme={theme} storyId={item} />;
  const renderLoader = () => (
    <View style={styles.loader}>
      <ActivityIndicator size={'large'} color={'#aaa'} />
    </View>
  );
  const loadMoreItem = () => setCurrentPage(state => state + 5);

  return (
    <>
      <Header theme={theme} handleNav={handleNav}>
        <Avatar.Image
          size={40}
          source={require('../assets/avatars/avatar.png')}
        />
      </Header>
      <Text style={styles.headerText}>{header}</Text>
      <FlatList
        data={storyIds}
        renderItem={renderStory}
        keyExtractor={item => item}
        ListFooterComponent={renderLoader}
        onEndReached={loadMoreItem}
        onEndReachedThreshold={0}
        refreshing={false}
        onRefresh={onReload}
      />
    </>
  );
};

const useStyles = theme => {
  const makeStyles = StyleSheet.create({
    headerContainer: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 19,
    },
    headerText: {
      fontFamily: theme.fonts.main,
      color: theme.colors.textColor,
      fontSize: 48,
      alignSelf: 'center',
      marginVertical: 30,
    },
    loader: {
      marginVertical: 16,
      alignItems: 'center',
    },
  });
  return makeStyles;
};

export default Dashboard;
