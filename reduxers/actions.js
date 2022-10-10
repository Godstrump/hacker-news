import axios from 'axios';
import {REACT_APP_HACKER_NEWS} from '@env';
import {
  FETCH_ERROR,
  FETCHING,
  FETCH_IDS,
  UNSUBSCRIBE,
  INIT_DB,
  LOGIN,
  SIGNUP,
} from './types';
import {
  initDb,
  dbConnection,
  getHackers,
  saveHacker,
} from '../service/db-service';
import Alert from '../components/Alert';

const API = REACT_APP_HACKER_NEWS;

export const unsubscribe = () => ({
  type: UNSUBSCRIBE,
});

export const fetchTopStoryIds = () => async dispatch => {
  try {
    dispatch({type: FETCHING});
    const res = await axios.get(`${API}/topstories.json`);
    dispatch({
      type: FETCH_IDS,
      payload: [...new Set(res?.data)],
    });
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: error.message,
    });
  }
};

export const fetchNewStoryIds = () => async dispatch => {
  try {
    dispatch({type: FETCHING});
    const res = await axios.get(`${API}/newstories.json`);
    dispatch({
      type: FETCH_IDS,
      payload: [...new Set(res?.data)],
    });
  } catch (error) {
    dispatch({
      type: FETCH_ERROR,
      payload: error.message,
    });
  }
};

export const initDbConnection = () => async dispatch => {
  try {
    await initDb();
    dispatch({type: INIT_DB, payload: true});
  } catch (err) {
    dispatch({type: FETCH_ERROR, payload: err.message});
  }
};

export const signInUser =
  (username, password, navigate, naught) => async dispatch => {
    try {
      dispatch({type: FETCHING});
      const db = await dbConnection();
      const data = await getHackers(db);
      const hacker = data?.find(
        user => user.username === username && user.password === password,
      );
      const payload = {};
      if (hacker) {
        payload.msg = 'User login successful';
        payload.success = true;
        payload.data = {id: hacker?.id, username: hacker.username};

        dispatch({
          type: LOGIN,
          payload: payload,
        });
        Alert(navigate, payload.msg);
      } else {
        payload.msg = 'User credentials does not exist';
        payload.success = false;
        payload.data = hacker;

        dispatch({
          type: LOGIN,
          payload: payload,
        });
        Alert(naught, payload.msg);
      }
      db.close();
    } catch (err) {
      dispatch({type: FETCH_ERROR, payload: err.message});
    }
  };

export const signUpUser =
  (username, password, navigate, naught) => async dispatch => {
    try {
      dispatch({type: FETCHING});
      const db = await dbConnection();
      const data = await getHackers(db);
      const hacker = data?.find(user => user.username === username);
      const payload = {};
      if (hacker) {
        payload.msg = 'Hacker already exists';
        payload.success = false;
        payload.data = hacker;
        dispatch({
          type: SIGNUP,
          payload: payload,
        });
        Alert(naught, payload.msg);
      } else {
        await saveHacker(db, {username, password});
        payload.msg = 'Hacker created successfully';
        payload.success = true;
        payload.data = username;
        dispatch({
          type: SIGNUP,
          payload: payload,
        });
        Alert(navigate, payload.msg);
      }
      db.close();
    } catch (err) {
      dispatch({type: FETCH_ERROR, payload: err.message});
    }
  };
