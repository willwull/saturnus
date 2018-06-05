import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";

import { initSnoowrap } from "actions";
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
      return (
        <div className="loading-container">
          <FaIcon icon="spinner-third" spin />
        </div>
      );
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
