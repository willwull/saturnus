import React from "react";
import styled from "styled-components";
import CurrentPost from "../containers/CurrentPost";

const Page = styled.div`
  max-width: 850px;
  margin: 70px auto 20px auto;
`;

function PostPage() {
  return (
    <Page>
      <CurrentPost />
    </Page>
  );
}

export default PostPage;
