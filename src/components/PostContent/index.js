import React, { Component } from "react";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";

import { isImgUrl } from "../../utils";
import LinkPreview from "../LinkPreview";
import "./PostContent.scss";

class PostContent extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  state = {
    obfuscated: true,
  };

  showImage = () => {
    this.setState({ obfuscated: false });
  };

  render() {
    const { post } = this.props;

    // spoiler marked posts
    if (post.spoiler && this.state.obfuscated) {
      // spoiler marked text post
      if (post.is_self) {
        return "Spoiler";
      }

      // spoiler marked media post
      const obfuscated = post.preview.images[0].variants.obfuscated.source.url;
      return (
        <div className="obfuscated-wrapper">
          <img
            className="post-preview-img obfuscated-img"
            src={obfuscated}
            alt={post.title}
          />
          <button className="warning-text" onClick={this.showImage}>
            <FaIcon className="warning-icon" icon={["fa", "eye"]} />
            <br />
            This post is spoiler marked, click to view
          </button>
        </div>
      );
    }

    // self post (text)
    if (post.is_self) {
      return (
        <div className="post-self-text">
          <div dangerouslySetInnerHTML={{ __html: post.selftext_html }} />

          {/* gradient overlay that indicates that the text is cut off */}
          <div className="overflow-overlay" />
        </div>
      );
    }

    // image
    if (isImgUrl(post.url)) {
      return (
        <img className="post-preview-img" src={post.url} alt={post.title} />
      );
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
      return (
        <div dangerouslySetInnerHTML={{ __html: post.media.oembed.html }} />
      );
    }

    // regular link
    return <LinkPreview post={post} />;
  }
}

export default PostContent;
