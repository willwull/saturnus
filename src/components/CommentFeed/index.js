import React from "react";
import PropTypes from "prop-types";
import Comment from "components/Comment";
import "./CommentFeed.scss";

function CommentFeed({ comments }) {
  return (
    <div className="comment-feed">
      {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
}

CommentFeed.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentFeed;
