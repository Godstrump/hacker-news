import {FETCH_ERROR, FETCHING, FETCH_IDS, UNSUBSCRIBE} from './types';

const initialState = {
  loading: false,
  storyIds: null,
  errors: null,
};

export const getNewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case FETCH_IDS:
      return {
        ...state,
        loading: false,
        storyIds: action.payload,
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case UNSUBSCRIBE:
      return {
        ...state,
        storyIds: null,
      };
    default:
      return state;
  }
};
