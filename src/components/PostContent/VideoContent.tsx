import React, { Component } from "react";
import { InView } from "react-intersection-observer";
import {
  VideoPreview,
  VideoProgressContainer,
  VideoProgressBar,
  PauseOverlay,
  VideoContainer,
} from "./styles";
import { Play, Pause } from "react-feather";
import { Dimensions } from "../ImgWithIntrinsicSize";

type Props = {
  src: string;
  muted?: boolean;
  autoPlay?: boolean;
  className?: string;
  intrinsicSize: Dimensions;
};

type DefaultProps = {
  muted: boolean;
  autoPlay: boolean;
  className: string;
};

type State = {
  progress: number;
};

class VideoContent extends Component<Props, State> {
  static defaultProps: DefaultProps = {
    muted: true,
    autoPlay: true,
    className: "",
  };

  state: State = {
    progress: 0,
  };

  videoRef = React.createRef<HTMLVideoElement>();

  handleInView = (inView: boolean) => {
    const videoElem = this.videoRef.current;
    if (videoElem) {
      if (inView) {
        videoElem.play().catch((error) => {
          // This probably happens on iOS since video.play() only
          // works as a result of user actions
          console.error("Couldn't play video");
          console.error(error);
        });
      } else {
        videoElem.pause();
      }
    }
  };

  handleTimeUpdate = () => {
    const videoElem = this.videoRef.current;
    if (videoElem) {
      const totalTime = videoElem.duration;
      const currentTime = videoElem.currentTime;
      const progressWidth = Math.floor((currentTime / totalTime) * 100);
      this.setState({
        progress: progressWidth,
      });
    }
  };

  handleVideoClick = () => {
    const videoElem = this.videoRef.current;
    if (videoElem) {
      if (videoElem.paused) {
        videoElem.play();
      } else {
        videoElem.pause();
      }
    }
  };

  render() {
    const { src, autoPlay, muted, className, intrinsicSize } = this.props;
    const videoElem = this.videoRef.current;
    const isPaused = videoElem && videoElem.paused;

    const OverlayIcon = isPaused ? Play : Pause;

    const progressStyle = {
      width: `${this.state.progress}%`,
    };

    return (
      <InView threshold={0.4} onChange={this.handleInView}>
        <VideoContainer intrinsicSize={intrinsicSize} className={className}>
          <VideoPreview
            ref={this.videoRef}
            playsInline
            preload="auto"
            autoPlay={autoPlay}
            loop={true}
            muted={muted}
            src={src}
            onTimeUpdate={this.handleTimeUpdate}
            onClick={this.handleVideoClick}
          />
          <PauseOverlay onClick={this.handleVideoClick}>
            <OverlayIcon size={50} />
          </PauseOverlay>
          <VideoProgressContainer>
            <VideoProgressBar style={progressStyle} />
          </VideoProgressContainer>
        </VideoContainer>
      </InView>
    );
  }
}

export default VideoContent;
