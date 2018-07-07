import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { transparentize } from "polished";
import moment from "moment-mini";
import FaIcon from "@fortawesome/react-fontawesome";

import { shortenNumber } from "utils";
import "./Comment.scss";
import GoldCounter from "../GoldCounter";
import { CommentBody } from "./components";
import TextContent from "../TextContent";

const ChildWrapper = styled.div`
  margin-top: 30px;
  padding-left: 15px;
  margin-left: 5px;
  border-left: 2px solid;
  border-color: ${props => transparentize(0.9, props.theme.text)};
`;

class Comment extends Component {
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
              <FaIcon icon="thumbtack" />{" "}
            </span>
          )}

          <b className={authorNameClass}>{comment.author.name}</b>

          <span className="secondary">
            <FaIcon icon={["far", "long-arrow-up"]} /> {score}
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
            comment.replies.map(reply => (
              <ChildWrapper key={reply.id}>
                <Comment comment={reply} />
              </ChildWrapper>
            ))}
        </CommentBody>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
