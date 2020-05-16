import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../reducers";

type Props = {
  children?: React.ReactNode;
};

function LoggedIn({ children }: Props) {
  const isLoggedIn = useSelector<RootState>(state => state.user.loggedIn);

  // Use fragment since TS complains otherwise
  return isLoggedIn ? <Fragment>{children}</Fragment> : null;
}

export default LoggedIn;
