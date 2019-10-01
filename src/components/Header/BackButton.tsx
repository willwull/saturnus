import React, { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Icon from "../Icon";
import { SubPageParams } from "../../pages/SubredditPage";

type Props = RouteComponentProps<SubPageParams>;

class BackButton extends Component<Props, {}> {
  onClick = () => {
    this.props.history.goBack();
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
