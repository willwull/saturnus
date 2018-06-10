import {
  RECEIVED_USER,
  SET_USER_STATUS,
  REQUEST_USER,
  USER_SIGN_OUT,
} from "actions/user";

export default function user(
  state = {
    loggedIn: false,
    isLoading: false,
    data: {},
  },
  action,
) {
  switch (action.type) {
    case REQUEST_USER:
      return { ...state, isLoading: true };
    case SET_USER_STATUS:
      return { ...state, loggedIn: action.status };
    case RECEIVED_USER:
      return { ...state, loggedIn: true, isLoading: false, data: action.user };
    case USER_SIGN_OUT:
      return { loggedIn: false, isLoading: false, data: {} };
    default:
      return state;
  }
}
