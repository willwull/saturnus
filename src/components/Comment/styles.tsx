import styled, { css } from "styled-components";
import { transparentize } from "polished";

export const CommentComponent = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 15px 1fr;

  & > p:first-child {
    margin-top: 10px;
  }
`;

// Element.scrollIntoView() doesn't have an offset option,
// so we place a scroll anchor slightly above the comment
// in order to scroll to where we want
// 70px = header height + 20px
type AnchorProps = {
  isModal: boolean;
};

export const CommentScrollAnchor = styled.div`
  position: absolute;
  top: ${(props: AnchorProps) => (props.isModal ? "-20px" : "-70px")};
`;

export const CollapseStrip = styled.div`
  width: 3px;
  height: 100%;
  background: ${props => transparentize(0.9, props.theme.text)};
`;

export const Collapser = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;

    ${CollapseStrip} {
      background: ${props => transparentize(0.7, props.theme.text)};
    }
  }

  &:hover ${CollapseStrip} {
    background: ${props => transparentize(0.7, props.theme.text)};
  }
`;

export const CommentTitle = styled.button`
  text-align: left;
  word-break: break-word;
  font-size: 14px;

  .comment-author {
    margin-right: 1ch;
  }

  .secondary {
    opacity: 0.5;
  }
`;

interface CommentBodyProps {
  isCollapsed: boolean;
}

export const CommentBody = styled.div`
  ${(props: CommentBodyProps) =>
    props.isCollapsed &&
    css`
      display: none;
    `};

  margin-top: 15px;

  a {
    color: ${props => props.theme.primary};
    word-break: break-word;
  }

  & > .md > p:last-child {
    margin-bottom: 0;
  }
`;

export const ChildWrapper = styled.div`
  margin-top: 30px;
  padding-left: 5px;
`;
