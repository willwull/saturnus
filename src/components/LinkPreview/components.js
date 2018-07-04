import styled from "styled-components";
import { transparentize } from "polished";

export const ExternalLink = styled.a`
  border: 1px solid ${props => transparentize(0.85, props.theme.text)};
  color: ${props => transparentize(0.2, props.theme.text)};
  text-decoration: none;
  overflow: hidden;
  display: block;
  border-radius: 5px;

  @media (max-width: 576px) {
    margin-right: var(--content-padding);
    margin-left: var(--content-padding);
  }
`;

export const BigPreviewImg = styled.img`
  border-bottom: 1px solid ${props => transparentize(0.85, props.theme.text)};
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

export const LinkBar = styled.div`
  background: ${props => transparentize(0.25, props.theme.body)};
  display: grid;
  grid-template-columns: 40px 1fr auto;
  grid-gap: 10px;
  align-items: center;
  padding: 10px;
`;

export const Thumbnail = styled.div`
  border-right: 1px solid ${props => transparentize(0.85, props.theme.text)};
  text-align: center;
  font-size: 30px;
  padding-right: 10px;
`;

// set the color of the whole url to the light color so the ellipsis are
// the correct color as well
export const Url = styled.div`
  color: ${props => transparentize(0.75, props.theme.text)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Domain = styled.span`
  color: ${props => transparentize(0.2, props.theme.text)};
`;
