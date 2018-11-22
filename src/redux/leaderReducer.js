import { actionTypes } from "../actions/leaderBoardActions";

const defaultState = {
  leaders: [],
  requestInProgress: false,
  saveSuccess: false,
  error: ""
};

export default (state = defaultState, { type = "", payload = {} }) => {
  const { leaders, error } = payload;
  switch (type) {
    case actionTypes.LEADER_REQUEST_START:
      return {
        ...state,
        requestInProgress: true
      };

    case actionTypes.LEADER_FETCH_SUCCESS:
      return {
        ...state,
        leaders,
        requestInProgress: false
      };

    case actionTypes.LEADER_SAVE_SUCCESS:
      return {
        ...state,
        saveSuccess: true,
        requestInProgress: false
      };

    case actionTypes.LEADER_REQUEST_ERROR:
      return {
        ...state,
        error,
        requestInProgress: false
      };

    case actionTypes.LEADER_RESET:
      return {
        ...defaultState
      };

    default:
      return state;
  }
};
