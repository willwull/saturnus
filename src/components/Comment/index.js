import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { transparentize } from "polished";
import moment from "moment-mini";
import FaIcon from "@fortawesome/react-fontawesome";

import { shortenNumber } from "utils";
import "./Comment.scss";

const ChildWrapper = styled.div`
  margin-top: 30px;
  padding-left: 15px;
  margin-left: 5px;
  border-left: 2px solid;
  border-color: ${props => transparentize(0.9, props.theme.text)};
`;

function Comment({ comment }) {
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
      <div className="comment-info">
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
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.body_html }} />

      {comment.replies.length !== 0 &&
        comment.replies.map(reply => (
          <ChildWrapper key={reply.id}>
            <Comment comment={reply} />
          </ChildWrapper>
        ))}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
