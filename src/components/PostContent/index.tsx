import React, { Component } from "react";
import { Submission } from "snoowrap";
import { isImgUrl, splitUrl } from "../../utils";
import LinkPreview from "../LinkPreview";
import TextContent from "../TextContent";
import { EyeOff } from "react-feather";
import VideoContent from "./VideoContent";
import {
  ContentOverflowGradient,
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

  renderObfuscationOverlay() {
    return (
      <div className="obfuscated-wrapper">
        <button className="warning-text" onClick={this.showImage}>
          <div className="warning-icon">
            <EyeOff />
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
            {isHidden && this.renderObfuscationOverlay()}
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
          {isHidden && this.renderObfuscationOverlay()}
        </ImgPreviewContainer>
      );
    }

    // imgur gifv
    if (post.domain === "i.imgur.com" && post.url.indexOf("gifv") !== 0) {
      // .gifv won't work as video src, but .mp4 works
      const vidUrl = post.url.replace(".gifv", ".mp4");

      const redditVideoPreview = (post.preview as any).reddit_video_preview;

      let intrinsicSize;
      if (redditVideoPreview) {
        intrinsicSize = {
          width: redditVideoPreview.width,
          height: redditVideoPreview.height,
        };
      } else {
        // fallback to the size of the preview image
        const previewImage = post.preview.images[0].source;
        intrinsicSize = {
          width: previewImage.width,
          height: previewImage.height,
        };
      }

      // muted needs to be set for autoplay to work on Chrome
      return (
        <ImgPreviewContainer>
          <VideoContent
            src={vidUrl}
            className={className}
            intrinsicSize={intrinsicSize}
          />
          {isHidden && this.renderObfuscationOverlay()}
        </ImgPreviewContainer>
      );
    }

    // v.redd.it videos
    if (post.is_video) {
      const { media } = post;
      // TODO: support reddit videos with audio
      const videoStream = media!.reddit_video!.fallback_url;

      // Width doesn't exist in the type?? Wtf
      const intrinsicSize = {
        width: (media!.reddit_video as any).width,
        height: media!.reddit_video!.height,
      };

      return (
        <ImgPreviewContainer>
          <VideoContent
            src={videoStream}
            muted={!!post.media!.reddit_video!.is_gif}
            autoPlay={!!post.media!.reddit_video!.is_gif}
            className={className}
            intrinsicSize={intrinsicSize}
          />
          {isHidden && this.renderObfuscationOverlay()}
        </ImgPreviewContainer>
      );
    }

    // Gfycat
    if (post.domain === "gfycat.com") {
      let src;
      if (post.url.includes("ifr")) {
        src = post.url;
      } else {
        const rest = splitUrl(post.url)[1];
        src = `https://gfycat.com/ifr${rest}`;
      }

      const height = expanded ? "600" : "300";

      return (
        <ImgPreviewContainer>
          <iframe
            src={src}
            className={className}
            scrolling="no"
            allowFullScreen={true}
            allow="autoplay; fullscreen"
            height={height}
            title={post.title}
          />
          {isHidden && this.renderObfuscationOverlay()}
        </ImgPreviewContainer>
      );
    }

    // rich video (e.g. YouTube)
    if (post.post_hint === "rich:video" && post.media) {
      return (
        <ImgPreviewContainer>
          <RichMedia
            dangerouslySetInnerHTML={{ __html: post.media!.oembed!.html }}
            className={className}
          />
          {isHidden && this.renderObfuscationOverlay()}
        </ImgPreviewContainer>
      );
    }

    // regular link
    return <LinkPreview post={post} />;
  }
}

export default PostContent;
