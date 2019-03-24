import React, { Fragment } from "react";
import { RootState } from "../reducers";
import { connect } from "react-redux";

type OwnProps = {
  children?: React.ReactNode;
};

type StateProps = {
  isLoggedIn: boolean;
};

type Props = OwnProps & StateProps;

function LoggedIn({ isLoggedIn, children }: Props) {
  // Use fragment since TS complains otherwise
  return isLoggedIn ? <Fragment>{children}</Fragment> : null;
}

function mapStateToProps({ user }: RootState): StateProps {
  return {
    isLoggedIn: user.loggedIn,
  };
}

export default connect(
  mapStateToProps,
  null,
)(LoggedIn);
