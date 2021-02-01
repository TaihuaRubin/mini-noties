import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import notificationReducer from "./notifications";

const reducer = combineReducers({ notificationReducer });
const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = createStore(reducer, middleware);

console.log("im store state", store.getState());
export default store;
