import React, { Component } from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import SubredditFeed from "../containers/SubredditFeed";
import SubredditBanner from "../containers/SubredditBanner";
import { PostsSortMode } from "../reducers/posts";
import { RootState } from "../reducers";
import ImageMessage from "../components/ImageMessage";
import { connect } from "react-redux";
import Helmet from "react-helmet";

// MARK: Types

type PageProps = {
  withBanner: boolean;
};

const Page = styled.div`
  margin-top: ${(props: PageProps) => (props.withBanner ? "50px" : "70px")};
`;

export type SubPageParams = {
  subreddit: string;
  sortMode: string;
};

type StateProps = {
  error: boolean;
};

type Props = StateProps & RouteComponentProps<SubPageParams>;

// MARK: Component

class SubredditPage extends Component<Props, {}> {
  render() {
    const {
      location: { pathname },
      match: { params },
      error,
    } = this.props;
    const { subreddit, sortMode } = params;

    if (error) {
      return (
        <Page withBanner={false}>
          <ImageMessage page={"Bug"} />;
        </Page>
      );
    }

    const actualSortMode = sortMode === "best" || !sortMode ? "hot" : sortMode;
    const inAllOrPopular = /^\/r\/(all|popular)\/?$/.test(pathname);
    const notInFrontPage = /^\/r/.test(pathname);
    const shouldShowBanner = !inAllOrPopular && notInFrontPage;

    return (
      <Page withBanner={shouldShowBanner}>
        <Helmet>
          <title>r/{subreddit}</title>
        </Helmet>

        {shouldShowBanner && <SubredditBanner subreddit={subreddit} />}
        <SubredditFeed
          subreddit={subreddit || ""}
          sortMode={actualSortMode as PostsSortMode}
        />
      </Page>
    );
  }
}

// MARK: Redux

function mapStateToProps({ posts }: RootState, ownProps: Props): StateProps {
  const {
    match: { params },
  } = ownProps;
  const { subreddit } = params;
  const thisSub = posts.bySubreddit[subreddit] || { error: false };

  return {
    error: thisSub.error,
  };
}

export default connect(
  mapStateToProps,
  null,
)(SubredditPage);
