import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchSubreddit,
  subscribeToSub,
  favoriteSubreddit,
} from "../actions/subreddits";
import Banner from "../components/Banner";
import { Subreddit } from "snoowrap";
import { RootState, DispatchType } from "../reducers";

type StateProps = {
  data: Subreddit | null;
  isLoadingSubscription: boolean;
  isLoading: boolean;
  error: boolean;
  isLoggedIn: boolean;
};

type DispatchProps = {
  getSub: (subredditName: string) => void;
  subscribe: (subreddit: Subreddit, action: "sub" | "unsub") => void;
  favorite: (subredditName: string, makeFavorite: boolean) => void;
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
    const {
      data,
      isLoading,
      isLoadingSubscription,
      error,
      subscribe,
      isLoggedIn,
      favorite,
    } = this.props;
    return (
      <Banner
        data={data}
        isLoading={isLoading}
        isLoadingSubscription={isLoadingSubscription}
        error={error}
        subscribe={subscribe}
        isLoggedIn={isLoggedIn}
        favorite={favorite}
      />
    );
  }
}

function mapStateToProps(
  { subreddits, user }: RootState,
  ownProps: OwnProps,
): StateProps {
  const currentSub = subreddits[ownProps.subreddit] || {
    data: null,
    isLoading: false,
    isLoadingSubscription: false,
    error: false,
  };

  return {
    ...currentSub,
    isLoggedIn: user.loggedIn,
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    getSub: subredditName => {
      dispatch(fetchSubreddit(subredditName));
    },
    subscribe: (subreddit, action) => {
      dispatch(subscribeToSub(subreddit, action));
    },
    favorite: (subredditName, makeFavorite) => {
      dispatch(favoriteSubreddit(subredditName, makeFavorite));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubredditBanner);
