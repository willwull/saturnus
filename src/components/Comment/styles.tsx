import styled, { css } from "styled-components";
import { transparentize } from "polished";

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
`;

export const ChildWrapper = styled.div`
  margin-top: 30px;
  padding-left: 15px;
  margin-left: 5px;
  border-left: 2px solid;
  border-color: ${props => transparentize(0.9, props.theme.text)};
`;
