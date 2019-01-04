import React from "react";
import { Subreddit } from "snoowrap";
import styled from "styled-components";
import SubredditIcon from "./SubredditIcon";

type BannerWrapperProps = {
  src: string;
};
const BannerWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.primary};
  background-image: ${(props: BannerWrapperProps) => `url(${props.src})`};
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 40px;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
`;

type Props = {
  subreddit: Subreddit | null;
  isLoading: boolean;
};

function Banner({ subreddit, isLoading, ...rest }: Props) {
  if (subreddit === null) {
    return null;
  }

  const imageSrc = subreddit.banner_img;

  return (
    <BannerWrapper src={imageSrc} {...rest}>
      {!isLoading && (
        <Title>
          <SubredditIcon subreddit={subreddit} />
          {subreddit.display_name_prefixed}
        </Title>
      )}
    </BannerWrapper>
  );
}

export default Banner;