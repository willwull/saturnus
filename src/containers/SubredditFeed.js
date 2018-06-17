import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { fetchPosts, fetchMorePosts } from "actions/posts";

import PostFeed from "components/PostFeed";

class SubredditFeed extends Component {
  static propTypes = {
    subreddit: PropTypes.string,
    sortMode: PropTypes.string,
    /* React Router */
    location: PropTypes.object.isRequired,
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
    sortMode: "hot",
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.loadPosts();
    }
  }

  loadPosts = () => {
    const { subreddit, sortMode, location } = this.props;
    const searchParams = new URLSearchParams(location.search);
    const time = searchParams.get("t");
    this.props.fetchPosts(subreddit, sortMode, time);
  };

  loadMore = () => {
    const { subreddit } = this.props;
    this.props.fetchMorePosts(subreddit);
  };

  render() {
    const {
      isLoading,
      isLoadingMore,
      posts,
      error,
      sortMode,
      subreddit,
      location,
    } = this.props;

    if (error) {
      return <div className="main-content">Something went wrong :(</div>;
    }

    const searchParams = new URLSearchParams(location.search);
    const timeSort = searchParams.get("t");

    return (
      <PostFeed
        posts={posts}
        loadMore={this.loadMore}
        isLoading={isLoading}
        isLoadingMore={isLoadingMore}
        subreddit={subreddit}
        currentSort={sortMode}
        currentTimeSort={timeSort}
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
    fetchPosts: (subreddit, sortMode, time) => {
      dispatch(fetchPosts(subreddit, sortMode, time));
    },
    fetchMorePosts: subreddit => {
      dispatch(fetchMorePosts(subreddit));
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SubredditFeed),
);
