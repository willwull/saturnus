import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import { shortenNumber } from "utils";
import "./Comment.scss";

function Comment({ comment }) {
  if (comment.depth > 4) {
    return null;
  }

  return (
    <div className="comment-component">
      <div className="comment-info">
        <b>{comment.author.name}</b>
        <span className="secondary">
          {" • "}
          {shortenNumber(comment.score)} points
          {" • "}
          {moment.unix(comment.created_utc).fromNow()}
          {comment.depth}
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
