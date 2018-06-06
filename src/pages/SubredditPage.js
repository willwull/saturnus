import React from "react";
import PropTypes from "prop-types";
import PostFeedContainer from "containers/PostFeedContainer";

function SubredditPage({ match: { params } }) {
  const { subreddit } = params;
  return (
    <div className="main-content">
      <PostFeedContainer subreddit={subreddit} />
    </div>
  );
}

SubredditPage.propTypes = {
  match: PropTypes.object.isRequired, // from react-router
};

export default SubredditPage;
