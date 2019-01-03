import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import { fetchPosts, fetchMorePosts } from "../actions/posts";

import PostFeed from "../components/PostFeed";
import { postVote } from "../actions/voting";

class SubredditFeed extends Component {
  static propTypes = {
    subreddit: PropTypes.string,
    sortMode: PropTypes.string,
    /* React Router */
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    /* Below are from redux */
    error: PropTypes.bool.isRequired,
    posts: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isLoadingMore: PropTypes.bool.isRequired,
    fetchPosts: PropTypes.func.isRequired,
    fetchMorePosts: PropTypes.func.isRequired,
    voteOnPost: PropTypes.func.isRequired,
  };

  static defaultProps = {
    subreddit: "",
    sortMode: "hot",
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps) {
    console.log("updateeeee");
    if (this.props.location !== prevProps.location) {
      this.loadPosts();
    }
  }

  loadPosts = () => {
    const { subreddit, sortMode, location, posts, history } = this.props;

    // If the user has already visited this sub and gets here by backing, we
    // don't reload the feed.
    if (posts.length !== 0 && history.action === "POP") {
      console.log("Skipping fetch of posts");
      return;
    }

    // If we have navigated to the post page, no need to fetch new posts
    // in the subreddit feed.
    if (location.pathname.includes("/comments/")) {
      console.log("Skipping feed fetching; in post page");
      return;
    }

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
      voteOnPost,
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
        voteOnPost={voteOnPost}
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
    voteOnPost: (post, vote) => {
      dispatch(postVote(post, vote));
    },
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SubredditFeed),
);
