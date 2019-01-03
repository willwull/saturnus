import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchSubreddit } from "../actions/subreddits";
import Banner from "../components/Banner";

class SubredditBanner extends Component {
  static propTypes = {
    subreddit: PropTypes.string.isRequired, // not from redux
    getSub: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { getSub, subreddit } = this.props;
    getSub(subreddit);
  }

  componentDidUpdate(prevProps) {
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

function mapStateToProps({ subreddits }, ownProps) {
  const currentSub = subreddits[ownProps.subreddit] || {
    data: {},
    isLoading: false,
    error: false,
  };

  return {
    ...currentSub,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSub: subreddit => {
      dispatch(fetchSubreddit(subreddit));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubredditBanner);
