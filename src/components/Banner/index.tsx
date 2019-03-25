import React, { Fragment } from "react";
import { Subreddit } from "snoowrap";
import SubredditIcon from "./SubredditIcon";
import {
  BannerImg,
  BannerWrapper,
  InfoContainer,
  Title,
  SubStats,
} from "./styles";
import { PadOnNarrow } from "../Page";
import PrimaryButton from "../Buttons/PrimaryButton";
import { numberWithSpaces } from "../../utils";
import TextContent from "../TextContent";

type Props = {
  subreddit: Subreddit | null;
  isLoading: boolean;
};

function Banner({ subreddit, isLoading }: Props) {
  if (subreddit === null) {
    return <BannerImg imgSrc="" />;
  }

  const imageSrc = subreddit.banner_background_image || subreddit.banner_img;

  return (
    <BannerWrapper>
      <BannerImg imgSrc={imageSrc} />
      {!isLoading && (
        <Fragment>
          <InfoContainer>
            <PadOnNarrow>
              <SubredditIcon subreddit={subreddit} />
              <Title>
                <h1>{subreddit.display_name_prefixed}</h1>
                <div>
                  <PrimaryButton>Subscribe</PrimaryButton>
                </div>
              </Title>
              <SubStats>
                {numberWithSpaces(subreddit.subscribers)} subscribers
                {" • "}
                {numberWithSpaces(subreddit.active_user_count)} online
              </SubStats>
              <TextContent>{subreddit.public_description_html}</TextContent>
            </PadOnNarrow>
          </InfoContainer>
        </Fragment>
      )}
    </BannerWrapper>
  );
}

export default Banner;
