import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Icon from "components/Icon";
import Menu from "components/Menu";
import { toggleTheme } from "actions/theme";

class ThemeTogglerMenuItem extends Component {
  static propTypes = {
    isDark: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
  };

  render() {
    const icon = this.props.isDark ? "fa moon" : "far moon";
    return (
      <Menu.Item onClick={this.props.toggle}>
        <Icon icon={icon} fixedWidth /> Toggle dark mode
      </Menu.Item>
    );
  }
}

function mapStateToProps({ theme }) {
  return {
    isDark: theme.isDark,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    toggle: () => {
      dispatch(toggleTheme());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ThemeTogglerMenuItem);
