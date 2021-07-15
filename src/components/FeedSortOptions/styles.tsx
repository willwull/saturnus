import styled from "styled-components";
import { transparentize } from "polished";

export const Wrapper = styled.div`
  padding: 0 15px 15px 15px;
  color: ${(props) => transparentize(0.3, props.theme.text)};

  & > * {
    margin-right: 20px;
  }
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1ch;
`;
