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
    const storedState = LocalCache.get("verificationState");
    const storedTokens = LocalCache.get("reddit_auth_tokens");

    if (
      authCallBackCode &&
      verificationState &&
      storedState &&
      storedState === verificationState
    ) {
      // user has just been redirected from reddit after clicking sign in from here
      console.log(`redirected from reddit with: ${authCallBackCode}`);
      this.props.createAuthSnoowrap(authCallBackCode);
    } else if (storedTokens.refresh_token) {
      // user has signed in in the past, use their refresh token to init snoowrap
      this.props.createRefreshSnoowrap(storedTokens.refresh_token);
    } else {
      // default, logged out usage
      this.props.createSnoowrap();
    }
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
