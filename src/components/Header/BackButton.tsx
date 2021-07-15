import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ArrowLeft } from "react-feather";
import { SubPageParams } from "../../pages/SubredditPage";

type Props = RouteComponentProps<SubPageParams>;

class BackButton extends Component<Props, {}> {
  onClick = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <button onClick={this.onClick}>
        <ArrowLeft />
      </button>
    );
  }
}

export default withRouter(BackButton);
