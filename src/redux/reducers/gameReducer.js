import { actionTypes } from "../actions/gameActions";
import {
  getFigure,
  getInitialFigurePosition,
  getInitialWall,
  getNewPositionDown,
  getNewPositionLeft,
  getNewPositionRight,
  getRotatedFigure,
  getWallWithCleanedLines,
  getWallWithFigure,
  isEnoughFreeSpace
} from "../../helpers/gameHelpers";

const defaultState = {
  playerName: "",
  wall: getInitialWall(),
  paused: true,
  points: 0,
  time: 0,
  finished: false,

  figure: null,
  figurePosition: getInitialFigurePosition()
};

export default function(state = defaultState, { type = "", payload = {} }) {
  const { playerName } = payload;
  switch (type) {
    case actionTypes.GAME_START:
      return {
        ...state,
        paused: false
      };
    case actionTypes.GAME_PAUSE:
      return {
        ...state,
        paused: true
      };
    case actionTypes.SET_PLAYER_NAME:
      return {
        ...state,
        playerName
      };
    case actionTypes.TIMER_TICK: {
      const { wall, figure, figurePosition, time, points } = state;
      let figureData = {};

      if (!figure) {
        // if figure wasn't set yet(means game was just started)
        // initialize figure and position
        figureData = {
          figure: getFigure(),
          figurePosition: {
            ...getInitialFigurePosition()
          }
        };
      } else {
        // otherwise try to move figure down
        const newPosition = getNewPositionDown(wall, figure, figurePosition);
        if (newPosition) {
          // if possible move figure down
          figureData = {
            figurePosition: {
              ...newPosition
            }
          };
        } else {
          // or finish figure falling and add new figure to start position
          const { wall: cleanedWall, counter } = getWallWithCleanedLines(
            getWallWithFigure(wall, figure, figurePosition)
          );
          const newFigure = getFigure();
          const newFigurePosition = getInitialFigurePosition();

          figureData = {
            figure: newFigure,
            figurePosition: {
              ...newFigurePosition
            },
            points: points + counter * 10,
            wall: cleanedWall,
            finished: !isEnoughFreeSpace(
              cleanedWall,
              newFigure,
              newFigurePosition
            )
          };
        }
      }
      return {
        ...state,
        time: time + 1,
        ...figureData
      };
    }
    case actionTypes.FIGURE_MOVE_LEFT: {
      const { wall, figure, figurePosition } = state;
      const newPosition = getNewPositionLeft(wall, figure, figurePosition);
      if (newPosition) {
        return { ...state, figurePosition: { ...newPosition } };
      } else {
        return { ...state };
      }
    }
    case actionTypes.FIGURE_MOVE_RIGHT: {
      const { wall, figure, figurePosition } = state;
      const newPosition = getNewPositionRight(wall, figure, figurePosition);
      if (newPosition) {
        return { ...state, figurePosition: { ...newPosition } };
      } else {
        return { ...state };
      }
    }
    case actionTypes.FIGURE_MOVE_DOWN: {
      const { wall, figure, figurePosition } = state;
      const newPosition = getNewPositionDown(wall, figure, figurePosition);
      if (newPosition) {
        return { ...state, figurePosition: { ...newPosition } };
      } else {
        return { ...state };
      }
    }
    case actionTypes.FIGURE_ROTATE: {
      const { wall, figure, figurePosition } = state;
      const newFigureAndPosition = getRotatedFigure(
        wall,
        figure,
        figurePosition
      );
      if (newFigureAndPosition) {
        return { ...state, ...newFigureAndPosition };
      } else {
        return { ...state };
      }
    }
    default:
      return state;
  }
}
