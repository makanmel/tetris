import { actionTypes } from "./loadActions";

const defaultState = {
  games: [],
  requestInProgress: false,
  saveSuccess: false,
  error: ""
};

export default (state = defaultState, { type = "", payload = {} }) => {
  const { games, error } = payload;
  switch (type) {
    case actionTypes.GAME_DATA_REQUEST_START:
      return {
        ...state,
        requestInProgress: true,
        saveSuccess: false
      };

    case actionTypes.GAMES_LIST_FETCH_SUCCESS:
      return {
        ...state,
        games,
        requestInProgress: false
      };

    case actionTypes.GAME_DATA_FETCH_SUCCESS:
      return {
        ...state,
        requestInProgress: false
      };

    case actionTypes.GAME_DATA_SAVE_SUCCESS:
      return {
        ...state,
        saveSuccess: true,
        requestInProgress: false
      };

    case actionTypes.GAME_DATA_REQUEST_ERROR:
      return {
        ...state,
        error,
        requestInProgress: false
      };

    default:
      return state;
  }
};
