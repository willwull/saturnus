import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import SaturnusLogo from "./SaturnusLogo";

const commonCSS = css`
  display: inline-block;
  border-radius: 50%;
  border: 2px solid white;
  width: 1.5em;
  height: 1.5em;
  margin-right: 1ch;
  background-color: ${props => props.color || props.theme.primary};
`;

const IconImg = styled.img`
  ${commonCSS};
`;

const Fallback = styled.div`
  ${commonCSS};
  display: flex;
  align-items: center;
  justify-content: center;

  .saturnus-logo {
    font-size: 0.85em;
  }
`;

function SubredditIcon({ subreddit }) {
  const color = subreddit.key_color || subreddit.primary_color;

  if (subreddit.icon_img) {
    return <IconImg src={subreddit.icon_img} color={color} />;
  }

  return (
    <Fallback color={color}>
      <SaturnusLogo />
    </Fallback>
  );
}

SubredditIcon.propTypes = {
  subreddit: PropTypes.object.isRequired,
};

export default SubredditIcon;
