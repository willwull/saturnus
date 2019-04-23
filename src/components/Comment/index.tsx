import React, { Component, Fragment } from "react";
import { Comment as CommentType } from "snoowrap";
import scrollIntoView from "smooth-scroll-into-view-if-needed";

import { shortenNumber, shortTimeDiff } from "../../utils";
import GildingCounter from "../GildingCounter";
import TextContent from "../TextContent";
import Icon from "../Icon";
import {
  CommentBody,
  ChildWrapper,
  CommentTitle,
  CommentComponent,
  Collapser,
  CollapseStrip,
  CommentScrollAnchor,
  MoreCommentsBtn,
} from "./styles";

export type Props = {
  comment: CommentType;
  isModal: boolean; // used to determine the collapse scroll offset
};

interface State {
  isCollapsed: boolean;
  isLoadingMore: boolean;
}

class Comment extends Component<Props, State> {
  state: State = {
    isCollapsed: false,
    isLoadingMore: false,
  };

  scrollRef = React.createRef<HTMLDivElement>();

  toggleCollapse = () => {
    this.setState(
      state => ({
        isCollapsed: !state.isCollapsed,
      }),
      () => {
        scrollIntoView(this.scrollRef.current!, {
          behavior: "smooth",
          scrollMode: "if-needed",
          block: "start",
        });
      },
    );
  };

  onLoadMoreClick = async () => {
    // TODO: Make this better maybe. Directly modifying the state is a bit ugly
    this.setState({ isLoadingMore: true });
    const newAndOldReplies = await this.props.comment.replies.fetchMore({
      append: true,
      amount: 20,
    });
    this.setState({ isLoadingMore: false });
    this.props.comment.replies = newAndOldReplies;
    (this.props.comment.replies as any)._more.count -= 20;
    this.forceUpdate();
  };

  render() {
    const { comment } = this.props;
    if (comment.depth > 15) {
      return null;
    }

    let authorNameClass = "comment-author";
    if (comment.distinguished === "moderator") {
      authorNameClass += " mod";
    } else if (comment.is_submitter) {
      authorNameClass += " op";
    }

    let score;
    if (comment.score_hidden) {
      score = "-";
    } else {
      score = shortenNumber(comment.score);
    }

    // If the post page is in modal mode, it has top:50px applied.
    // If not, the component is at top: 0.
    // Therefore, the scroll anchor should have a different offset
    // depending on the mode of the post page
    const { isModal } = this.props;

    const platinumCounter = comment.gildings.gid_3;
    const goldCounter = comment.gildings.gid_2;
    const silverCounter = comment.gildings.gid_1;

    const moreCommentsCount =
      ((comment.replies as any)._more &&
        (comment.replies as any)._more.count) ||
      0;

    return (
      <CommentComponent>
        <CommentScrollAnchor isModal={isModal} ref={this.scrollRef} />
        <div>
          <Collapser onClick={this.toggleCollapse} tabIndex={0}>
            <CollapseStrip depth={comment.depth} />
          </Collapser>
        </div>
        <div>
          <CommentTitle onClick={this.toggleCollapse}>
            {/* Stickied icon */}
            {comment.stickied && (
              <span className="mod">
                <Icon icon="thumbtack" />{" "}
              </span>
            )}

            <b className={authorNameClass}>{comment.author.name}</b>

            <span className="secondary">
              <Icon icon="far long-arrow-up" /> {score}
              {" · "}
              {shortTimeDiff(comment.created_utc)}
            </span>

            {platinumCounter !== 0 && (
              <Fragment>
                {" "}
                <GildingCounter count={platinumCounter} type="platinum" />
              </Fragment>
            )}

            {goldCounter !== 0 && (
              <Fragment>
                {" "}
                <GildingCounter count={goldCounter} />
              </Fragment>
            )}

            {silverCounter !== 0 && (
              <Fragment>
                {" "}
                <GildingCounter count={silverCounter} type="silver" />
              </Fragment>
            )}
          </CommentTitle>
          <CommentBody isCollapsed={this.state.isCollapsed}>
            <TextContent>{comment.body_html}</TextContent>

            {comment.replies.length !== 0 &&
              comment.replies.map(reply => (
                <ChildWrapper key={reply.id}>
                  <Comment {...this.props} comment={reply} />
                </ChildWrapper>
              ))}

            {moreCommentsCount > 0 && (
              <MoreCommentsBtn
                disabled={this.state.isLoadingMore}
                onClick={this.onLoadMoreClick}
              >
                Load {moreCommentsCount} more comments
              </MoreCommentsBtn>
            )}
          </CommentBody>
        </div>
      </CommentComponent>
    );
  }
}

export default Comment;
