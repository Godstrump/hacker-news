import React, {memo, useEffect, useState} from 'react';
import {View, Text, StyleSheet, Linking, Pressable} from 'react-native';
import {mapTime} from '../utils/mapTime';
import axios from 'axios';
import {REACT_APP_HACKER_NEWS} from '@env';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const API = REACT_APP_HACKER_NEWS;
const API_STORY = `${API}/item/`;

const Story = memo(function Story({storyId, theme}) {
  const styles = useStyles(theme);
  const stylesBy = useStyles(theme, 14);
  const stylesPost = useStyles(theme, 12);

  const [story, setStory] = useState({});

  useEffect(() => {
    const topStories = async () => {
      const res = await axios.get(`${API_STORY + storyId}.json`);
      setStory(res.data);
    };
    topStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return story && story?.url ? (
    <View style={styles.storyContainer}>
      <Pressable onPress={() => Linking.openURL(story.url)}>
        <Text style={styles.title}>{story.title}</Text>
      </Pressable>
      <View style={styles.meta}>
        <Text style={stylesBy.author}>
          <Text style={{color: theme.colors.author}}>By:</Text> {story.by}
        </Text>
        <Text style={stylesPost.author}>
          <Text style={{color: theme.colors.author}}>Posted:</Text>{' '}
          {mapTime(story.time)}
        </Text>
      </View>
    </View>
  ) : (
    <SkeletonPlaceholder style={styles.storyContainer} alignItems="flex-start">
      <SkeletonPlaceholder.Item marginBottom={10}>
        <SkeletonPlaceholder.Item
          borderRadius={10}
          marginBottom={5}
          width="90%"
          height={10}
        />
        <SkeletonPlaceholder.Item borderRadius={10} width={'60%'} height={10} />
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item
          borderRadius={10}
          marginBottom={10}
          width={'30%'}
          height={10}
        />
        <SkeletonPlaceholder.Item borderRadius={10} width={'40%'} height={10} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
});

const useStyles = (theme, fs = 0) => {
  const makeStyles = StyleSheet.create({
    storyContainer: {
      marginHorizontal: 20,
      marginTop: 10,
    },
    meta: {},
    title: {
      fontFamily: theme.fonts.second,
      color: theme.colors.link,
      fontSize: 16,
      textAlign: 'justify',
      marginTop: 10,
    },
    author: {
      fontFamily: theme.fonts.second,
      color: theme.colors.textColor,
      fontSize: fs,
      textAlign: 'justify',
    },
  });
  return makeStyles;
};

export default Story;
