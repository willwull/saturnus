import styled from "styled-components";
import { Link } from "react-router-dom";
import { transparentize } from "polished";

export const Wrapper = styled(Link)`
  display: grid;
  grid-template-columns: auto 175px 1fr;
  grid-gap: 10px;
  color: ${props => props.theme.text};
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 5px;
  background: ${props => props.theme.contentBg};
  align-items: center;
`;

export const Name = styled.div`
  font-weight: bold;
`;

export const Subtext = styled.div`
  color: ${props => transparentize(0.5, props.theme.text)};
`;

export const Description = styled.div`
  font-size: 14px;
  color: ${props => transparentize(0.25, props.theme.text)};
`;
