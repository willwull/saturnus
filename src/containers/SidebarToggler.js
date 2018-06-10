import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { openSidebar } from "actions/sidebar";

class SidebarToggler extends Component {
  static propTypes = {
    openSidebar: PropTypes.func.isRequired,
  };

  render() {
    const { openSidebar: onClick, ...props } = this.props;
    return <button {...props} onClick={onClick} />;
  }
}

function mapStateToProps({}) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    openSidebar: () => {
      dispatch(openSidebar());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SidebarToggler);
