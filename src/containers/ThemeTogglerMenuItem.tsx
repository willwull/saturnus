import React, { Component } from "react";
import { connect } from "react-redux";
import Icon from "../components/Icon";
import Menu from "../components/Menu";
import { toggleTheme } from "../actions/theme";
import { RootState, DispatchType } from "../reducers";

type StateProps = {
  isDark: boolean;
};

type DispatchProps = {
  toggle: () => void;
};

type Props = StateProps & DispatchProps;

class ThemeTogglerMenuItem extends Component<Props, {}> {
  render() {
    const icon = this.props.isDark ? "fa moon" : "far moon";
    return (
      <Menu.Item onClick={this.props.toggle}>
        <Icon icon={icon} fixedWidth /> Toggle dark mode
      </Menu.Item>
    );
  }
}

function mapStateToProps({ theme }: RootState): StateProps {
  return {
    isDark: theme.isDark,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
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
