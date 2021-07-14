import React from "react";
import Menu from "../Menu";
import Icon from "../Icon";

type Props = {
  subreddit?: string;
  currentSort: "top" | "controversial";
};

function TimeSortMenu({ subreddit, currentSort }: Props) {
  const urlString = subreddit
    ? `/r/${subreddit}/${currentSort}`
    : `/${currentSort}`;
  return (
    <Menu>
      <Menu.Link to={`${urlString}/?t=all`}>
        <Icon icon="far infinity" /> All time
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=hour`}>
        <Icon icon="far circle" /> Now
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=day`}>
        <Icon icon="far circle" /> Today
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=week`}>
        <Icon icon="far circle" /> This week
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=month`}>
        <Icon icon="far circle" /> This month
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=year`}>
        <Icon icon="far circle" /> This year
      </Menu.Link>
    </Menu>
  );
}

TimeSortMenu.defaultProps = {
  subreddit: "",
};

export default TimeSortMenu;
