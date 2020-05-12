import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions/sidebar";

export type SidebarState = {
  open: boolean;
  hasOpenedOnce: boolean;
};

export default function sidebar(
  state: SidebarState = {
    open: false,
    hasOpenedOnce: false,
  },
  action: any,
): SidebarState {
  switch (action.type) {
    case SIDEBAR_CLOSE:
      return { ...state, open: false };
    case SIDEBAR_OPEN:
      return { ...state, open: true, hasOpenedOnce: true };
    default:
      return state;
  }
}
