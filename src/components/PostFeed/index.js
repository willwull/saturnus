import React from "react";
import PropTypes from "prop-types";
import Post from "components/Post";
import PrimaryButton from "components/Buttons/PrimaryButton";
import "./PostFeed.scss";

function PostFeed({ posts, loadMore }) {
  if (posts.length === 0) {
    return <div>No posts :(</div>;
  }

  return (
    <div className="post-feed">
      {posts.map(post => <Post key={post.id} post={post} />)}

      <PrimaryButton className="load-more-btn" onClick={loadMore}>
        Load more
      </PrimaryButton>
    </div>
  );
}

PostFeed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadMore: PropTypes.func.isRequired,
};

export default PostFeed;
