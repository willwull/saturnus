import { SIDEBAR_OPEN, SIDEBAR_CLOSE } from "../actions/sidebar";

export type SidebarState = {
  open: boolean;
};

export default function sidebar(
  state: SidebarState = {
    open: false,
  },
  action: any,
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
