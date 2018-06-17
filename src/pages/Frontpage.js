import React from "react";
import PropTypes from "prop-types";
import SubredditFeed from "containers/SubredditFeed";

function Frontpage({ match: { params } }) {
  const { sortMode } = params;
  return (
    <div className="main-content">
      <SubredditFeed subreddit="" sortMode={sortMode} />
    </div>
  );
}

Frontpage.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Frontpage;
