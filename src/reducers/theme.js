import { SET_THEME } from "actions/theme";

export default function theme(
  state = {
    primaryColor: "#1e7cf7",
  },
  action,
) {
  switch (action.type) {
    case SET_THEME:
      return action.theme;
    default:
      return state;
  }
}
