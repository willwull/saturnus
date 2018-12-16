import React from "react";
import styled from "styled-components";
import CurrentPost from "../containers/CurrentPost";

const PostPageWrapper = styled.div`
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  background: ${props => props.theme.body};
  -webkit-overflow-scrolling: touch;
`;

const Page = styled.div`
  max-width: 850px;
  margin: 20px auto;
`;

/**
 * Having posts appear as modals over the post feed will help
 * with scroll jumping when (re-)loading dynamic content in the post
 * feed. If the feed never unmounts, the posts don't need to be reloaded,
 * which will prevent scroll jumping when moving between a post and a feed.
 */
function PostModal() {
  return (
    <PostPageWrapper>
      <Page>
        <CurrentPost />
      </Page>
    </PostPageWrapper>
  );
}

export default PostModal;
