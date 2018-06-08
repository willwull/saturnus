import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import FaIcon from "@fortawesome/react-fontawesome";

import { shortenNumber } from "utils";
import "./Comment.scss";

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
          <div key={reply.id} className="child-comment">
            <Comment comment={reply} />
          </div>
        ))}
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
