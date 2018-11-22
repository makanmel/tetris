export const actionTypes = {
  SET_NAME: "SET_NAME",
  GAME_START: "GAME_START",
  GAME_PAUSE: "GAME_PAUSE",
  GAME_RESET: "GAME_RESET",
  MOVE_LEFT: "MOVE_LEFT",
  MOVE_RIGHT: "MOVE_RIGHT",
  MOVE_DOWN: "MOVE_DOWN",
  MOVE_UP: "MOVE_UP",
  TIMER: "TIMER"
};

export const setName = () => ({
  type: actionTypes.SET_NAME
});

export const startGame = () => ({
  type: actionTypes.GAME_START
});

export const pauseGame = () => ({
  type: actionTypes.GAME_PAUSE
});

export const resetGame = () => ({
  type: actionTypes.GAME_RESET
});

export const timer = () => ({
  type: actionTypes.TIMER
});

export const moveLeft = () => ({
  type: actionTypes.MOVE_LEFT
});

export const moveRight = () => ({
  type: actionTypes.MOVE_RIGHT
});

export const moveDown = () => ({
  type: actionTypes.MOVE_DOWN
});

export const moveUp = () => ({
  type: actionTypes.MOVE_UP
});
