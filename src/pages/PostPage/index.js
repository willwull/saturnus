import React from "react";
import CurrentPost from "containers/CurrentPost";
import "./PostPage.scss";

function PostPage() {
  return (
    <div className="main-content post-page">
      <CurrentPost />
    </div>
  );
}

export default PostPage;
