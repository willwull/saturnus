import React, { Component } from "react";
import styled from "@marionebl/styled-components";
import { transparentize } from "polished";
import PropTypes from "prop-types";
import Menu from "components/Menu";
import Dropdown from "components/Dropdown";
import Icon from "components/Icon";
import { capitalizeFirstLetter } from "utils";

const Wrapper = styled.div`
  padding: 0 15px 10px 15px;
  color: ${props => transparentize(0.3, props.theme.text)};
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

    const subUrlString = subreddit ? `/r/${subreddit}` : "";

    // best should only be shown on the front page, i.e., only if there is no
    // subreddit specified
    const overlay = (
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

    return (
      <Wrapper>
        <Dropdown overlay={overlay} placement="bottomLeft">
          {mapSortToElement(currentSort)}
        </Dropdown>
      </Wrapper>
    );
  }
}

export default FeedSortOptions;
