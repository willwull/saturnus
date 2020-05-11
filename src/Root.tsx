import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import {
  initSnoowrap,
  authSnoowrap,
  initRefreshToken,
} from "./actions/snoowrap";
import * as LocalCache from "./LocalCache";
import App from "./App";
import { ThemeState } from "./reducers/theme";
import { RootState } from "./reducers";

// MARK: Types

type StateProps = {
  theme: ThemeState;
  isLoading: boolean;
  errorMsg: string;
};

type DispatchProps = {
  createSnoowrap: () => void;
  createAuthSnoowrap: (code: string) => void;
  createRefreshSnoowrap: (refreshToken: string) => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps;

// MARK: Component

class Root extends Component<Props, {}> {
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
    if (storedTokens && lastActiveUser && storedTokens[lastActiveUser]) {
      const tokens = storedTokens[lastActiveUser];
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

    return <App isLoading={isLoading} theme={this.props.theme} />;
  }
}

// MARK: Redux

function mapStateToProps({ theme, snoowrap }: RootState): StateProps {
  return {
    theme,
    isLoading: snoowrap.isLoading,
    errorMsg: snoowrap.errorMsg,
  };
}

function mapDispatchToProps(dispatch: Function): DispatchProps {
  return {
    createSnoowrap: () => {
      dispatch(initSnoowrap());
    },
    createAuthSnoowrap: (code: string) => {
      dispatch(authSnoowrap(code));
    },
    createRefreshSnoowrap: (refreshToken: string) => {
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
