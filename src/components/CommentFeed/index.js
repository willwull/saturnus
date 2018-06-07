import React from "react";
import PropTypes from "prop-types";
import Comment from "components/Comment";
import "./CommentFeed.scss";

function CommentFeed({ comments }) {
  return (
    <div className="comment-feed">
      {comments.map(comment => (
        <div key={comment.id} className="comment-thread">
          <Comment comment={comment} />
        </div>
      ))}
    </div>
  );
}

CommentFeed.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentFeed;
