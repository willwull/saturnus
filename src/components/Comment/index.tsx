import React, { Component } from "react";
import moment from "moment-mini";

import { shortenNumber } from "../../utils";
import GoldCounter from "../GoldCounter";
import TextContent from "../TextContent";
import Icon from "../Icon";
import { CommentBody, ChildWrapper } from "./styles";
import "./Comment.scss";

interface Props {
  comment: any;
}

interface State {
  isCollapsed: boolean;
}

class Comment extends Component<Props, State> {
  state = {
    isCollapsed: false,
  };

  toggleCollapse = () => {
    this.setState(state => ({
      isCollapsed: !state.isCollapsed,
    }));
  };

  render() {
    const { comment } = this.props;
    if (comment.depth > 5) {
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

    return (
      <div className="comment-component">
        <button className="comment-info" onClick={this.toggleCollapse}>
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
            {moment.unix(comment.created_utc).fromNow()}
          </span>

          {comment.gilded !== 0 && (
            <span>
              {" · "}
              <GoldCounter count={comment.gilded} />
            </span>
          )}
        </button>
        <CommentBody isCollapsed={this.state.isCollapsed}>
          <TextContent>{comment.body}</TextContent>

          {comment.replies.length !== 0 &&
            comment.replies.map((reply: any) => (
              <ChildWrapper key={reply.id}>
                <Comment comment={reply} />
              </ChildWrapper>
            ))}
        </CommentBody>
      </div>
    );
  }
}

export default Comment;