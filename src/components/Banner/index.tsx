import React, { Fragment, useState, useRef, useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router";
import { Subreddit } from "snoowrap";
import SubredditIcon from "./SubredditIcon";
import {
  BannerImg,
  BannerWrapper,
  InfoContainer,
  Title,
  SubStats,
  ReadMoreBtn,
} from "./styles";
import { PadOnNarrow } from "../Page";
import PrimaryButton from "../Buttons/PrimaryButton";
import { numberWithSpaces, usePrevious } from "../../utils";
import TextContent from "../TextContent";
import Icon from "../Icon";
import Modal from "../Modal";

type OwnProps = {
  data: Subreddit | null;
  isLoading: boolean;
  isLoadingSubscription: boolean;
  error: boolean;
  isLoggedIn: boolean;
  subscribe: (sub: Subreddit, action: "sub" | "unsub") => void;
};

type Props = OwnProps & RouteComponentProps;

function Banner({
  data,
  isLoading,
  isLoadingSubscription,
  subscribe,
  isLoggedIn,
  location,
}: Props) {
  const [modalIsOpen, setModalState] = useState(false);
  const prevLocation = usePrevious(location);

  useEffect(
    () => {
      if (location !== prevLocation) {
        setModalState(false);
      }
    },
    [location],
  );

  function openModal() {
    setModalState(true);
  }

  function toggleModal() {
    setModalState(!modalIsOpen);
  }

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
              <ReadMoreBtn onClick={openModal}>
                + Read full description
              </ReadMoreBtn>
            </PadOnNarrow>
          </InfoContainer>
        </Fragment>
      )}

      <Modal isOpen={modalIsOpen} hideFunc={toggleModal}>
        <TextContent>{data.description_html}</TextContent>
      </Modal>
    </BannerWrapper>
  );
}

export default withRouter(Banner);
