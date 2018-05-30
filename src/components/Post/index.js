import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import PostContent from "./PostContent";
import "./Post.css";

/**
 * Component for a post in the feed
 */
function Post({ post }) {
  return (
    <div className="post-component">
      <div className="post-score">{post.score}</div>

      <div className="post-data">
        <div className="post-title">{post.title}</div>

        <PostContent post={post} />

        <div className="post-date">
          {moment.unix(post.created_utc).fromNow()} by {post.author.name}
        </div>

        <div className="post-sub">{post.subreddit.display_name}</div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
