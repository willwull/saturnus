import React from "react";
import PropTypes from "prop-types";
import Post from "components/Post";
import PrimaryButton from "components/Buttons/PrimaryButton";
import "./PostFeed.scss";
import Loading from "../Loading";

function PostFeed({ posts, loadMore, isLoading, isLoadingMore }) {
  if (isLoading) {
    return <Loading type="regular" />;
  }

  if (posts.length === 0) {
    return <div>No posts :(</div>;
  }

  return (
    <div className="post-feed">
      {posts.map(post => <Post key={post.id} post={post} />)}

      <PrimaryButton
        className="load-more-btn"
        onClick={loadMore}
        disabled={isLoadingMore}
      >
        Load more
        {isLoadingMore && <Loading type="inline" />}
      </PrimaryButton>
    </div>
  );
}

PostFeed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isLoadingMore: PropTypes.bool.isRequired,
};

export default PostFeed;
