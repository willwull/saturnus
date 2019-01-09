import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMySubs } from "../actions/user";
import SubredditList, { SimpleSubreddit } from "../components/SubredditList";
import Loading from "../components/Loading";
import { RootState, DispatchType } from "../reducers";

type StateProps = {
  isLoading: boolean;
  subscriptions: SimpleSubreddit[];
  error: string;
};

type DispatchProps = {
  fetch: () => void;
};

type Props = StateProps & DispatchProps & RouteComponentProps;

class SubscriptionList extends Component<Props, {}> {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    if (this.props.isLoading) {
      return <Loading type="regular" />;
    }

    if (this.props.error) {
      return this.props.error;
    }

    return <SubredditList subreddits={this.props.subscriptions} />;
  }
}

function mapStateToProps({
  user: { subscriptions, subsLoading, subsError },
}: RootState): StateProps {
  return {
    isLoading: subsLoading,
    subscriptions,
    error: subsError || "",
  };
}

function mapDispatchToProps(dispatch: DispatchType): DispatchProps {
  return {
    fetch: () => {
      dispatch(fetchMySubs());
    },
  };
}

// withRouter is necessary in order for this component to
// update when the route changes, so the active links get
// the active class
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SubscriptionList),
);
