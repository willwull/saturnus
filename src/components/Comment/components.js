import styled, { css } from "styled-components";

export const CommentBody = styled.div`
  ${props =>
    props.isCollapsed &&
    css`
      display: none;
    `};

  a {
    color: ${props => props.theme.primary};
  }
`;
