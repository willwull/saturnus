import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@marionebl/styled-components";
import SubredditFeed from "containers/SubredditFeed";
import SubredditBanner from "containers/SubredditBanner";

const Page = styled.div`
  margin-top: 50px;
`;

class SubredditPage extends Component {
  static propTypes = {
    match: PropTypes.object.isRequired, // from react-router
  };

  render() {
    const {
      match: { params },
    } = this.props;
    const { subreddit } = params;

    return (
      <Page>
        <SubredditBanner subreddit={subreddit} />
        <SubredditFeed subreddit={subreddit} />
      </Page>
    );
  }
}

export default SubredditPage;
