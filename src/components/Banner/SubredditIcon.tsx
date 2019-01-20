import React from "react";
import SaturnusLogo from "../SaturnusLogo";
import { IconImg, Fallback } from "./styles";

type Props = {
  subreddit: {
    key_color?: string;
    primary_color?: string;
    icon_img?: string;
  };
};

function SubredditIcon({ subreddit }: Props) {
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

export default SubredditIcon;
