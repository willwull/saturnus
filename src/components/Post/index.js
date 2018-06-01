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

        {/* Stickied icon */}
        {post.stickied && (
          <div className="mod-icon">
            <FaIcon icon="thumbtack" />
          </div>
        )}

        {/* Mod distinguished icon */}
        {post.stickied && (
          <div className="mod-icon">
            <FaIcon icon="shield" />
          </div>
        )}

        {/* Gilded icon */}
        {post.gilded !== 0 && (
          <div className="gold-icon">
            <span className="fa-layers fa-fw">
              <FaIcon className="circle" icon="circle" />
              <FaIcon className="star" icon="star" transform="shrink-6" />
            </span>
            {post.gilded}
          </div>
        )}
      </div>

      {/* Actual post content */}
      <div className="data">
        <div className="title">
          <div className="flairs">
            {/* Link flairs */}
            {post.link_flair_text && (
              <span className="flair post">{post.link_flair_text}</span>
            )}

            {post.spoiler && (
              <span className="flair post spoiler-flair">Spoiler</span>
            )}
          </div>

          {post.title}
        </div>

        <div className="content-wrapper">
          <PostContent post={post} />
        </div>

        <div className="date">
          {moment.unix(post.created_utc).fromNow()} by {post.author.name}
          {post.author_flair_text && (
            <span className="flair author">{post.author_flair_text}</span>
          )}
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
