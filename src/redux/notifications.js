import axios from "axios";
import { saveToLocalStorage, fetchFromLocalStorage } from "./localStorage";
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

/**
 * Thunk Creators
 */

export const fetchNotifications = (keyword) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `https://gnews.io/api/v4/search?q=${keyword}&token=${process.env.REACT_APP_API_KEY}`
    );
    saveToLocalStorage(data["articles"]);
    dispatch(loadNotifications(data["articles"]));
  } catch (e) {
    console.log(e);
    dispatch(loadError());
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

    default:
      return state;
  }
}
