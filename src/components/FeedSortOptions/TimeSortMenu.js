import React from "react";
import PropTypes from "prop-types";
import Menu from "../Menu";
import Icon from "../Icon";

function TimeSortMenu({ subreddit, currentSort }) {
  const urlString = subreddit
    ? `/r/${subreddit}/${currentSort}`
    : `/${currentSort}`;
  return (
    <Menu>
      <Menu.Link to={`${urlString}/?t=hour`}>
        <Icon icon="far fire" fixedWidth /> Now
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=day`}>
        <Icon icon="far arrow-to-top" fixedWidth /> Today
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=week`}>
        <Icon icon="far certificate" fixedWidth /> This week
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=month`}>
        <Icon icon="far bolt" fixedWidth /> This month
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=year`}>
        <Icon icon="far chart-line" fixedWidth /> This year
      </Menu.Link>
      <Menu.Link to={`${urlString}/?t=all`}>
        <Icon icon="far chart-line" fixedWidth /> All time
      </Menu.Link>
    </Menu>
  );
}

TimeSortMenu.propTypes = {
  subreddit: PropTypes.string,
  currentSort: PropTypes.oneOf(["top", "controversial"]).isRequired,
};

TimeSortMenu.defaultProps = {
  subreddit: "",
};

export default TimeSortMenu;
