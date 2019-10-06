import GameCore from './GameCore.js';

export const ACTIONS = {
  SET_GAME: 'SET_GAME',
  SET_SCOREBOARD: 'SET_SCOREBOARD',
  SET_HOLE: 'SET_HOLE',
  SET_MOLE: 'SET_MOLE',
};

export const initialState = {
  ...GameCore.CONSTANTS.GAME,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_GAME:
      return {
        ...state,
        ...action.game,
      };

    case ACTIONS.SET_SCOREBOARD:
      console.log('ACTIONS.SET_SCOREBOARD', state); // TODO: REMOVE DEBUG LOG ✴️️️️✴️️️️✴️
      console.log('ACTIONS.SET_SCOREBOARD', action); // TODO: REMOVE DEBUG LOG ✴️️️️✴️️️️✴️
      return {
        ...state,
        score: action.score,
        shots: action.shots,
        hits: action.hits,
      };

    case ACTIONS.SET_HOLE:
      return {
        ...state,
        holes: {
          ...state.holes,
          [action.id]: action.hole,
        },
      };

    case ACTIONS.SET_MOLE:
      return {
        ...state,
        moles: {
          ...state.moles,
          [action.id]: {
            // ...state.moles[action.id],
            ...action.mole,
          },
        },
      };

    default:
      return state;
  }
};
