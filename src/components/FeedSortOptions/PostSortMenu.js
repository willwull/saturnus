import React from "react";
import PropTypes from "prop-types";
import Menu from "../Menu";
import Icon from "../Icon";

function PostSortMenu({ subreddit }) {
  const subUrlString = subreddit ? `/r/${subreddit}` : "";
  return (
    <Menu>
      {!subreddit && (
        <Menu.Link to="/best">
          <Icon icon="far rocket" fixedWidth /> Best
        </Menu.Link>
      )}
      <Menu.Link to={`${subUrlString}/hot`}>
        <Icon icon="far fire" fixedWidth /> Hot
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/top`}>
        <Icon icon="far arrow-to-top" fixedWidth /> Top
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/new`}>
        <Icon icon="far certificate" fixedWidth /> New
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/controversial`}>
        <Icon icon="far bolt" fixedWidth /> Controversial
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/rising`}>
        <Icon icon="far chart-line" fixedWidth /> Rising
      </Menu.Link>
    </Menu>
  );
}

PostSortMenu.propTypes = {
  subreddit: PropTypes.string,
};

PostSortMenu.defaultProps = {
  subreddit: "",
};

export default PostSortMenu;
