import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import moment from "moment-mini";
import { Submission } from "snoowrap";
import Color from "color";
import randomColor from "randomcolor";

import ContentBox from "../ContentBox";
import PostContent from "../PostContent";
import { shortenNumber } from "../../utils";
import "./Post.scss";
import Flair from "../Flair";
import GoldCounter from "../GoldCounter";
import Icon from "../Icon";
import Dropdown from "../Dropdown";
import PostShareMenu from "./PostShareMenu";
import { UpvoteBtn, DownvoteBtn, ShareButtonWrapper, Score } from "./styles";
import Desktop from "../Desktop";

type Props = {
  post: Submission;
  expanded?: boolean;
  voteOnPost: (post: Submission, vote: "up" | "down") => void;
};

class Post extends React.Component<Props, {}> {
  static defaultProps = {
    expanded: false,
  };

  upvote = () => {
    const { post, voteOnPost } = this.props;
    voteOnPost(post, "up");
  };

  downvote = () => {
    const { post, voteOnPost } = this.props;
    voteOnPost(post, "down");
  };

  render() {
    const { post, expanded } = this.props;

    const isUpvoted = post.likes === true;
    const isDownvoted = post.likes === false;

    const bgColor = Color(
      randomColor({
        seed: post.subreddit.display_name,
      }),
    );
    const textColor = bgColor.luminosity() < 0.6 ? "white" : "black";

    return (
      <ContentBox className="post-component">
        <div className="score">
          <UpvoteBtn active={isUpvoted} onClick={this.upvote}>
            <Icon icon="arrow-up" />
          </UpvoteBtn>

          <Score vote={post.likes}>{shortenNumber(post.score)}</Score>

          <DownvoteBtn active={isDownvoted} onClick={this.downvote}>
            <Icon icon="arrow-down" />
          </DownvoteBtn>

          {/* Stickied icon */}
          {post.stickied && (
            <div className="mod mod-icon">
              <Icon icon="thumbtack" fixedWidth />
            </div>
          )}

          {/* Mod distinguished icon */}
          {post.distinguished === "moderator" && (
            <div className="mod mod-icon">
              <Icon icon="shield" fixedWidth />
            </div>
          )}

          {/* Gilded icon */}
          {post.gilded !== 0 && <GoldCounter count={post.gilded} />}
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

            <Link
              to={{ pathname: post.permalink, state: { modal: true } }}
              className="post-title"
            >
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
              style={
                ({
                  backgroundColor: bgColor,
                  color: textColor,
                } as unknown) as CSSProperties
              }
            >
              {post.subreddit.display_name}
            </Link>

            <ShareButtonWrapper>
              <Dropdown
                overlay={<PostShareMenu post={post} />}
                placement="bottomRight"
              >
                <Icon icon="share" /> Share
              </Dropdown>
            </ShareButtonWrapper>

            <Link
              to={{ pathname: post.permalink, state: { modal: true } }}
              className="comments"
            >
              <Icon icon="comment-alt" /> {shortenNumber(post.num_comments)}{" "}
              <Desktop>comments</Desktop>
            </Link>
          </div>
        </div>
      </ContentBox>
    );
  }
}

export default Post;
