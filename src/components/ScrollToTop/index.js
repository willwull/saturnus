import { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * This component makes the browser scroll to the top of the page when the route changes
 * Taken from https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
class ScrollToTop extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { location, history } = this.props;
    if (location !== prevProps.location) {
      // action is POP when the user goes back in their browser
      // if opening a modal, don't need to reset scrolling
      if (
        history.action !== "POP" &&
        (!location.state || !location.state.modal)
      ) {
        window.scrollTo(0, 0);
      }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
