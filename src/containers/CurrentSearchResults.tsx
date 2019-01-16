import React, { Component } from "react";
import { connect } from "react-redux";
import { DispatchType, RootState } from "../reducers";
import { search } from "../actions/search";
import { Subreddit } from "snoowrap";
import SubSearchResult from "../components/SubSearchResult";
import { PadOnNarrow } from "../components/Page";
import Loading from "../components/Loading";

type OwnProps = {
  query: string;
};

type StateProps = {
  isLoading: boolean;
  subreddits: Subreddit[];
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
    const { subreddits, isLoading } = this.props;

    if (isLoading) {
      return <Loading type="regular" />;
    }

    return (
      <div>
        <PadOnNarrow>
          <h2>Subreddits:</h2>
        </PadOnNarrow>
        {subreddits.map(sub => (
          <SubSearchResult key={sub.display_name_prefixed} subreddit={sub} />
        ))}
      </div>
    );
  }
}

function mapStateToProps({ search }: RootState): StateProps {
  return {
    isLoading: search.isLoading,
    subreddits: search.subreddits,
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
