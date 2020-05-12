import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import { storeVerificationState } from "../LocalCache";
import { getAuthUrl } from "../api/authentication";
import { signOut } from "../actions/user";
import AuthUserMenu from "../components/AuthUserMenu";
import GuestUserMenu from "../components/GuestUserMenu";
import { UserState } from "../reducers/user";
import { RootState, DispatchType } from "../reducers";
import { openDialog } from "../components/Popovers";

type StateProps = {
  user: UserState;
};

type DispatchProps = {
  signOut: () => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps;

class UserMenu extends Component<Props, {}> {
  handleSignIn = () => {
    const redirectPath = this.props.location.pathname;
    const verificationState = `${Date.now().toString()}:${redirectPath}`;

    storeVerificationState(verificationState);
    const url = getAuthUrl(verificationState);
    window.location.href = url;
  };

  showSignOutDialog = () => {
    openDialog({
      title: "Sign out?",
      text: "Are you sure you want to sign out?",
      primaryLabel: "Sign out",
      onPrimary: () => this.props.signOut(),
      focusOnCancel: true,
    });
  };

  render() {
    const {
      user: { loggedIn, isLoading, data },
    } = this.props;

    if (isLoading) return null;

    // user is not logged in, guest menu
    if (!loggedIn || (loggedIn && data === null)) {
      return <GuestUserMenu signIn={this.handleSignIn} />;
    }

    // user is logged in, show their profile pic and name
    return <AuthUserMenu userData={data!} signOut={this.showSignOutDialog} />;
  }
}

function mapStateToProps({ user }: RootState): StateProps {
  return {
    user,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    signOut: () => {
      dispatch(signOut());
    },
  };
}

export default withRouter(
  connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps,
  )(UserMenu),
);
