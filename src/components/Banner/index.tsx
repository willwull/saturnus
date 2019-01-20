import React from "react";
import { Subreddit } from "snoowrap";
import SubredditIcon from "./SubredditIcon";
import { BannerWrapper, Title } from "./styles";

type Props = {
  subreddit: Subreddit | null;
  isLoading: boolean;
};

function Banner({ subreddit, isLoading }: Props) {
  if (subreddit === null) {
    return <BannerWrapper imgSrc="" />;
  }

  const imageSrc =
    (subreddit as any).banner_background_image || subreddit.banner_img;

  return (
    <BannerWrapper imgSrc={imageSrc}>
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
