import { REQUEST_SNOOWRAP, RECEIVE_SNOOWRAP } from "actions/snoowrap";

export default function snoowrap(
  state = {
    isLoading: true,
    accessToken: null,
    receivedAt: null,
  },
  action,
) {
  switch (action.type) {
    case REQUEST_SNOOWRAP:
      return { ...state, isLoading: true };
    case RECEIVE_SNOOWRAP:
      return {
        ...state,
        isLoading: false,
        accessToken: action.accessToken,
        receivedAt: action.receivedAt,
      };
    default:
      return state;
  }
}
