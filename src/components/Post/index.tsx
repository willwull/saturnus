import React from "react";
import moment from "moment-mini";
import { Submission } from "snoowrap";
import Color from "color";
import randomColor from "randomcolor";

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
  SubredditLink,
  TitleAndMoreContainer,
  Container,
  AuthorLink,
} from "./styles";
import Desktop from "../Desktop";
import Text from "../Base/Text";
import ErrorBoundary from "../ErrorBoundary";

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
    voteOnPost?.(post, "up");
  };

  downvote = () => {
    const { post, voteOnPost } = this.props;
    voteOnPost?.(post, "down");
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

    const clickTarget = (
      <NavClickTarget to={post.permalink}>Open post</NavClickTarget>
    );

    const platinumCounter = post.gildings.gid_3;
    const goldCounter = post.gildings.gid_2;
    const silverCounter = post.gildings.gid_1;

    return (
      <Container saved={post.saved} className="post-component">
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

            <TitleAndMoreContainer>
              <div className="post-title">{post.title}</div>

              <DropDownBtnWrapper>
                <Dropdown
                  overlay={<PostDropDown post={post} />}
                  placement="bottomRight"
                >
                  <Icon icon="fa ellipsis-h" />
                </Dropdown>
              </DropDownBtnWrapper>
            </TitleAndMoreContainer>
          </div>

          <div className="content-wrapper">
            <ErrorBoundary
              fallbackRender={({ error }) => (
                <>
                  <Text>
                    Something went wrong when trying to display this post.
                  </Text>
                  <Text>
                    You can try to open the content using the drop-down menu in
                    the upper right.
                  </Text>
                  <Text color="textDeemphasized">
                    Error message: {error?.message}
                  </Text>
                </>
              )}
            >
              <PostContent post={post} expanded={expanded} />
            </ErrorBoundary>
          </div>

          <div className="post-info">
            <Text color="textDeemphasized">
              {moment.unix(post.created_utc).fromNow()} by{" "}
              <AuthorLink to={`/user/${post.author.name}`}>
                {post.author.name}
              </AuthorLink>
              {post.author_flair_text && (
                <React.Fragment>
                  {" "}
                  <Flair className="author">{post.author_flair_text}</Flair>
                </React.Fragment>
              )}
            </Text>
          </div>

          <div className="bottom-row">
            <SubredditLink
              to={`/${post.subreddit_name_prefixed}`}
              bgColor={bgColor}
            >
              {post.subreddit.display_name}
            </SubredditLink>

            <span className="comments">
              <Icon icon="comment-alt" /> {shortenNumber(post.num_comments)}{" "}
              <Desktop>comments</Desktop>
            </span>
          </div>
        </div>
        {/* If were already in the post page, no need to make post clickable */}
        {!expanded && clickTarget}
      </Container>
    );
  }
}

export default Post;
