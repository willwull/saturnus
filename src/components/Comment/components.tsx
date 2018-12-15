import styled, { css } from "styled-components";

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
