export const actionTypes = {
  SET_PLAYER_NAME: "SET_PLAYER_NAME",
  GAME_START: "GAME_START",
  GAME_PAUSE: "GAME_PAUSE",
  TIMER_TICK: "TIMER_TICK",

  FIGURE_MOVE_LEFT: "FIGURE_MOVE_LEFT",
  FIGURE_MOVE_RIGHT: "FIGURE_MOVE_RIGHT",
  FIGURE_MOVE_DOWN: "FIGURE_MOVE_DOWN",
  FIGURE_ROTATE: "FIGURE_ROTATE"
};

export const setPlayerName = playerName => ({
  type: actionTypes.SET_PLAYER_NAME,
  payload: {
    playerName
  }
});

export const startGame = () => ({
  type: actionTypes.GAME_START
});

export const pauseGame = () => ({
  type: actionTypes.GAME_PAUSE
});

export const timerTick = () => {
  return { type: actionTypes.TIMER_TICK };
};

export const moveFigureLeft = () => {
  return { type: actionTypes.FIGURE_MOVE_LEFT };
};

export const moveFigureRight = () => {
  return { type: actionTypes.FIGURE_MOVE_RIGHT };
};

export const moveFigureDown = () => {
  return { type: actionTypes.FIGURE_MOVE_DOWN };
};

export const figureRotate = () => {
  return {
    type: actionTypes.FIGURE_ROTATE
  };
};
