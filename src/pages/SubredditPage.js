import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@marionebl/styled-components";
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
    const shouldShowBanner = !(
      pathname.match(/\/r\/all\/?$/) || pathname.match(/\/r\/popular\/?$/)
    );

    return (
      <Page withBanner={shouldShowBanner}>
        {shouldShowBanner && <SubredditBanner subreddit={subreddit} />}
        <SubredditFeed subreddit={subreddit} sortMode={actualSortMode} />
      </Page>
    );
  }
}

export default SubredditPage;
