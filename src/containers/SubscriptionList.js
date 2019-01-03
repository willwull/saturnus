import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMySubs } from "../actions/user";
import SubredditList from "../components/SubredditList";
import Loading from "../components/Loading";

class SubscriptionList extends Component {
  static propTypes = {
    error: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    subscriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetch: PropTypes.func.isRequired,
  };

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

function mapStateToProps({ user: { subscriptions, subsLoading, subsError } }) {
  return {
    isLoading: subsLoading,
    subscriptions,
    error: subsError || "",
  };
}

function mapDispatchToProps(dispatch) {
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
