import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSubreddit } from "../actions/subreddits";
import Banner from "../components/Banner";
import { Subreddit } from "snoowrap";
import { RootState, DispatchType } from "../reducers";

type StateProps = {
  data: Subreddit | null;
  isLoading: boolean;
  error: boolean;
};

type DispatchProps = {
  getSub: (subredditName: string) => void;
};

type OwnProps = {
  subreddit: string;
};

type Props = StateProps & DispatchProps & OwnProps;

class SubredditBanner extends Component<Props, {}> {
  componentDidMount() {
    const { getSub, subreddit } = this.props;
    getSub(subreddit);
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.subreddit !== prevProps.subreddit) {
      console.log("fetch new subreddit");
      this.props.getSub(this.props.subreddit);
    }
  }

  render() {
    const { isLoading, data } = this.props;

    return <Banner subreddit={data} isLoading={isLoading} />;
  }
}

function mapStateToProps(
  { subreddits }: RootState,
  ownProps: OwnProps,
): StateProps {
  const currentSub = subreddits[ownProps.subreddit] || {
    data: null,
    isLoading: false,
    error: false,
  };

  return {
    ...currentSub,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    getSub: (subredditName: string) => {
      dispatch(fetchSubreddit(subredditName));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubredditBanner);
