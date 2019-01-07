import React, { Component } from "react";
import { Submission } from "snoowrap";
import { isImgUrl } from "../../utils";
import LinkPreview from "../LinkPreview";
import TextContent from "../TextContent";
import Icon from "../Icon";
import VideoContent from "./VideoContent";
import { ContentOverflowGradient, ImgPreview, SelfText } from "./styles";
import "./PostContent.scss";

type Props = {
  post: Submission;
  expanded?: boolean;
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

  render() {
    const { post, expanded } = this.props;

    // spoiler marked posts
    if ((post.spoiler || post.over_18) && this.state.obfuscated && !expanded) {
      // spoiler marked text post
      if (post.is_self) {
        return <div className="post-self-text">[Hidden text]</div>;
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
              height={post.preview.images[0].source.height}
            />
            <button className="warning-text" onClick={this.showImage}>
              <div className="warning-icon">
                <Icon icon="fa eye" />
              </div>
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
          <TextContent>{post.selftext}</TextContent>

          {/* gradient overlay that indicates that the text is cut off */}
          {!expanded && <ContentOverflowGradient />}
        </SelfText>
      );
    }

    // image
    if (isImgUrl(post.url)) {
      return (
        <ImgPreview
          src={post.url}
          alt={post.title}
          height={post.preview.images[0].source.height}
        />
      );
    }

    // handle non-direct imgur links
    if (post.domain === "imgur.com") {
      return (
        <ImgPreview
          src={`${post.url}.jpg`}
          alt={post.title}
          height={post.preview.images[0].source.height}
        />
      );
    }

    // imgur gifv
    if (post.domain === "i.imgur.com" && post.url.indexOf("gifv") !== 0) {
      // .gifv won't work as video src, but .mp4 works
      const vidUrl = post.url.replace(".gifv", ".mp4");

      // muted needs to be set for autoplay to work on Chrome
      return (
        <VideoContent
          src={vidUrl}
          height={post.preview.images[0].source.height}
        />
      );
    }

    // v.redd.it videos
    if (post.is_video) {
      // TODO: support reddit videos with audio
      const videoStream = post.media.reddit_video.fallback_url;

      return (
        <VideoContent
          src={videoStream}
          muted={!!post.media.reddit_video.is_gif}
          autoPlay={!!post.media.reddit_video.is_gif}
          height={post.media.reddit_video.height}
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
