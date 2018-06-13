import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import PrimaryButton from "components/Buttons/PrimaryButton";
import { storeVerificationState } from "LocalCache";
import { getAuthUrl } from "api/authentication";
import { fetchUser, signOut } from "actions/user";
import UserMenu from "components/UserMenu";

class LoggedInUserMenu extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    fetch: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { user, fetch } = this.props;

    // user is logged in, but we haven't fetched all data yet
    if (user.loggedIn && !user.data.id) {
      fetch();
    }
  }

  onClick = () => {
    const redirectPath = this.props.location.pathname;
    const verificationState = `${Date.now().toString()}:${redirectPath}`;

    storeVerificationState(verificationState);
    const url = getAuthUrl(verificationState);
    window.location = url;
  };

  render() {
    const {
      user: { loggedIn, isLoading, data },
      signOut: signOutFunc,
    } = this.props;

    if (isLoading) return null;

    // user is not logged in, show sign in button
    if (!loggedIn && !data.id) {
      return (
        <PrimaryButton className="signin-btn" onClick={this.onClick}>
          Sign in
        </PrimaryButton>
      );
    }

    // user is logged in, show their profile pic and name
    return <UserMenu userData={data} signOut={signOutFunc} />;
  }
}

function mapStateToProps({ user }) {
  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
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
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(LoggedInUserMenu),
);
