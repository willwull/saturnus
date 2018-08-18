import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ContentBox from "components/ContentBox";
import Comment from "components/Comment";
import "./CommentFeed.scss";

const NoComments = styled.p`
  text-align: center;
  font-size: 1.2em;
  opacity: 0.5;
`;

function CommentFeed({ comments }) {
  let content;
  if (comments.length > 0) {
    content = comments.map(comment => (
      <div key={comment.id} className="comment-thread">
        <Comment comment={comment} />
      </div>
    ));
  } else {
    content = <NoComments>No comments :(</NoComments>;
  }

  return <ContentBox className="comment-feed">{content}</ContentBox>;
}

CommentFeed.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentFeed;
