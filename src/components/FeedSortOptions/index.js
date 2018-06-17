import React, { Component } from "react";
import styled from "@marionebl/styled-components";
import { transparentize } from "polished";
import PropTypes from "prop-types";
import Dropdown from "components/Dropdown";
import Icon from "components/Icon";
import { capitalizeFirstLetter } from "utils";
import PostSortMenu from "./PostSortMenu";
import TimeSortMenu from "./TimeSortMenu";

const Wrapper = styled.div`
  padding: 0 15px 10px 15px;
  color: ${props => transparentize(0.3, props.theme.text)};
  display: flex;
  justify-content: space-between;
`;

function mapSortToElement(sortMode) {
  const icons = {
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

class FeedSortOptions extends Component {
  static propTypes = {
    currentSort: PropTypes.string.isRequired,
    subreddit: PropTypes.string,
  };

  static defaultProps = {
    subreddit: "",
  };

  render() {
    const { currentSort, subreddit } = this.props;

    const sortMenu = <PostSortMenu subreddit={subreddit} />;

    let timeMenu;
    const shouldShowTimeOptions =
      currentSort === "top" || currentSort === "controversial";
    if (shouldShowTimeOptions) {
      timeMenu = (
        <TimeSortMenu subreddit={subreddit} currentSort={currentSort} />
      );
    }

    return (
      <Wrapper>
        <Dropdown overlay={sortMenu} placement="bottomLeft">
          {mapSortToElement(currentSort)}
        </Dropdown>

        {shouldShowTimeOptions && (
          <Dropdown overlay={timeMenu} placement="bottomRight">
            {mapSortToElement(currentSort)}
          </Dropdown>
        )}
      </Wrapper>
    );
  }
}

export default FeedSortOptions;
