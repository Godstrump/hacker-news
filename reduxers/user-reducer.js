import {
  FETCH_ERROR,
  FETCHING,
  INIT_DB,
  LOGIN,
  SIGNUP,
  CLEAR_LOG,
} from './types';

const initialState = {
  hacker: null,
  errors: null,
  isAuth: false,
  loading: null,
  isDbConnect: false,
  info: null,
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case INIT_DB:
      return {
        ...state,
        isDbConnect: true,
      };
    case LOGIN:
      const {data, success, ...info} = action.payload;
      return {
        ...state,
        loading: false,
        isAuth: success ? true : false,
        hacker: data,
        info: {success, ...info},
      };
    case SIGNUP:
      const {data: hacker, success: isSuccess, ...infos} = action.payload;
      return {
        ...state,
        loading: false,
        isAuth: isSuccess ? true : false,
        hacker: hacker,
        info: {isSuccess, ...infos},
      };
    case FETCH_ERROR:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    case CLEAR_LOG:
      return {
        ...state,
        loading: false,
        info: null,
        hacker: null,
      };
    default:
      return state;
  }
};
