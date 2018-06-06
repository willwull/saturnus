import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchPosts, fetchMorePosts, setCurrentSub } from "actions";

import PostFeed from "components/PostFeed";

class PostFeedContainer extends Component {
  static propTypes = {
    subreddit: PropTypes.string,
    /* Below are from redux */
    posts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchMorePosts: PropTypes.func.isRequired,
  };

  static defaultProps = {
    subreddit: "",
  };

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = () => {
    const { subreddit } = this.props;
    try {
      this.props.fetchPosts(subreddit);
    } catch (error) {
      console.log(error);
      console.log("Catch in cdm in PostFeed");
    }
  };

  loadMore = () => {
    const { subreddit } = this.props;
    try {
      this.props.fetchMorePosts(subreddit);
    } catch (error) {
      console.log(error);
      console.log("catch in loadMore in PostFeed");
    }
  };

  render() {
    const { isLoading, isLoadingMore, posts } = this.props;

    return (
      <PostFeed
        posts={posts}
        loadMore={this.loadMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
      />
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    isLoading: posts.isLoading,
    isLoadingMore: posts.isLoadingMore,
    posts: posts.items,
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
)(PostFeedContainer);
