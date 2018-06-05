import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { initSnoowrap } from "actions";
import Loading from "components/Loading";
import App from "./App";

class Root extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    createSnoowrapper: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.createSnoowrapper();
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return <Loading type="fullscreen" />;
    }

    return <App />;
  }
}

function mapStateToProps({ snoowrap }) {
  return { isLoading: snoowrap.isLoading };
}

function mapDispatchToProps(dispatch) {
  return {
    createSnoowrapper: () => {
      dispatch(initSnoowrap());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
