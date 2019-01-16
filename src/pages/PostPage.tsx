import React from "react";
import CurrentPost from "../containers/CurrentPost";
import Page from "../components/Page";

function PostPage() {
  return (
    <Page className="post-page">
      <CurrentPost />
    </Page>
  );
}

export default PostPage;
