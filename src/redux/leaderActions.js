import { getLeaderBoard, saveGameResult } from "../helpers/serverAPIHelpers";

export const actionTypes = {
  LEADER_REQUEST_START: "LEADER_REQUEST_START",
  LEADER_REQUEST_ERROR: "LEADER_REQUEST_ERROR",
  LEADER_FETCH_SUCCESS: "LEADER_FETCH_SUCCESS",
  LEADER_SAVE_SUCCESS: "LEADER_SAVE_SUCCESS",
  LEADER_RESET: "LEADER_RESET"
};

const requestStart = () => ({
  type: actionTypes.LEADER_REQUEST_START
});

const requestError = error => ({
  type: actionTypes.LEADER_REQUEST_ERROR,
  payload: { error }
});

const savingSuccess = () => ({
  type: actionTypes.LEADER_SAVE_SUCCESS
});

const fetchingSuccess = leaders => ({
  type: actionTypes.LEADER_FETCH_SUCCESS,
  payload: { leaders }
});

export const leaderReset = () => ({
  type: actionTypes.LEADER_RESET
});

export const submitResult = gameData => async dispatch => {
  dispatch(requestStart());

  try {
    await saveGameResult(gameData);
    dispatch(savingSuccess());
  } catch ({ message }) {
    dispatch(requestError(message));
  }
};

export const fetchLeaders = () => async dispatch => {
  dispatch(requestStart());

  try {
    const { data } = await getLeaderBoard();
    dispatch(fetchingSuccess(data));
  } catch ({ message }) {
    dispatch(requestError(message));
  }
};
