import React from "react";
import PropTypes from "prop-types";

import Post from "components/Post";
import PrimaryButton from "components/Buttons/PrimaryButton";
import FeedSortOptions from "components/FeedSortOptions";
import Loading from "components/Loading";
import "./PostFeed.scss";

function PostFeed({
  posts,
  loadMore,
  isLoading,
  isLoadingMore,
  currentSort,
  currentTimeSort,
  subreddit,
}) {
  let content;
  if (isLoading) {
    content = <Loading type="regular" />;
  } else if (posts.length === 0) {
    content = <div>No posts :(</div>;
  } else {
    content = (
      <React.Fragment>
        {posts.map(post => <Post key={post.id} post={post} />)}

        <PrimaryButton
          className="load-more-btn"
          onClick={loadMore}
          disabled={isLoadingMore}
        >
          Load more
          {isLoadingMore && <Loading type="inline" />}
        </PrimaryButton>
      </React.Fragment>
    );
  }

  return (
    <div className="post-feed">
      <FeedSortOptions
        currentSort={currentSort}
        subreddit={subreddit}
        currentTimeSort={currentTimeSort}
      />
      {content}
    </div>
  );
}

PostFeed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
  currentSort: PropTypes.string.isRequired,
  currentTimeSort: PropTypes.string,
  subreddit: PropTypes.string,
};

PostFeed.defaultProps = {
  subreddit: "",
  currentTimeSort: "",
};

export default PostFeed;
