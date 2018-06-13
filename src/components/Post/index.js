import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import moment from "moment-mini";
import FaIcon from "@fortawesome/react-fontawesome";
import Color from "color";
import randomColor from "randomcolor";

import ContentBox from "components/ContentBox";
import PostContent from "components/PostContent";
import { shortenNumber } from "utils";
import "./Post.scss";
import Flair from "../Flair";

/**
 * Component for a post in the feed
 */
function Post({ post, expanded }) {
  const bgColor = Color(
    randomColor({
      seed: post.subreddit.display_name,
    }),
  );
  const textColor = bgColor.luminosity() < 0.6 ? "white" : "black";

  return (
    <ContentBox className="post-component">
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
        {post.distinguished === "moderator" && (
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
        <div className="title-bar">
          <div className="flairs">
            {/* Link flairs */}
            {post.link_flair_text && (
              <Flair className="post">{post.link_flair_text}</Flair>
            )}

            {/* NSFW tag */}
            {post.over_18 && <Flair className="post nsfw-flair">NSFW</Flair>}

            {/* Spoiler tag */}
            {post.spoiler && (
              <Flair className="post spoiler-flair">Spoiler</Flair>
            )}
          </div>

          <Link to={post.permalink} className="post-title">
            {post.title}
          </Link>
        </div>

        <div className="content-wrapper">
          <PostContent post={post} expanded={expanded} />
        </div>

        <div className="post-info">
          <div className="author">
            {moment.unix(post.created_utc).fromNow()} by {post.author.name}
          </div>
          {post.author_flair_text && (
            <Flair className="author">{post.author_flair_text}</Flair>
          )}
        </div>

        <div className="bottom-row">
          <Link
            to={`/${post.subreddit_name_prefixed}`}
            className="sub"
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {post.subreddit.display_name}
          </Link>

          <Link to={post.permalink} className="comments">
            <FaIcon icon="comment-alt" /> {shortenNumber(post.num_comments)}{" "}
            comments
          </Link>
        </div>
      </div>
    </ContentBox>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  expanded: PropTypes.bool,
};

Post.defaultProps = {
  expanded: false,
};

export default Post;
