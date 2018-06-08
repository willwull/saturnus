import reddit from "api/reddit";

export const SET_USER_STATUS = "SET_USER_STATUS";
export const REQUEST_USER = "REQUEST_USER";
export const RECEIVED_USER = "RECEIVED_USER";

export function setUserStatus(isLoggedIn) {
  return {
    type: SET_USER_STATUS,
    status: isLoggedIn,
  };
}

function setUser(user) {
  return { type: RECEIVED_USER, user };
}

export function fetchUser() {
  return async dispatch => {
    const r = reddit.getSnoowrap();
    dispatch({
      type: REQUEST_USER,
    });
    const user = await r.getMe();
    console.log(user);
    dispatch(setUser(user));
  };
}
