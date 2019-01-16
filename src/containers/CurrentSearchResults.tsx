import React, { Component } from "react";
import { connect } from "react-redux";
import { DispatchType, RootState } from "../reducers";
import { search } from "../actions/search";
import { Subreddit } from "snoowrap";
import { Link } from "react-router-dom";

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
    const { subreddits } = this.props;
    return (
      <div>
        <h2>Subreddits:</h2>
        {subreddits.map(sub => (
          <div key={sub.display_name}>
            <Link to={sub.url}>{sub.display_name_prefixed}</Link>
          </div>
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
