import React, { Component, Fragment } from "react";
import { Subreddit, Submission } from "snoowrap";
import { connect } from "react-redux";
import { DispatchType, RootState } from "../reducers";
import { search } from "../actions/search";
import SubSearchResult from "../components/SubSearchResult";
import { PadOnNarrow } from "../components/Page";
import Loading from "../components/Loading";
import Post from "../components/Post";
import { PrimaryLink } from "../components/Buttons/PrimaryButton";
import styled from "styled-components";
import { mapIdsToPosts, PostsState } from "../reducers/posts";
import { postVote } from "../actions/voting";

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

// MARK: Types

export type SearchType = "" | "link" | "sr";

type OwnProps = {
  query: string;
  type?: SearchType;
  limitToSub?: string;
};

type DefaultProps = {
  type: SearchType;
  limitToSub: string;
};

type StateProps = {
  isLoading: boolean;
  isLoadingPosts: boolean;
  subreddits: Subreddit[];
  postIds: string[];
  postsState: PostsState;
};

type DispatchProps = {
  search: (query: string, subreddit: string) => void;
  voteOnPost: (post: Submission, vote: "up" | "down") => void;
};

type Props = OwnProps & StateProps & DispatchProps;

// MARK: Component

class CurrentSearchResults extends Component<Props, {}> {
  static defaultProps: DefaultProps = {
    type: "",
    limitToSub: "",
  };

  componentDidMount() {
    this.performSearch();
  }

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.query !== this.props.query ||
      prevProps.limitToSub !== this.props.limitToSub
    ) {
      this.performSearch();
    }
  }

  performSearch() {
    const { query, search, limitToSub } = this.props;
    search(query, limitToSub!);
  }

  render() {
    const {
      subreddits,
      isLoading,
      isLoadingPosts,
      postIds,
      postsState,
      query,
      type,
      voteOnPost,
    } = this.props;

    const showSubResults = type !== "link";
    const showPostResults = type !== "sr";

    const showMoreSubsBtn =
      type !== "sr" && !isLoading && subreddits.length > 3;
    const showMorePostsBtn =
      type !== "link" && !isLoadingPosts && postIds.length > 5;

    let subResults;
    if (type === "sr") {
      subResults = subreddits;
    } else {
      subResults = subreddits.slice(0, 3);
    }

    const posts = mapIdsToPosts(postIds, postsState);
    let postResults;
    if (type === "link") {
      postResults = posts;
    } else {
      postResults = posts.slice(0, 5);
    }

    let subContent;
    if (isLoading) {
      subContent = <Loading type="regular" />;
    } else if (subResults.length === 0) {
      subContent = <PadOnNarrow>Found nothing :(</PadOnNarrow>;
    } else {
      subContent = subResults.map(sub => (
        <SubSearchResult key={sub.display_name_prefixed} subreddit={sub} />
      ));
    }

    let postContent;
    if (isLoadingPosts) {
      postContent = <Loading type="regular" />;
    } else if (postResults.length === 0) {
      postContent = <PadOnNarrow>Found nothing :(</PadOnNarrow>;
    } else {
      postContent = postResults.map(post => (
        <Post key={post.id} post={post} voteOnPost={voteOnPost} />
      ));
    }

    return (
      <div>
        {showSubResults && (
          <Fragment>
            <PadOnNarrow>
              <h2>Subreddits:</h2>
            </PadOnNarrow>

            {subContent}

            {showMoreSubsBtn && (
              <LinkWrapper>
                <PrimaryLink to={`/search?q=${query}&type=sr`}>
                  See all
                </PrimaryLink>
              </LinkWrapper>
            )}
          </Fragment>
        )}

        {showPostResults && (
          <Fragment>
            <PadOnNarrow>
              <h2>Posts:</h2>
            </PadOnNarrow>

            {postContent}

            {showMorePostsBtn && (
              <LinkWrapper>
                <PrimaryLink to={`/search?q=${query}&type=link`}>
                  See all
                </PrimaryLink>
              </LinkWrapper>
            )}
          </Fragment>
        )}
      </div>
    );
  }
}

// MARK: Redux

function mapStateToProps({ search, posts }: RootState): StateProps {
  return {
    isLoading: search.isLoading,
    isLoadingPosts: search.isLoadingPosts,
    subreddits: search.subreddits,
    postIds: search.posts,
    postsState: posts,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    search: (query: string, subreddit: string) => {
      dispatch(search(query, subreddit));
    },
    voteOnPost: (post: Submission, vote: "up" | "down") => {
      dispatch(postVote(post, vote));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentSearchResults);
