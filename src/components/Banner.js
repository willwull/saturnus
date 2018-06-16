import React from "react";
import PropTypes from "prop-types";
import styled from "@marionebl/styled-components";
import SubredditIcon from "./SubredditIcon";

const BannerWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${props => props.theme.primary};
  background-image: ${props => `url(${props.src})`};
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

function Banner({ subreddit, isLoading, ...rest }) {
  const imageSrc = subreddit.banner_background_image || subreddit.banner_img;

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

Banner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  subreddit: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default Banner;
