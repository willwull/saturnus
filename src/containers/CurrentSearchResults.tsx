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

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

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
  subreddits: Subreddit[];
  posts: Submission[];
};

type DispatchProps = {
  search: (query: string, subreddit: string) => void;
};

type Props = OwnProps & StateProps & DispatchProps;

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
    const { subreddits, isLoading, posts, query, type } = this.props;

    if (isLoading) {
      return <Loading type="regular" />;
    }

    const showSubResults = type !== "link";
    const showPostResults = type !== "sr";

    let subResults;
    if (type === "sr") {
      subResults = subreddits;
    } else {
      subResults = subreddits.slice(0, 3);
    }

    let postResults;
    if (type === "link") {
      postResults = posts;
    } else {
      postResults = posts.slice(0, 5);
    }

    return (
      <div>
        {showSubResults && (
          <Fragment>
            <PadOnNarrow>
              <h2>Subreddits:</h2>
            </PadOnNarrow>

            {subResults.map(sub => (
              <SubSearchResult
                key={sub.display_name_prefixed}
                subreddit={sub}
              />
            ))}

            {showPostResults && (
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

            {postResults.map(post => (
              <Post key={post.id} post={post} voteOnPost={() => null} />
            ))}

            {showSubResults && (
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

function mapStateToProps({ search }: RootState): StateProps {
  return {
    isLoading: search.isLoading,
    subreddits: search.subreddits,
    posts: search.posts,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    search: (query: string, subreddit: string) => {
      dispatch(search(query, subreddit));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrentSearchResults);
