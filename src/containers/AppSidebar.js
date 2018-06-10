import React, { Component } from "react";
import { connect } from "react-redux";
import { closeSidebar } from "actions/sidebar";
import Sidebar from "components/Sidebar";

class AppSidebar extends Component {
  render() {
    return <Sidebar {...this.props} />;
  }
}

function mapStateToProps({ sidebar }) {
  return {
    open: sidebar.open,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: () => {
      dispatch(closeSidebar());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppSidebar);
