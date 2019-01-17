import React from "react";
import styled, { keyframes } from "styled-components";
import CurrentPost from "../containers/CurrentPost";

const fadeInAnim = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const PostPageWrapper = styled.div`
  z-index: 10; /* must be higher than a, button, pause overlay in post-component */
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: scroll;
  background: ${props => props.theme.body};
  transform: translateX(100%);
  animation: ${fadeInAnim} 300ms;
  animation-fill-mode: forwards;
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
    <PostPageWrapper className="fuck-me">
      <Page>
        <CurrentPost isModal={true} />
      </Page>
    </PostPageWrapper>
  );
}

export default PostModal;
