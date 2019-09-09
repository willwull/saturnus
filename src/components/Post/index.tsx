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
import GildingCounter from "../GildingCounter";
import Icon from "../Icon";
import Dropdown from "../Dropdown";
import PostDropDown from "./PostDropDown";
import {
  UpvoteBtn,
  DownvoteBtn,
  DropDownBtnWrapper,
  Score,
  NavClickTarget,
  SavedIconWrapper,
  SubredditLink,
} from "./styles";
import Desktop from "../Desktop";

type Props = {
  post: Submission;
  expanded?: boolean;
  voteOnPost?: (post: Submission, vote: "up" | "down") => void;
};

class Post extends React.Component<Props, {}> {
  static defaultProps = {
    expanded: false,
  };

  upvote = () => {
    const { post, voteOnPost } = this.props;
    voteOnPost && voteOnPost(post, "up");
  };

  downvote = () => {
    const { post, voteOnPost } = this.props;
    voteOnPost && voteOnPost(post, "down");
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

    const clickTarget = (
      <NavClickTarget to={{ pathname: post.permalink, state: { modal: true } }}>
        Open post
      </NavClickTarget>
    );

    const platinumCounter = post.gildings.gid_3;
    const goldCounter = post.gildings.gid_2;
    const silverCounter = post.gildings.gid_1;

    return (
      <ContentBox className="post-component">
        {post.saved && (
          <SavedIconWrapper className="mod">
            <Icon icon="fas bookmark" />
          </SavedIconWrapper>
        )}

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

          {/* Platinum icon */}
          {platinumCounter > 0 && (
            <GildingCounter count={platinumCounter} type="platinum" />
          )}

          {/* Gilded icon */}
          {goldCounter > 0 && (
            <GildingCounter count={goldCounter} type="gold" />
          )}

          {/* Silver icon */}
          {silverCounter > 0 && (
            <GildingCounter count={silverCounter} type="silver" />
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

            <div className="post-title">{post.title}</div>
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
            <SubredditLink
              to={`/${post.subreddit_name_prefixed}`}
              bgColor={bgColor}
            >
              {post.subreddit.display_name}
            </SubredditLink>

            <DropDownBtnWrapper>
              <Dropdown
                overlay={<PostDropDown post={post} />}
                placement="bottomRight"
              >
                <Icon icon="fa ellipsis-h" />
              </Dropdown>
            </DropDownBtnWrapper>

            <span className="comments">
              <Icon icon="comment-alt" /> {shortenNumber(post.num_comments)}{" "}
              <Desktop>comments</Desktop>
            </span>
          </div>
        </div>
        {/* If were already in the post page, no need to make post clickable */}
        {!expanded && clickTarget}
      </ContentBox>
    );
  }
}

export default Post;
