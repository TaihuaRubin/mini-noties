import axios from "axios";
import {
  saveToLocalStorage,
  fetchFromLocalStorage,
  saveHistoryToLocalStorage,
  fetchHistoryFromLocalStorage,
} from "./localStorage";

/*****************************************************/

/**
 * Action types
 */

const LOAD_NOTIFICATIONS = "LOAD_NOTIFICATIONS";
const LOAD_ERROR = "LOAD_ERROR";
const MARK_READ = "MARK_READ";
const CHECK_REFRESH = "CHECK_REFRESH";
/*****************************************************/

/**
 * Set Initial State
 */

const initialState = {
  notifications: [],
  history: fetchHistoryFromLocalStorage(),
  loading: true,
  loadSuccess: false,
  uptodate: false,
};

/*****************************************************/

/**
 * Action Creators
 */

const loadNotifications = (notifications) => ({
  type: LOAD_NOTIFICATIONS,
  notifications,
});

const loadError = (error, notifications) => ({
  type: LOAD_ERROR,
  error,
  notifications,
});

const markRead = (title) => ({
  type: MARK_READ,
  title,
});

const checkRefresh = (bool) => ({
  type: CHECK_REFRESH,
  bool,
});

/*****************************************************/

/**
 * Thunk Creators
 */

export const fetchNotifications = (keyword) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://gnews.io/api/v4/search?lan=eng&q=${keyword}&token=${process.env.REACT_APP_API_KEY}`
    );

    const finishedReading = fetchHistoryFromLocalStorage();

    let payload = data["articles"];

    // check up to date

    if (payload[0]["article"] === fetchFromLocalStorage()[0]["article"]) {
      dispatch(checkRefresh(true));
    } else {
      dispatch(checkRefresh(false));
    }

    //filter out already read articles
    if (finishedReading) {
      payload = payload.filter((each) => !finishedReading.includes(each.title));
    }
    saveToLocalStorage(payload);
    dispatch(loadNotifications(payload));
  } catch (e) {
    console.log(e);
    let payload = fetchFromLocalStorage();
    dispatch(loadError(e, payload));
  }
};

export const updateAsRead = (title) => async (dispatch) => {
  try {
    saveHistoryToLocalStorage(title);
    dispatch(markRead(title));
  } catch (e) {
    console.log(e);
  }
};

/*****************************************************/

/**
 * Reducer
 */

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ERROR:
      return {
        ...state,
        notifications: state.notifications,
        loading: false,
        loadSuccess: false,
      };

    case LOAD_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.notifications,
        loading: false,
        loadSuccess: true,
      };

    case MARK_READ:
      return {
        ...state,
        notifications: state.notifications.filter((each) => each.title !== action.title),
        history: [...state.history, action.title],
      };

    case CHECK_REFRESH:
      return {
        ...state,
        uptodate: action.bool,
      };

    default:
      return state;
  }
}
