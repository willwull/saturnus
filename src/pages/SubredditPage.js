import React from "react";
import PropTypes from "prop-types";
import SubredditFeed from "containers/SubredditFeed";

function SubredditPage({ match: { params } }) {
  const { subreddit } = params;
  return (
    <div className="main-content">
      <SubredditFeed subreddit={subreddit} />
    </div>
  );
}

SubredditPage.propTypes = {
  match: PropTypes.object.isRequired, // from react-router
};

export default SubredditPage;
