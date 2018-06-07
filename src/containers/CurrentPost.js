import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { fetchCurrentPost } from "actions/currentPost";

class CurrentPost extends Component {
  static propTypes = {
    fetch: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetch("8p2y7v");
  }

  render() {
    return "hello";
  }
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: postId => {
      dispatch(fetchCurrentPost(postId));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentPost);
