import { createStore, combineReducers } from "redux";

import gameState from "./reducers/gameReducer";
const { log } = window.console;

const rootReducer = combineReducers({ gameState });

const store =
  process.env.NODE_ENV === "development"
    ? createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    : createStore(rootReducer);

log(store.getState());

export default store;
