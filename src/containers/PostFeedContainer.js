import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { fetchPosts, fetchMorePosts } from "actions/posts";

import PostFeed from "components/PostFeed";

class PostFeedContainer extends Component {
  static propTypes = {
    subreddit: PropTypes.string,
    /* Below are from redux */
    error: PropTypes.bool.isRequired,
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
    this.props.fetchPosts(subreddit);
  };

  loadMore = () => {
    const { subreddit } = this.props;
    this.props.fetchMorePosts(subreddit);
  };

  render() {
    const { isLoading, isLoadingMore, posts, error } = this.props;

    if (error) {
      return <div className="main-content">Something went wrong :(</div>;
    }

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

function mapStateToProps({ posts }, ownProps) {
  const currentPosts = posts[ownProps.subreddit] || {
    error: false,
    isLoading: false,
    isLoadingMore: false,
    items: [],
  };

  const props = {
    error: currentPosts.error,
    isLoading: currentPosts.isLoading,
    isLoadingMore: currentPosts.isLoadingMore,
    posts: currentPosts.items,
  };

  return props;
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPosts: subreddit => {
      dispatch(fetchPosts(subreddit));
    },
    fetchMorePosts: subreddit => {
      dispatch(fetchMorePosts(subreddit));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostFeedContainer);
