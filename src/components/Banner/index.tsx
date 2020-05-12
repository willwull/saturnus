import React, { Fragment } from "react";
import BannerIcon from "./BannerIcon";
import {
  BannerImg,
  BannerWrapper,
  InfoContainer,
  Title,
  SubStats,
  BottomWrapper,
} from "./styles";
import { PadOnNarrow } from "../Page";
import Text from "../Base/Text";

type Props = {
  title: string;
  subtitle: string;
  primaryAction?: React.ReactNode;
  iconSrc?: string;
  iconColor?: string;
  bannerSrc?: string;
  bannerColor?: string;
  children?: React.ReactNode;
  bottom?: React.ReactNode;
};

function Banner({
  title,
  subtitle,
  bannerSrc,
  bannerColor,
  iconSrc,
  iconColor,
  primaryAction,
  children,
  bottom,
}: Props) {
  return (
    <BannerWrapper>
      <BannerImg imgSrc={bannerSrc} bgColor={bannerColor} />
      <Fragment>
        <InfoContainer>
          <PadOnNarrow>
            <BannerIcon imageSrc={iconSrc} color={iconColor} />
            <Title>
              <h1>{title}</h1>
              <div>{primaryAction}</div>
            </Title>
            <SubStats>
              <Text color="textDeemphasized">{subtitle}</Text>
            </SubStats>
            {children}
          </PadOnNarrow>
        </InfoContainer>
        {bottom != null && <BottomWrapper>{bottom}</BottomWrapper>}
      </Fragment>
    </BannerWrapper>
  );
}

export default Banner;
