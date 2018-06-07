import React from "react";
import PropTypes from "prop-types";
import CurrentPost from "containers/CurrentPost";
import "./PostPage.scss";

function PostPage(props) {
  return (
    <div className="main-content post-page">
      <CurrentPost />
    </div>
  );
}

PostPage.propTypes = {};

export default PostPage;
