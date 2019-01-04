import React, { Component } from "react";
import Dropdown from "../Dropdown";
import Icon from "../Icon";
import { capitalizeFirstLetter } from "../../utils";
import PostSortMenu from "./PostSortMenu";
import TimeSortMenu from "./TimeSortMenu";
import { Wrapper } from "./styles";

interface StringDict {
  [key: string]: string;
}

function mapSortToElement(sortMode: string) {
  const icons: StringDict = {
    best: "rocket",
    hot: "fire",
    top: "arrow-to-top",
    new: "certificate",
    controversial: "bolt",
    rising: "chart-line",
  };

  return (
    <React.Fragment>
      <Icon icon={icons[sortMode]} />
      &nbsp; {capitalizeFirstLetter(sortMode)} &nbsp;
      <Icon icon="caret-down" />
    </React.Fragment>
  );
}

function mapTimeToElement(timeSort: string) {
  // month is the default time sort
  const names: StringDict = {
    hour: "Now",
    day: "Today",
    week: "This week",
    month: "This month",
    year: "This year",
    all: "All time",
  };

  return (
    <React.Fragment>
      <Icon icon="far clock" />
      &nbsp; {names[timeSort] || names.month} &nbsp;
      <Icon icon="caret-down" />
    </React.Fragment>
  );
}

type Props = {
  currentSort: string;
  currentTimeSort?: string;
  subreddit?: string;
};

class FeedSortOptions extends Component<Props, {}> {
  static defaultProps = {
    subreddit: "",
    currentTimeSort: "",
  };

  render() {
    const { currentSort, subreddit, currentTimeSort } = this.props;

    const sortMenu = <PostSortMenu subreddit={subreddit} />;

    let timeMenu;
    // should show time sort options
    if (currentSort === "top" || currentSort === "controversial") {
      timeMenu = (
        <TimeSortMenu subreddit={subreddit} currentSort={currentSort} />
      );
    }

    return (
      <Wrapper>
        <Dropdown overlay={sortMenu} placement="bottomLeft">
          {mapSortToElement(currentSort)}
        </Dropdown>

        {(currentSort === "top" || currentSort === "controversial") && (
          <Dropdown overlay={timeMenu} placement="bottomRight">
            {mapTimeToElement(currentTimeSort!)}
          </Dropdown>
        )}
      </Wrapper>
    );
  }
}

export default FeedSortOptions;
