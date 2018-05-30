import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import PostContent from "./PostContent";
import { shortenNumber } from "../../utils";
import "./Post.scss";

/**
 * Component for a post in the feed
 */
function Post({ post }) {
  return (
    <div className="post-component">
      <div className="score">{shortenNumber(post.score)}</div>

      <div className="data">
        <div className="title">{post.title}</div>

        <div className="content-wrapper">
          <PostContent post={post} />
        </div>

        <div className="date">
          {moment.unix(post.created_utc).fromNow()} by {post.author.name}
        </div>

        <div className="sub">{post.subreddit.display_name}</div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;
