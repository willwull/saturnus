import React from "react";
import { Subreddit } from "snoowrap";
import { Wrapper, Name, Subtext, Description } from "./styles";
import SubIcon from "../SubIcon";
import { shortenNumber } from "../../utils";

type Props = {
  subreddit: Subreddit;
};

function SubSearchResult({ subreddit }: Props) {
  let subText;
  if (subreddit.subreddit_type === "private" && !subreddit.user_is_subscriber) {
    subText = "Private subreddit";
  } else {
    subText = `${shortenNumber(subreddit.subscribers)} subscribers`;
  }
  return (
    <Wrapper to={`/${subreddit.display_name_prefixed}`}>
      <SubIcon
        icon={subreddit.icon_img}
        color={subreddit.key_color}
        size={40}
      />
      <div>
        <Name>{subreddit.display_name_prefixed}</Name>
        <Subtext>{subText}</Subtext>
      </div>
      <Description>{subreddit.public_description}</Description>
    </Wrapper>
  );
}

export default SubSearchResult;
