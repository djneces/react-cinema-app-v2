/* eslint-disable import/no-anonymous-default-export */
import {
  ADD_ADDON,
  REMOVE_ADDON,
  CLEAR_ALL_ADDONS,
} from '../actions/actionTypes';

const initialState = { addOns: {} };

const addons = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_ADDON:
      return {
        ...state,
        addOns: {
          ...state.addOns,
          [payload.id]: {
            ...state.addOns[payload.id],
            ...payload,
            quantity:
              state.addOns[payload.id] === undefined
                ? 1
                : ++state.addOns[payload.id].quantity,
          },
        },
      };
    case REMOVE_ADDON:
      return {
        ...state,
        addOns: {
          ...state.addOns,
          [payload.id]: {
            ...state.addOns[payload.id],
            ...payload,
            quantity:
              state.addOns[payload.id] === undefined
                ? 0
                : state.addOns[payload.id].quantity > 1
                ? --state.addOns[payload.id].quantity
                : 0,
          },
        },
      };
    case CLEAR_ALL_ADDONS:
      return { ...state, addOns: {} };
    default:
      return state;
  }
};

export default addons;
