import React from "react";
import Menu from "../Menu";
import Icon from "../Icon";

type Props = {
  subreddit?: string;
};

function PostSortMenu({ subreddit }: Props) {
  const subUrlString = subreddit ? `/r/${subreddit}` : "";
  return (
    <Menu>
      {!subreddit && (
        <Menu.Link to="/best">
          <Icon icon="far rocket" /> Best
        </Menu.Link>
      )}
      <Menu.Link to={`${subUrlString}/hot`}>
        <Icon icon="far fire" /> Hot
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/top`}>
        <Icon icon="far arrow-to-top" /> Top
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/new`}>
        <Icon icon="far certificate" /> New
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/controversial`}>
        <Icon icon="far bolt" /> Controversial
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/rising`}>
        <Icon icon="far chart-line" /> Rising
      </Menu.Link>
    </Menu>
  );
}

PostSortMenu.defaultProps = {
  subreddit: "",
};

export default PostSortMenu;
