import React, { Fragment } from "react";
import BannerIcon from "./BannerIcon";
import {
  BannerImg,
  BannerWrapper,
  InfoContainer,
  Title,
  SubStats,
} from "./styles";
import { PadOnNarrow } from "../Page";

type Props = {
  title: string;
  subtitle: string;
  primaryAction?: React.ReactNode;
  iconSrc?: string;
  iconColor?: string;
  bannerSrc?: string;
  bannerColor?: string;
  children?: React.ReactNode;
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
}: Props) {
  return (
    <BannerWrapper>
      {bannerSrc && <BannerImg imgSrc={bannerSrc} bgColor={bannerColor} />}
      <Fragment>
        <InfoContainer>
          <PadOnNarrow>
            <BannerIcon imageSrc={iconSrc} color={iconColor} />
            <Title>
              <h1>{title}</h1>
              <div>{primaryAction}</div>
            </Title>
            <SubStats>{subtitle}</SubStats>
            {children}
          </PadOnNarrow>
        </InfoContainer>
      </Fragment>
    </BannerWrapper>
  );
}

export default Banner;
