import styled, { css } from "styled-components";
import { transparentize } from "polished";
import { DivWithIntrinsicSize } from "../ImgWithIntrinsicSize";

export const ContentOverflowGradient = styled.div`
  pointer-events: none;
  position: absolute;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    0deg,
    ${props => props.theme.contentBg},
    ${props => transparentize(1, props.theme.contentBg)}
  );
`;

export const RichMedia = styled.div`
  position: relative;
  z-index: 1;
`;

const MediaPreviewStyles = css`
  width: 100%;
  max-height: var(--max-content-height);
  object-fit: contain;
  margin-bottom: 10px;
  background: ${props => transparentize(0.3, props.theme.body)};
  position: relative;
  z-index: 1;
`;

export const ImgPreview = styled.img`
  ${MediaPreviewStyles};
`;

export const ImgPreviewContainer = styled.div`
  max-height: var(--max-content-height);
  overflow: hidden;
  position: relative;

  img {
    ${MediaPreviewStyles};
  }

  .imgIntrinsic {
    ${MediaPreviewStyles};
    position: absolute;
  }
`;

type TextProps = {
  expanded?: boolean;
};
export const SelfText = styled.div`
  opacity: ${(props: TextProps) => (props.expanded ? "1" : "0.5")};

  ${(props: TextProps) =>
    !props.expanded &&
    css`
      max-height: 10em;
      overflow: hidden;
      position: relative;
    `} /**/
  p:first-child {
    margin-top: 2px;
  }

  a {
    color: ${props => props.theme.primary};
  }

  @media (max-width: 576px) {
    padding-right: var(--content-padding);
    padding-left: var(--content-padding);
  }
`;

export const VideoContainer = styled(DivWithIntrinsicSize)`
  position: relative;
`;

export const VideoPreview = styled.video`
  ${MediaPreviewStyles};
  height: 100%;
  margin-bottom: 0;
`;

// Progress bar should appear on top of the video
const barHeight = 5;
export const VideoProgressContainer = styled.div`
  position: relative;
  top: -${barHeight}px;
  height: ${barHeight}px;
  width: 100%;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 10px;
  z-index: 3;
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
  z-index: 2;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
    opacity: 1;
  }

  @media (max-width: 576px) {
    display: none;
  }
`;
