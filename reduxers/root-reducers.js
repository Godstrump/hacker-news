import {getNewsReducer} from './news-reducer';
import {combineReducers} from 'redux';
import {usersReducer} from './user-reducer';
import {LOGOUT} from './types';

const appReduxer = combineReducers({
  news: getNewsReducer,
  users: usersReducer,
});

const rootReduxer = (state, action) => {
  if (action.type === LOGOUT) {
    state = undefined;
  }
  return appReduxer(state, action);
};

export default rootReduxer;
