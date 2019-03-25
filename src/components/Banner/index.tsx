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
import Icon from "../Icon";

type Props = {
  data: Subreddit | null;
  isLoading: boolean;
  isLoadingSubscription: boolean;
  error: boolean;
  isLoggedIn: boolean;
  subscribe: (sub: Subreddit, action: "sub" | "unsub") => void;
};

function Banner({
  data,
  isLoading,
  isLoadingSubscription,
  subscribe,
  isLoggedIn,
}: Props) {
  if (data === null) {
    return <BannerImg imgSrc="" />;
  }

  function onSubscribeClick() {
    subscribe(data!, "sub");
  }

  function onUnsubscribeClick() {
    subscribe(data!, "unsub");
  }

  const imageSrc = data.banner_background_image || data.banner_img;

  let btn;
  if (data.user_is_subscriber) {
    btn = (
      <PrimaryButton
        disabled={!isLoggedIn || isLoadingSubscription}
        onClick={onUnsubscribeClick}
      >
        <Icon icon="far check" /> Subscribed
      </PrimaryButton>
    );
  } else {
    btn = (
      <PrimaryButton
        disabled={!isLoggedIn || isLoadingSubscription}
        onClick={onSubscribeClick}
      >
        <Icon icon="far plus" /> Subscribe
      </PrimaryButton>
    );
  }

  return (
    <BannerWrapper>
      <BannerImg imgSrc={imageSrc} />
      {!isLoading && (
        <Fragment>
          <InfoContainer>
            <PadOnNarrow>
              <SubredditIcon subreddit={data} />
              <Title>
                <h1>{data.display_name_prefixed}</h1>
                <div>{btn}</div>
              </Title>
              <SubStats>
                {numberWithSpaces(data.subscribers)} subscribers
                {" • "}
                {numberWithSpaces(data.active_user_count)} online
              </SubStats>
              <TextContent>{data.public_description_html}</TextContent>
            </PadOnNarrow>
          </InfoContainer>
        </Fragment>
      )}
    </BannerWrapper>
  );
}

export default Banner;
