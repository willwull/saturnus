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

export const SelfText = styled.div`
  a {
    color: ${props => props.theme.primary};
  }
`;

export const VideoContainer = styled.div`
  position: relative;
`;

export const VideoPreview = styled.video`
  ${MediaPreviewStyles};
  height: ${props => props.height}px;
  margin-bottom: 0;
`;

// Progress bar should appear on top of the video
const barHeight = 5;
export const VideoProgressContainer = styled.div`
  position: relative;
  top: -${barHeight}px;
  height: ${barHeight}px;
  width: 100%;
  background: rgba(255, 255, 255, 0.2);
  margin-bottom: 10px;
`;

// Width of progress bar is set with inline styles
export const VideoProgressBar = styled.div`
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const PauseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${barHeight}px;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3em;
  transition: all 300ms;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    opacity: 1;
  }
`;
