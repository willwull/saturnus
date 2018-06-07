import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { fetchCurrentPost } from "actions/currentPost";
import Loading from "components/Loading";
import Post from "components/Post";

class CurrentPost extends Component {
  static propTypes = {
    // react-router
    match: PropTypes.object.isRequired,
    // redux
    fetch: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    post: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const {
      match: { params },
    } = this.props;

    this.props.fetch(params.postId);
  }

  render() {
    const { isLoading, post } = this.props;

    if (isLoading || !post.id) {
      return <Loading type="regular" />;
    }

    console.log(post);
    return <Post post={post} />;
  }
}

function mapStateToProps({ currentPost }) {
  return {
    post: currentPost.post,
    isLoading: currentPost.isLoading,
    errorMsg: currentPost.errorMsg,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetch: postId => {
      dispatch(fetchCurrentPost(postId));
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CurrentPost),
);
