import { createStore, combineReducers } from "redux";
import gameState from "./gameReducer";
const rootReducer = combineReducers({ gameState });
export default (process.env.MODE_ENV === "development"
  ? createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  : createStore(rootReducer));
