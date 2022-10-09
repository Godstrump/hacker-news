import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Dashboard from '../components/Dashboard';
import {fetchTopStoryIds, unsubscribe} from '../reduxers/actions';

const TopStories = () => {
  const dispatch = useDispatch();

  const onReload = () => dispatch(fetchTopStoryIds());

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchTopStoryIds());
      return () => dispatch(unsubscribe());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return <Dashboard onReload={onReload} header={'Top Stories'} />;
};

export default TopStories;
