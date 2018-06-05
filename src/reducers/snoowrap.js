import { REQUEST_SNOOWRAP, RECEIVE_SNOOWRAP } from "actions";

export default function snoowrap(
  state = {
    isLoading: true,
    r: null, // instance of snoowrap, created in Root.js
  },
  action,
) {
  switch (action.type) {
    case REQUEST_SNOOWRAP:
      return { ...state, isLoading: true };
    case RECEIVE_SNOOWRAP:
      return { ...state, isLoading: false, r: action.snoowrap };
    default:
      return state;
  }
}
