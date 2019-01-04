import React, { Component } from "react";
import { connect } from "react-redux";
import { openSidebar } from "../actions/sidebar";
import { DispatchType, RootState } from "../reducers";

type DispatchProps = {
  openSidebar: () => void;
};

class SidebarToggler extends Component<DispatchProps, {}> {
  render() {
    const { openSidebar: onClick, ...props } = this.props;
    return <button {...props} onClick={onClick} />;
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    openSidebar: () => {
      dispatch(openSidebar());
    },
  };
}

export default connect<{}, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarToggler);
