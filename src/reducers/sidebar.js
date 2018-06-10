import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "actions/sidebar";

export default function sidebar(
  state = {
    open: false,
  },
  action,
) {
  switch (action.type) {
    case SIDEBAR_CLOSE:
      return { open: false };
    case SIDEBAR_OPEN:
      return { open: true };
    default:
      return state;
  }
}
