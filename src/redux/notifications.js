import axios from "axios";
import {
  saveToLocalStorage,
  fetchFromLocalStorage,
  saveHistoryToLocalStorage,
  fetchHistoryFromLocalStorage,
} from "./localStorage";
/**
 * Action types
 */

export const LOAD_NOTIFICATIONS = "LOAD_NOTIFICATIONS";
const LOAD_ERROR = "LOAD_ERROR";
export const MARK_READ = "MARK_READ";

/**
 * Set Initial State
 */

const initialState = {
  notifications: [],
  loading: true,
  loadSuccess: false,
};

/**
 * Action Creators
 */

const loadNotifications = (notifications) => ({
  type: LOAD_NOTIFICATIONS,
  notifications,
});

const loadError = (error) => ({
  type: LOAD_ERROR,
  error,
});

const markRead = (title) => ({
  type: MARK_READ,
  title,
});

/**
 * Thunk Creators
 */

export const fetchNotifications = (keyword) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://gnews.io/api/v4/search?lan=eng&q=${keyword}&token=${process.env.REACT_APP_API_KEY}`
    );
    const payload = data["articles"];
    const finishedReading = fetchHistoryFromLocalStorage();
    if (finishedReading) {
      payload = payload.filter((each) => !finishedReading.includes(each.title));
    }
    saveToLocalStorage(payload);
    dispatch(loadNotifications(payload));
  } catch (e) {
    console.log(e);
    dispatch(loadError());
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

/**
 * Reducer
 */

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_ERROR:
      return {
        ...state,
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
      };

    default:
      return state;
  }
}
