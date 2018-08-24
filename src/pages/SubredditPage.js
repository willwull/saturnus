import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SubredditFeed from "containers/SubredditFeed";
import SubredditBanner from "containers/SubredditBanner";

const Page = styled.div`
  margin-top: ${props => (props.withBanner ? "50px" : "70px")};
`;

class SubredditPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // from react-router
    location: PropTypes.object.isRequired,
  };

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
        <SubredditFeed subreddit={subreddit || ""} sortMode={actualSortMode} />
      </Page>
    );
  }
}

export default SubredditPage;
