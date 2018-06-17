import styled, { css } from "@marionebl/styled-components";

export const CommentBody = styled.div`
  ${props =>
    props.isCollapsed &&
    css`
      display: none;
    `};
`;
