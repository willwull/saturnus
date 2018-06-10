import {
  REQUEST_SNOOWRAP,
  RECEIVE_SNOOWRAP,
  SNOOWRAP_ERROR,
} from "actions/snoowrap";

export default function snoowrap(
  state = {
    isLoading: true,
    receivedAt: null,
    authType: null,
    errorMsg: "",
  },
  action,
) {
  switch (action.type) {
    case REQUEST_SNOOWRAP:
      return { ...state, isLoading: true, errorMsg: "" };
    case RECEIVE_SNOOWRAP:
      return {
        ...state,
        isLoading: false,
        receivedAt: action.receivedAt,
        errorMsg: "",
        authType: action.authType,
      };
    case SNOOWRAP_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMsg: "Something went wrong :(",
      };
    default:
      return state;
  }
}
