import { storeTheme } from "../LocalCache";
import { ThunkDispatch } from "redux-thunk";
import { ThemeState } from "../reducers/theme";
import { Action } from "redux";
import { RootState } from "../reducers";

export const SET_DARK_THEME = "SET_DARK_THEME";
export const SET_LIGHT_THEME = "SET_LIGHT_THEME";

export function toggleTheme() {
  return (
    dispatch: ThunkDispatch<ThemeState, void, Action>,
    getState: () => RootState,
  ) => {
    const { isDark } = getState().theme;
    if (isDark) {
      dispatch({
        type: SET_LIGHT_THEME,
      });
    } else {
      dispatch({
        type: SET_DARK_THEME,
      });
    }

    // cache if the user has dark theme or not
    // the `isDark` variable is the previous theme, so
    // we negate the bool value before storing it
    storeTheme(!isDark);
  };
}
