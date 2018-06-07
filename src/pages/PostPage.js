import React from "react";
import PropTypes from "prop-types";
import CurrentPost from "containers/CurrentPost";

function PostPage(props) {
  return (
    <div className="main-content">
      <CurrentPost />
    </div>
  );
}

PostPage.propTypes = {};

export default PostPage;
