import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import {
  fetchPosts,
  fetchMorePosts,
  DEFAULT_SORT_MODE,
} from "../actions/posts";

import PostFeed from "../components/PostFeed";
import { postVote } from "../actions/voting";
import { Submission } from "snoowrap";
import { RootState, DispatchType } from "../reducers";
import {
  PostsSortMode,
  PostsTimes,
  PostsInSubState,
  mapIdsToPosts,
} from "../reducers/posts";

// MARK: Types

type StateProps = {
  error: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  posts: Submission[];
  storedSortMode: PostsSortMode;
};

type DispatchProps = {
  fetchPosts: (
    subreddit: string,
    sortMode: PostsSortMode,
    time: PostsTimes,
  ) => void;
  fetchMorePosts: (subreddit: string) => void;
  voteOnPost: (post: Submission, vote: "up" | "down") => void;
};

type OwnProps = {
  subreddit: string;
  sortMode: PostsSortMode;
};

type Props = OwnProps & StateProps & DispatchProps & RouteComponentProps;

// MARK: Component

class SubredditFeed extends Component<Props, {}> {
  static defaultProps: OwnProps = {
    subreddit: "",
    sortMode: DEFAULT_SORT_MODE,
  };

  componentDidMount() {
    this.loadPosts();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.location !== prevProps.location) {
      this.loadPosts();
    }
  }

  loadPosts = () => {
    const {
      subreddit,
      sortMode,
      storedSortMode,
      location,
      posts,
      history,
    } = this.props;

    // If the user has already visited this sub and gets here by backing,
    // we don't reload the feed unless the difference between the locations
    // is the post sort mode.
    if (
      posts.length !== 0 &&
      history.action === "POP" &&
      sortMode === storedSortMode
    ) {
      return;
    }

    // If we have navigated to the post page, no need to fetch new posts
    // in the subreddit feed.
    if (location.pathname.includes("/comments/")) {
      return;
    }

    const searchParams = new URLSearchParams(location.search);
    const time: PostsTimes = (searchParams.get("t") as PostsTimes) || "month";
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
    const timeSort = searchParams.get("t") || "";

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

// MARK: Redux

function mapStateToProps(
  { posts: postsState }: RootState,
  ownProps: OwnProps,
): StateProps {
  const currentPosts: PostsInSubState = postsState.bySubreddit[
    ownProps.subreddit
  ] || {
    error: false,
    isLoading: false,
    isLoadingMore: false,
    items: [],
    sortMode: "best",
  };

  const posts = mapIdsToPosts(currentPosts.items, postsState);

  // Instead of directly passing a list of posts, we pass the postsState
  // and the list of IDs. Mapping IDs to posts is a heavy operation, which we
  // don't want to do each time the root state changes, so the render method
  // takes care of mapping the IDs to posts
  const props = {
    error: currentPosts.error,
    isLoading: currentPosts.isLoading,
    isLoadingMore: currentPosts.isLoadingMore,
    posts,
    storedSortMode: currentPosts.sortMode,
  };

  return props;
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    fetchPosts: (
      subreddit: string,
      sortMode: PostsSortMode,
      time: PostsTimes,
    ) => {
      dispatch(fetchPosts(subreddit, sortMode, time));
    },
    fetchMorePosts: (subreddit) => {
      dispatch(fetchMorePosts(subreddit));
    },
    voteOnPost: (post, vote) => {
      dispatch(postVote(post, vote));
    },
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SubredditFeed),
);
