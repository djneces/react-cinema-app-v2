import {
  AUTH_INIT,
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_ERROR,
  AUTH_LOGOUT,
  AUTH_CHANGE,
} from '../actions/actionTypes';

const INITIAL_STATE = {
  currentUser: null,
  isAuthenticated: null,
  isLoading: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTH_INIT:
      return {
        ...state,
        isAuthenticated: payload,
      };
    case AUTH_START:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        currentUser: { ...state.currentUser, id: payload },
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_CHANGE:
      return {
        ...state,
        isAuthenticated: payload.authStatus,
        currentUser: {
          ...state.currentUser,
          email: payload.email,
          id: payload.id,
          username: payload.givenName,
        },
      };
    case AUTH_ERROR:
    case AUTH_LOGOUT:
      return {
        ...state,
        currentUser: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
