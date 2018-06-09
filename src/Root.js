import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { initSnoowrap, authSnoowrap, initRefreshToken } from "actions/snoowrap";
import Loading from "components/Loading";
import * as LocalCache from "./LocalCache";
import App from "./App";

class Root extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    createSnoowrap: PropTypes.func.isRequired,
    createAuthSnoowrap: PropTypes.func.isRequired,
    createRefreshSnoowrap: PropTypes.func.isRequired,
    errorMsg: PropTypes.string.isRequired,
  };

  componentDidMount() {
    const url = new URLSearchParams(this.props.location.search);
    const authCallBackCode = url.get("code");
    const verificationState = url.get("state");
    const storedState = LocalCache.getVerificationState();
    const lastActiveUser = LocalCache.getLastActiveUser();
    const storedTokens = LocalCache.getAuthTokens();

    // user has just been redirected from reddit after clicking sign in from here
    if (
      authCallBackCode &&
      verificationState &&
      storedState &&
      storedState === verificationState
    ) {
      console.log(`redirected from reddit with: ${authCallBackCode}`);
      this.props.createAuthSnoowrap(authCallBackCode);

      // after the auth code has been used once, it's no longer valid,
      // so we can clear the stored verification state
      LocalCache.storeVerificationState("");

      // since the state will be of the format "1321313:/r/funny" (see authentication.js)
      // we can get it out from the state and redirect the user to the url
      // they were at when they clicked sign in
      const redirectPath = verificationState.split(":")[1];
      this.props.history.replace(redirectPath);
      return;
    }

    // user has signed in in the past, use their refresh token to init snoowrap
    if (storedTokens && storedTokens[lastActiveUser]) {
      const tokens = storedTokens[lastActiveUser];
      console.log(`trying stored refresh token: ${tokens.refresh_token}`);
      this.props.createRefreshSnoowrap(tokens.refresh_token);
      return;
    }

    // default, logged out usage
    this.props.createSnoowrap();
  }

  render() {
    const { isLoading, errorMsg } = this.props;

    if (errorMsg) {
      return <div>{errorMsg}</div>;
    }

    if (isLoading) {
      return <Loading type="fullscreen" />;
    }

    return <App />;
  }
}

function mapStateToProps({ snoowrap }) {
  return {
    isLoading: snoowrap.isLoading,
    errorMsg: snoowrap.errorMsg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createSnoowrap: () => {
      dispatch(initSnoowrap());
    },
    createAuthSnoowrap: code => {
      dispatch(authSnoowrap(code));
    },
    createRefreshSnoowrap: refreshToken => {
      dispatch(initRefreshToken(refreshToken));
    },
  };
}

// withRouter is necessary for the app to re-render
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Root),
);
