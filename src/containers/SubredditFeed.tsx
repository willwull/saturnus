import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";

import { fetchPosts, fetchMorePosts } from "../actions/posts";

import PostFeed from "../components/PostFeed";
import { postVote } from "../actions/voting";
import { Submission } from "snoowrap";
import { RootState, DispatchType } from "../reducers";
import { PostsSortMode, PostsTimes } from "../reducers/posts";

type StateProps = {
  error: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  posts: Submission[];
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

class SubredditFeed extends Component<Props, {}> {
  static defaultProps: OwnProps = {
    subreddit: "",
    sortMode: "hot",
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

function mapStateToProps({ posts }: RootState, ownProps: OwnProps): StateProps {
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

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    fetchPosts: (
      subreddit: string,
      sortMode: PostsSortMode,
      time: PostsTimes,
    ) => {
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
