import React, { Component } from "react";
import { Submission } from "snoowrap";
import { isImgUrl } from "../../utils";
import LinkPreview from "../LinkPreview";
import TextContent from "../TextContent";
import Icon from "../Icon";
import VideoContent from "./VideoContent";
import {
  ContentOverflowGradient,
  ImgPreview,
  SelfText,
  RichMedia,
  ImgPreviewContainer,
} from "./styles";
import "./PostContent.scss";
import ImgWithIntrinsicSize from "../ImgWithIntrinsicSize";

type Props = {
  post: Submission;
  expanded?: boolean; // true if on PostPage, false in post feed
};

type State = {
  obfuscated: boolean;
};

class PostContent extends Component<Props, State> {
  static defaultProps = {
    expanded: false,
  };

  state: State = {
    obfuscated: true,
  };

  showImage = () => {
    this.setState({ obfuscated: false });
  };

  renderObfuscationOverlay(type: "image" | "video") {
    const icons = {
      image: "fa eye",
      video: "fa video",
    };
    return (
      <div className="obfuscated-wrapper">
        <button className="warning-text" onClick={this.showImage}>
          <div className="warning-icon">
            <Icon icon={icons[type]} />
          </div>
          <br />
          This post is hidden, click to view
        </button>
      </div>
    );
  }

  render() {
    const { post, expanded } = this.props;
    const isHidden = (post.spoiler || post.over_18) && this.state.obfuscated;

    // self post (text)
    if (post.is_self) {
      if (!post.selftext_html) {
        return null;
      }

      if (isHidden && !expanded) {
        return <SelfText>[Hidden text]</SelfText>;
      }

      return (
        <SelfText expanded={!!expanded}>
          <TextContent>{post.selftext_html}</TextContent>

          {/* gradient overlay that indicates that the text is cut off */}
          {!expanded && <ContentOverflowGradient />}
        </SelfText>
      );
    }

    const className = isHidden ? "obfuscated-media" : "";

    // image
    if (isImgUrl(post.url) || post.domain === "imgur.com") {
      // handle non-direct imgur links
      let src = post.url;
      if (post.domain === "imgur.com") {
        src = `${post.url}.jpg`;
      }

      if (!post.preview) {
        return (
          <ImgPreviewContainer>
            <img src={src} alt={post.title} className={className} />
            {isHidden && this.renderObfuscationOverlay("image")}
          </ImgPreviewContainer>
        );
      }

      const intrinsicSize = {
        width: post.preview.images[0].source.width,
        height: post.preview.images[0].source.height,
      };

      return (
        <ImgPreviewContainer>
          <ImgWithIntrinsicSize
            intrinsicSize={intrinsicSize}
            src={src}
            alt={post.title}
            className={className}
          />
          {isHidden && this.renderObfuscationOverlay("image")}
        </ImgPreviewContainer>
      );
    }

    // imgur gifv
    if (post.domain === "i.imgur.com" && post.url.indexOf("gifv") !== 0) {
      // .gifv won't work as video src, but .mp4 works
      const vidUrl = post.url.replace(".gifv", ".mp4");

      // muted needs to be set for autoplay to work on Chrome
      return (
        <ImgPreviewContainer>
          <VideoContent src={vidUrl} className={className} />
          {isHidden && this.renderObfuscationOverlay("video")}
        </ImgPreviewContainer>
      );
    }

    // v.redd.it videos
    if (post.is_video) {
      // TODO: support reddit videos with audio
      const videoStream = post.media!.reddit_video!.fallback_url;

      return (
        <ImgPreviewContainer>
          <VideoContent
            src={videoStream}
            muted={!!post.media!.reddit_video!.is_gif}
            autoPlay={!!post.media!.reddit_video!.is_gif}
            className={className}
          />
          {isHidden && this.renderObfuscationOverlay("video")}
        </ImgPreviewContainer>
      );
    }

    // rich video (e.g. YouTube, Gfycat)
    if (
      (post.post_hint === "rich:video" || post.domain === "gfycat.com") &&
      post.media
    ) {
      return (
        <ImgPreviewContainer>
          <RichMedia
            dangerouslySetInnerHTML={{ __html: post.media!.oembed!.html }}
            className={className}
          />
          {isHidden && this.renderObfuscationOverlay("video")}
        </ImgPreviewContainer>
      );
    }

    // regular link
    return <LinkPreview post={post} />;
  }
}

export default PostContent;
