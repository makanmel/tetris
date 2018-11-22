import {
  getFigure,
  getInitialPosition,
  getInitialWall,
  getNewPositionDown,
  getNewPositionLeft,
  getNewPositionRight,
  getRotatedFigure,
  getCleanWall,
  getWallWithFigure,
  isEnoughFreeSpace
} from "../helpers/gameHelpers";
import { actionTypes } from "./gameActions";
import { actionTypes as loadActionTypes } from "./loadActions";

const defaultState = {
  name: "",
  wall: getInitialWall(),
  figure: null,
  position: {
    ...getInitialPosition()
  },
  paused: true,
  points: 0,
  time: 0,
  finished: false
};

export default function(
  state = defaultState,
  { type = "", payload: { name, gameData } = {} }
) {
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

    case actionTypes.SET_NAME:
      return {
        ...state,
        name
      };
    case actionTypes.MOVE_LEFT:
    case actionTypes.MOVE_RIGHT:
    case actionTypes.MOVE_DOWN: {
      const { wall, figure, figurePosition } = state;
      if (figure) {
        const newPosition = {
          [actionTypes.MOVE_LEFT]: getNewPositionLeft,
          [actionTypes.MOVE_RIGHT]: getNewPositionRight,
          [actionTypes.MOVE_DOWN]: getNewPositionDown
        }[type](wall, figure, figurePosition);
        return {
          ...state,
          ...(newPosition ? { figurePosition: { ...newPosition } } : {})
        };
      } else {
        return {
          ...state
        };
      }
    }

    case actionTypes.MOVE_UP: {
      const { wall, figure, figurePosition } = state;
      const newFigureAndPosition = getRotatedFigure(
        wall,
        figure,
        figurePosition
      );
      return {
        ...state,
        ...(newFigureAndPosition ? newFigureAndPosition : {})
      };
    }

    case actionTypes.TIMER: {
      const { wall, figure, figurePosition, time, points } = state;
      let figureData = {};

      if (!state.figure) {
        // if figure wasn't set yet(means game was just started)
        // initialize figure and position
        figureData = {
          figure: getFigure(),
          figurePosition: {
            ...getInitialPosition()
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
          const { wall: cleanedWall, counter } = getCleanWall(
            getWallWithFigure(wall, figure, figurePosition)
          );
          const newFigure = getFigure();
          const newFigurePosition = getInitialPosition();

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

    case loadActionTypes.GAME_DATA_FETCH_SUCCESS: {
      const { name, wall, figure, figurePosition, points, time } = gameData;

      return {
        ...state,
        name,
        wall,
        figure,
        figurePosition,
        points,
        time,
        paused: true
      };
    }
    default:
      return state;
  }
}
