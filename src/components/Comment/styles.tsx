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

// rainbow colors
const commentColors = [
  "#df5141",
  "#f09747",
  "#f2d25d",
  "#3f6e4f",
  "#3472d4",
  "#2b4583",
  "#5e3d90",
];

const getCommentColorByDepth = (depth: number) =>
  commentColors[depth % commentColors.length];

type StripProps = {
  depth: number;
};

const getStripColor = (props: StripProps) =>
  getCommentColorByDepth(props.depth);

export const CollapseStrip = styled.div`
  width: 3px;
  height: 100%;
  background: ${getStripColor};
  opacity: 0.5;
`;

export const Collapser = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;

  &:focus {
    outline: none;

    ${CollapseStrip} {
      opacity: 1;
    }
  }

  &:hover ${CollapseStrip} {
    opacity: 1;
  }
`;

export const CommentTitle = styled.button`
  text-align: left;
  word-break: break-word;
  font-size: 14px;
  width: 100%;

  .comment-author {
    margin-right: 1ch;
  }

  .secondary {
    opacity: 0.5;
  }

  @media (max-width: 320px) {
    font-size: 12px;
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
