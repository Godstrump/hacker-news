import React, {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import Dashboard from '../components/Dashboard';
import {fetchNewStoryIds, unsubscribe} from '../reduxers/actions';

const NewStories = () => {
  const dispatch = useDispatch();

  const onReload = () => dispatch(fetchNewStoryIds());

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchNewStoryIds());
      return () => dispatch(unsubscribe());
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return <Dashboard onReload={onReload} header={'New Stories'} />;
};

export default NewStories;
