import React from "react";
import Page from "../components/Page";
import { UserState } from "../reducers/user";
import { RouteComponentProps } from "react-router";
import { RootState } from "../reducers";
import { connect } from "react-redux";
import Loading from "../components/Loading";
import MySavedContent from "../containers/MySavedContent";
import { Feed } from "../components/PostFeed/styles";
import Helmet from "react-helmet";

type StateProps = {
  user: UserState;
};

type ParamProps = {
  username: string;
};

type Props = StateProps & RouteComponentProps<ParamProps>;

function SavedPosts({ user, match }: Props) {
  if (user.loggedIn && user.data === null) {
    return (
      <Page>
        <Loading type="regular" />
      </Page>
    );
  }

  if (user && user.data !== null) {
    if (match.params.username === user.data.name) {
      return (
        <Page>
          <Helmet>
            <title>Saved content</title>
          </Helmet>

          <Feed>
            <MySavedContent />
          </Feed>
        </Page>
      );
    }
  }

  return <Page>You don't have access to this page</Page>;
}

function mapStateToProps({ user }: RootState): StateProps {
  return {
    user,
  };
}

export default connect(
  mapStateToProps,
  null,
)(SavedPosts);
