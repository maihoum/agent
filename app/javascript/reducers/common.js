import {
  APP_LOAD,
  REDIRECT,
  LOGOUT,
  SETTINGS_SAVED,
  LOGIN,
  REGISTER,
  HOME_PAGE_UNLOADED,
  SETTINGS_PAGE_UNLOADED,
  LOGIN_PAGE_UNLOADED,
  REGISTER_PAGE_UNLOADED
} from "../constants/actionTypes";

const defaultState = {
  appName: "Maihoum",
  accessToken: null,
  viewChangeCounter: 0
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        accessToken: action.accessToken || null,
        appLoaded: true,
        currentUser: action.payload ? action.payload.data : null
      };
    case REDIRECT:
      return { ...state, redirectTo: null };
    case LOGOUT:
      return {
        ...state,
        redirectTo: "/",
        accessToken: null,
        currentUser: null
      };
    case SETTINGS_SAVED:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        currentUser: action.error ? state.currentUser : action.payload
      };
    case LOGIN:
      return {
        ...state,
        redirectTo: action.error ? null : "/",
        accessToken: action.error ? null : action.payload.auth.token,
        currentUser: action.error ? null : action.payload.data
      };
    case REGISTER:
      return {
        ...state,
        redirectTo: action.error ? null : "/registerConfirm"
      };
    case HOME_PAGE_UNLOADED:
    case SETTINGS_PAGE_UNLOADED:
    case LOGIN_PAGE_UNLOADED:
    case REGISTER_PAGE_UNLOADED:
      return { ...state, viewChangeCounter: state.viewChangeCounter + 1 };
    default:
      return state;
  }
};
