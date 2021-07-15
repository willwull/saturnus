import React from "react";
import Menu from "../Menu";

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
      <Menu.Link to={`${urlString}/?t=all`}>All time</Menu.Link>
      <Menu.Link to={`${urlString}/?t=hour`}>Now</Menu.Link>
      <Menu.Link to={`${urlString}/?t=day`}>Today</Menu.Link>
      <Menu.Link to={`${urlString}/?t=week`}>This week</Menu.Link>
      <Menu.Link to={`${urlString}/?t=month`}>This month</Menu.Link>
      <Menu.Link to={`${urlString}/?t=year`}>This year</Menu.Link>
    </Menu>
  );
}

TimeSortMenu.defaultProps = {
  subreddit: "",
};

export default TimeSortMenu;
