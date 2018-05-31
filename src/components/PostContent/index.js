import React from "react";
import PropTypes from "prop-types";
import { isImgUrl } from "../../utils";
import LinkPreview from "../LinkPreview";
import "./PostContent.scss";

function PostContent({ post }) {
  // TODO: cap text at three rows, make expandable
  if (post.is_self) {
    return <p>{post.selftext}</p>;
  }

  // image
  if (isImgUrl(post.url)) {
    return <img className="post-preview-img" src={post.url} alt={post.title} />;
  }

  // imgur gifv
  if (post.domain === "i.imgur.com" && post.url.indexOf("gifv") !== 0) {
    // .gifv won't work as video src, but .mp4 works
    const vidUrl = post.url.replace(".gifv", ".mp4");
    return (
      <video
        className="post-preview-vid"
        preload="auto"
        autoPlay="autoplay"
        loop="loop"
        controls
        src={vidUrl}
      />
    );
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

  // rich video (e.g. YouTube, Gfycat)
  if (post.post_hint === "rich:video") {
    return <div dangerouslySetInnerHTML={{ __html: post.media.oembed.html }} />;
  }

  // regular link
  return <LinkPreview post={post} />;
}

PostContent.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostContent;
