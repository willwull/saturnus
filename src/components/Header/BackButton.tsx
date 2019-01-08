import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Icon from "../Icon";
import { SubPageParams } from "../../pages/SubredditPage";

type Props = RouteComponentProps<SubPageParams>;

class BackButton extends Component<Props, {}> {
  onClick = () => {
    const { history, location, match } = this.props;

    if (location.state && location.state.modal) {
      history.goBack();
    } else {
      history.push(`/r/${match.params.subreddit}/`);
    }
  };

  render() {
    return (
      <button onClick={this.onClick}>
        <Icon icon="arrow-left" />
      </button>
    );
  }
}

export default withRouter(BackButton);
