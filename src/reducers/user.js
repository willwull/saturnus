import {
  RECEIVED_USER,
  SET_USER_STATUS,
  REQUEST_USER,
  USER_SIGN_OUT,
  REQUEST_MY_SUBS,
  RECEIVE_MY_SUBS,
} from "actions/user";

export default function user(
  state = {
    loggedIn: false,
    isLoading: false,
    data: {},
    subsLoading: false,
    subscriptions: [],
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
      return { ...state, loggedIn: false, isLoading: false, data: {} };
    case REQUEST_MY_SUBS:
      return { ...state, subsLoading: true };
    case RECEIVE_MY_SUBS:
      return {
        ...state,
        subsLoading: false,
        subscriptions: action.subscriptions,
      };
    default:
      return state;
  }
}
