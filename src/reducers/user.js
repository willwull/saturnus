import { RECEIVED_USER, SET_USER_STATUS, REQUEST_USER } from "actions/user";

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
      return { ...state, isLoading: false, data: action.user };
    default:
      return state;
  }
}
