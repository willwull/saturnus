import styled, { css } from "styled-components";
import { transparentize } from "polished";

export const ContentOverflowGradient = styled.div`
  pointer-events: none;
  position: absolute;
  top: 75%;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    0deg,
    ${props => props.theme.contentBg},
    ${props => transparentize(1, props.theme.contentBg)}
  );
`;

const MediaPreviewStyles = css`
  width: 100%;
  max-height: var(--max-content-height);
  object-fit: contain;
  margin-bottom: 10px;
  background: ${props => transparentize(0.3, props.theme.body)};
`;

// The height of the image is known at the time the post is fetched,
// so we can set the element height so that there is no content
// jumping when the actual image is loaded in.
export const ImgPreview = styled.img`
  ${MediaPreviewStyles};
  height: ${props => props.height}px;
`;

export const VideoPreview = styled.video`
  ${MediaPreviewStyles};
  height: ${props => props.height}px;
`;

export const SelfText = styled.div`
  a {
    color: ${props => props.theme.primary};
  }
`;
