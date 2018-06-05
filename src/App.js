import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import FaIcon from "@fortawesome/react-fontawesome";

import { fetchPosts, fetchMorePosts, setCurrentSub } from "actions";

import Header from "components/Header";
import PostFeed from "components/PostFeed";

class App extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchMorePosts: PropTypes.func.isRequired,
    currentSub: PropTypes.string.isRequired,
    setCurrentSub: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    const { currentSub } = this.props;
    try {
      this.props.fetchPosts(currentSub);
    } catch (error) {
      console.log(error);
      console.log("Catch in cdm in App");
    }
  };

  loadMore = () => {
    const { currentSub } = this.props;
    try {
      this.props.fetchMorePosts(currentSub);
    } catch (error) {
      console.log(error);
      console.log("catch in loadMore in App?");
    }
  };

  render() {
    const { isLoading, posts, currentSub } = this.props;

    return (
      <Fragment>
        <Header
          currentSubName={currentSub}
          setCurrentSub={this.props.setCurrentSub}
        />
        {isLoading && <FaIcon icon="spinner-third" spin />}
        <PostFeed posts={posts} loadMore={this.loadMore} />
      </Fragment>
    );
  }
}

function mapStateToProps({ posts, currentSub }) {
  return {
    isLoading: posts.isLoading,
    posts: posts.items,
    currentSub,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: () => {
      dispatch(fetchPosts());
    },
    fetchMorePosts: () => {
      dispatch(fetchMorePosts());
    },
    setCurrentSub: sub => {
      dispatch(setCurrentSub(sub));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
