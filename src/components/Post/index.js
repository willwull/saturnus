import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import FaIcon from "@fortawesome/react-fontawesome";
import Color from "color";
import randomColor from "randomcolor";

import PostContent from "../PostContent";
import { shortenNumber } from "../../utils";
import "./Post.scss";

/**
 * Component for a post in the feed
 */
function Post({ post }) {
  const bgColor = Color(
    randomColor({
      seed: post.subreddit.display_name,
    }),
  );
  const textColor = bgColor.luminosity() < 0.6 ? "white" : "black";

  return (
    <div className="post-component">
      <div className="score">
        {/* TODO: implement voting functionality */}
        <button className="vote-btn">
          <FaIcon icon="arrow-up" />
        </button>

        <div className="number">{shortenNumber(post.score)}</div>

        <button className="vote-btn">
          <FaIcon icon="arrow-down" />
        </button>
      </div>

      {/* Actual post content */}
      <div className="data">
        <div className="title">{post.title}</div>

        <div className="content-wrapper">
          <PostContent post={post} />
        </div>

        <div className="date">
          {moment.unix(post.created_utc).fromNow()} by {post.author.name}
        </div>

        <div className="bottom-row">
          <div
            className="sub"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {post.subreddit.display_name}
          </div>

          <div className="comments">
            <FaIcon icon="comment-alt" /> {shortenNumber(post.num_comments)}{" "}
            comments
          </div>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Post;