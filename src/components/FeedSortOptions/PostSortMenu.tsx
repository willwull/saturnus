import React from "react";
import Menu from "../Menu";
import {
  Award,
  Droplet,
  ArrowUp,
  Activity,
  Zap,
  TrendingUp,
} from "react-feather";

type Props = {
  subreddit?: string;
};

function PostSortMenu({ subreddit }: Props) {
  const subUrlString = subreddit ? `/r/${subreddit}` : "";
  return (
    <Menu>
      {!subreddit && (
        <Menu.Link to="/best">
          <Award size={20} /> Best
        </Menu.Link>
      )}
      <Menu.Link to={`${subUrlString}/hot`}>
        <Droplet size={20} /> Hot
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/top`}>
        <ArrowUp size={20} /> Top
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/new`}>
        <Activity size={20} /> New
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/controversial`}>
        <Zap size={20} /> Controversial
      </Menu.Link>
      <Menu.Link to={`${subUrlString}/rising`}>
        <TrendingUp size={20} /> Rising
      </Menu.Link>
    </Menu>
  );
}

PostSortMenu.defaultProps = {
  subreddit: "",
};

export default PostSortMenu;
