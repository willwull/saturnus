import React, { Component } from "react";
import styled from "@marionebl/styled-components";
import { transparentize } from "polished";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Menu from "components/Menu";
import Dropdown from "components/Dropdown";
import Icon from "components/Icon";

const Wrapper = styled.div`
  padding: 0 15px 10px 15px;
  color: ${props => transparentize(0.3, props.theme.text)};
`;

class FeedSortOptions extends Component {
  static propTypes = {};

  render() {
    const overlay = (
      <Menu>
        <Menu.Item>
          <Icon icon="far rocket" fixedWidth /> Best
        </Menu.Item>
        <Menu.Item>
          <Icon icon="far fire" fixedWidth /> Hot
        </Menu.Item>
        <Menu.Item>
          <Icon icon="far certificate" fixedWidth /> New
        </Menu.Item>
        <Menu.Item>
          <Icon icon="far bolt" fixedWidth /> Controversial
        </Menu.Item>
        <Menu.Item>
          <Icon icon="far arrow-to-top" fixedWidth /> Top
        </Menu.Item>
        <Menu.Item>
          <Icon icon="far chart-line" fixedWidth /> Rising
        </Menu.Item>
      </Menu>
    );

    return (
      <Wrapper>
        <Dropdown overlay={overlay} placement="bottomLeft">
          <Icon icon="rocket" /> Best <Icon icon="caret-down" />
        </Dropdown>
      </Wrapper>
    );
  }
}

function mapStateToProps({}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedSortOptions);
