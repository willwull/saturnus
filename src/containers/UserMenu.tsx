import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import { storeVerificationState } from "../LocalCache";
import { getAuthUrl } from "../api/authentication";
import { fetchUser, signOut } from "../actions/user";
import AuthUserMenu from "../components/AuthUserMenu";
import GuestUserMenu from "../components/GuestUserMenu";
import { UserState } from "../reducers/user";
import { RootState, DispatchType } from "../reducers";

type StateProps = {
  user: UserState;
};

type DispatchProps = {
  fetch: () => void;
  signOut: () => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps;

class UserMenu extends Component<Props, {}> {
  componentDidMount() {
    const { user, fetch } = this.props;

    // user is logged in, but we haven't fetched all data yet
    // TODO: workaround until snoowrap types are fixed
    if (user.loggedIn && !(user.data as any).id) {
      fetch();
    }
  }

  handleSignIn = () => {
    const redirectPath = this.props.location.pathname;
    const verificationState = `${Date.now().toString()}:${redirectPath}`;

    storeVerificationState(verificationState);
    const url = getAuthUrl(verificationState);
    window.location.href = url;
  };

  render() {
    const {
      user: { loggedIn, isLoading, data },
      signOut: signOutFunc,
    } = this.props;

    if (isLoading) return null;

    // user is not logged in, guest menu
    if (!loggedIn && !(data as any).id) {
      return <GuestUserMenu signIn={this.handleSignIn} />;
    }

    // user is logged in, show their profile pic and name
    return <AuthUserMenu userData={data} signOut={signOutFunc} />;
  }
}

function mapStateToProps({ user }: RootState): StateProps {
  return {
    user,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    fetch: () => {
      dispatch(fetchUser());
    },
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
