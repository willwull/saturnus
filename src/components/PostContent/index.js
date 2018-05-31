import React from "react";
import PropTypes from "prop-types";
import { isImgUrl } from "../../utils";
import LinkPreview from "../LinkPreview";
import "./PostContent.scss";

function PostContent({ post }) {
  // TODO: cap text at three rows, make expandable
  if (post.is_self) {
    return (
      <div className="post-self-text">
        <p dangerouslySetInnerHTML={{ __html: post.selftext_html }} />

        {/* gradient overlay that indicates that the text is cut off */}
        <div className="overflow-overlay" />
      </div>
    );
  }

  // image
  if (isImgUrl(post.url)) {
    return <img className="post-preview-img" src={post.url} alt={post.title} />;
  }

  // imgur gifv
  if (post.domain === "i.imgur.com" && post.url.indexOf("gifv") !== 0) {
    // .gifv won't work as video src, but .mp4 works
    const vidUrl = post.url.replace(".gifv", ".mp4");

    // muted needs to be set for autoplay to work on Chrome
    return (
      <video
        className="post-preview-vid"
        preload="auto"
        autoPlay="autoplay"
        loop="loop"
        controls
        muted
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
