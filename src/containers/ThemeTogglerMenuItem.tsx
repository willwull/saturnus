import React, { Component } from "react";
import { connect } from "react-redux";
import { Moon } from "react-feather";
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
    return (
      <Menu.Item onClick={this.props.toggle}>
        <Moon size={20} /> Toggle dark mode
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
