import { Component } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

/**
 * This component makes the browser scroll to the top of the page when the route changes
 * Taken from https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
class ScrollToTop extends Component<RouteComponentProps, {}> {
  componentDidUpdate(prevProps: RouteComponentProps) {
    const { location, history } = this.props;
    if (location !== prevProps.location) {
      // action is POP when the user goes back in their browser
      if (history.action !== "POP") {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
