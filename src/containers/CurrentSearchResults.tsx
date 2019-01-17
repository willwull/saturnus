import React, { Component } from "react";
import { connect } from "react-redux";
import { DispatchType, RootState } from "../reducers";
import { search } from "../actions/search";
import { Subreddit, Submission } from "snoowrap";
import SubSearchResult from "../components/SubSearchResult";
import { PadOnNarrow } from "../components/Page";
import Loading from "../components/Loading";
import Post from "../components/Post";

type OwnProps = {
  query: string;
};

type StateProps = {
  isLoading: boolean;
  subreddits: Subreddit[];
  posts: Submission[];
};

type DispatchProps = {
  search: (query: string) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

class CurrentSearchResults extends Component<Props, {}> {
  componentDidMount() {
    this.performSearch();
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.query !== this.props.query) {
      this.performSearch();
    }
  }

  performSearch() {
    const { query, search } = this.props;
    search(query);
  }

  render() {
    const { subreddits, isLoading, posts } = this.props;

    if (isLoading) {
      return <Loading type="regular" />;
    }

    return (
      <div>
        <PadOnNarrow>
          <h2>Subreddits:</h2>
        </PadOnNarrow>
        {subreddits
          .slice(0, 3)
          .map(sub => (
            <SubSearchResult key={sub.display_name_prefixed} subreddit={sub} />
          ))}

        <PadOnNarrow>
          <h2>Posts:</h2>
        </PadOnNarrow>
        {posts
          .slice(0, 5)
          .map(post => (
            <Post key={post.id} post={post} voteOnPost={() => null} />
          ))}
      </div>
    );
  }
}

function mapStateToProps({ search }: RootState): StateProps {
  return {
    isLoading: search.isLoading,
    subreddits: search.subreddits,
    posts: search.posts,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    search: (query: string) => {
      dispatch(search(query));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentSearchResults);
