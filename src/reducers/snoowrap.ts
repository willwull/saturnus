import {
  REQUEST_SNOOWRAP,
  RECEIVE_SNOOWRAP,
  SNOOWRAP_ERROR,
} from "../actions/snoowrap";

export type SnoowrapAuthType = "auth" | "appOnly" | null;
export type SnoowrapState = {
  isLoading: boolean;
  receivedAt: Date | null;
  authType: SnoowrapAuthType;
  errorMsg: string;
};

const defaultState: SnoowrapState = {
  isLoading: true,
  receivedAt: null,
  authType: null,
  errorMsg: "",
};

export default function snoowrap(
  state = defaultState,
  action: any,
): SnoowrapState {
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
