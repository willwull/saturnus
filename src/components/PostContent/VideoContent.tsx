import React, { Component } from "react";
import { InView } from "react-intersection-observer";
import { VideoPreview } from "./styles";

type Props = {
  src: string;
  height: number;
  muted?: boolean;
  autoPlay?: boolean;
};

type DefaultProps = {
  muted: boolean;
  autoPlay: boolean;
};

class VideoContent extends Component<Props, {}> {
  static defaultProps: DefaultProps = {
    muted: true,
    autoPlay: true,
  };

  videoRef = React.createRef<HTMLVideoElement>();

  handleInView = (inView: boolean) => {
    const videoElem = this.videoRef.current;
    if (videoElem) {
      if (inView) {
        console.log("Play");
        videoElem.play().catch(error => {
          // This probably happens on iOS since video.play() only
          // works as a result of user actions
          console.error("Couldn't play video");
          console.error(error);
        });
      } else {
        console.log("Pause");
        videoElem.pause();
      }
    }
  };

  render() {
    const { src, autoPlay, muted, height } = this.props;

    return (
      <InView threshold={0.4} onChange={this.handleInView}>
        <VideoPreview
          innerRef={this.videoRef}
          playsInline
          preload="auto"
          autoPlay={autoPlay}
          loop={true}
          controls
          muted={muted}
          src={src}
          height={height}
        />
      </InView>
    );
  }
}

export default VideoContent;
