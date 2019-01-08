import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import SubredditFeed from "../containers/SubredditFeed";
import SubredditBanner from "../containers/SubredditBanner";
import { PostsSortMode } from "../reducers/posts";

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

type Props = RouteComponentProps<SubPageParams>;

class SubredditPage extends Component<Props, {}> {
  render() {
    const {
      location: { pathname },
      match: { params },
    } = this.props;
    const { subreddit, sortMode } = params;

    const actualSortMode = sortMode === "best" || !sortMode ? "hot" : sortMode;
    const inAllOrPopular = /^\/r\/(all|popular)\/?$/.test(pathname);
    const notInFrontPage = /^\/r/.test(pathname);
    const shouldShowBanner = !inAllOrPopular && notInFrontPage;

    return (
      <Page withBanner={shouldShowBanner}>
        {shouldShowBanner && <SubredditBanner subreddit={subreddit} />}
        <SubredditFeed
          subreddit={subreddit || ""}
          sortMode={actualSortMode as PostsSortMode}
        />
      </Page>
    );
  }
}

export default SubredditPage;
