import React from "react";
import PropTypes from "prop-types";
import moment from "moment-mini";
import { shortenNumber } from "utils";
import "./Comment.scss";

function Comment({ comment }) {
  return (
    <div className="comment-component">
      <div className="comment-info">
        <b>{comment.author.name}</b>
        <span className="secondary">
          {" • "}
          {shortenNumber(comment.score)} points
          {" • "}
          {moment.unix(comment.created_utc).fromNow()}
        </span>
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.body_html }} />
    </div>
  );
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
