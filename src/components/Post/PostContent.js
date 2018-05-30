import React from "react";
import PropTypes from "prop-types";
import { isImgUrl } from "../../utils";

function PostContent({ post }) {
  // TODO: cap text at three rows, make expandable
  if (post.is_self) {
    return <p>{post.selftext}</p>;
  }

  // image preview
  if (isImgUrl(post.url)) {
    return <img className="post-preview-img" src={post.url} alt={post.title} />;
  }

  // handle non-direct imgur links
  if (post.domain === "imgur.com") {
    return (
      <img
        className="post-preview-img"
        src={`${post.url}.jpg`}
        alt={post.title}
      />
    );
  }

  return null;
}

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostContent;
