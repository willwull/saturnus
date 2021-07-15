import React, { Component } from "react";
import Dropdown from "../Dropdown";
import { capitalizeFirstLetter } from "../../utils";
import PostSortMenu from "./PostSortMenu";
import TimeSortMenu from "./TimeSortMenu";
import { Wrapper, Row } from "./styles";
import {
  Award,
  Icon,
  ChevronDown,
  Clock,
  Droplet,
  ArrowUp,
  Activity,
  Zap,
  TrendingUp,
} from "react-feather";

interface StringDict {
  [key: string]: string;
}

function mapSortToElement(sortMode: string) {
  const icons: Record<string, Icon> = {
    best: Award,
    hot: Droplet,
    top: ArrowUp,
    new: Activity,
    controversial: Zap,
    rising: TrendingUp,
  };

  const SortModeIcon = icons[sortMode];

  return (
    <Row>
      <SortModeIcon size={20} />
      {capitalizeFirstLetter(sortMode)}
      <ChevronDown size={20} />
    </Row>
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
    <Row>
      <Clock size={20} />
      {names[timeSort] || names.month}
      <ChevronDown size={20} />
    </Row>
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
          <Dropdown overlay={timeMenu} placement="bottomLeft">
            {mapTimeToElement(currentTimeSort!)}
          </Dropdown>
        )}
      </Wrapper>
    );
  }
}

export default FeedSortOptions;
