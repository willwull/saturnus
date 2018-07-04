import React, { Component } from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";
import { transparentize } from "polished";
import FaIcon from "@fortawesome/react-fontawesome";

import { isImgUrl } from "utils";
import LinkPreview from "components/LinkPreview";
import "./PostContent.scss";

const ContentOverflowGradient = styled.div`
  pointer-events: none;
  position: absolute;
  top: 75%;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    0deg,
    ${props => props.theme.contentBg},
    ${props => transparentize(1, props.theme.contentBg)}
  );
`;

const MediaPreviewStyles = css`
  width: 100%;
  max-height: var(--max-content-height);
  object-fit: contain;
  margin-bottom: 10px;
  background: ${props => transparentize(0.3, props.theme.body)};
`;

const ImgPreview = styled.img`
  ${MediaPreviewStyles};
`;

const VideoPreview = styled.video`
  ${MediaPreviewStyles};
`;

const SelfText = styled.div`
  a {
    color: ${props => props.theme.primary};
  }
`;

class PostContent extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    expanded: PropTypes.bool,
  };

  static defaultProps = {
    expanded: false,
  };

  state = {
    obfuscated: true,
  };

  showImage = () => {
    this.setState({ obfuscated: false });
  };

  render() {
    const { post, expanded } = this.props;

    // spoiler marked posts
    if ((post.spoiler || post.over_18) && this.state.obfuscated && !expanded) {
      // spoiler marked text post
      if (post.is_self) {
        return <div className="post-self-text">Hidden text</div>;
      }

      // spoiler marked media post
      if (post.preview) {
        const resolutionsArr =
          post.preview.images[0].variants.obfuscated.resolutions;

        // use the highest res obfuscated image, but not src, since
        // the src can be absurdly big
        const obfuscated = resolutionsArr[resolutionsArr.length - 1].url;

        return (
          <div className="obfuscated-wrapper">
            <ImgPreview
              className="obfuscated-img"
              src={obfuscated}
              alt={post.title}
            />
            <button className="warning-text" onClick={this.showImage}>
              <FaIcon className="warning-icon" icon={["fa", "eye"]} />
              <br />
              This post is hidden, click to view
            </button>
          </div>
        );
      }

      // link post with no preview image
      return <LinkPreview post={post} />;
    }

    // self post (text)
    if (post.is_self) {
      const classes = expanded ? "post-self-text" : "post-self-text default";
      return (
        <SelfText className={classes}>
          <div dangerouslySetInnerHTML={{ __html: post.selftext_html }} />

          {/* gradient overlay that indicates that the text is cut off */}
          {!expanded && <ContentOverflowGradient />}
        </SelfText>
      );
    }

    // image
    if (isImgUrl(post.url)) {
      return <ImgPreview src={post.url} alt={post.title} />;
    }

    // imgur gifv
    if (post.domain === "i.imgur.com" && post.url.indexOf("gifv") !== 0) {
      // .gifv won't work as video src, but .mp4 works
      const vidUrl = post.url.replace(".gifv", ".mp4");

      // muted needs to be set for autoplay to work on Chrome
      return (
        <VideoPreview
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
      return <ImgPreview src={`${post.url}.jpg`} alt={post.title} />;
    }

    // v.redd.it videos
    if (post.is_video) {
      // TODO: support reddit videos with audio
      const videoStream = post.media.reddit_video.fallback_url;
      return (
        <VideoPreview
          preload="auto"
          loop="loop"
          controls
          autoPlay={!!post.media.reddit_video.is_gif}
          src={videoStream}
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
