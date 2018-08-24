import React, { Component, Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

// Inspired by https://reacttraining.com/react-router/web/example/modal-gallery
class ModalSwitch extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired, // from withRouter
    history: PropTypes.object.isRequired, // from withRouter
    children: PropTypes.node.isRequired,
    modalPath: PropTypes.string.isRequired,
    modal: PropTypes.func.isRequired,
  };
  // We can pass a location to <Switch/> that will tell it to
  // ignore the router's current location and use the location
  // prop instead.
  //
  // We can also use "location state" to tell the app the user
  // wants to go to `/img/2` in a modal, rather than as the
  // main page, keeping the gallery visible behind it.
  //
  // Normally, `/img/2` wouldn't match the gallery at `/`.
  // So, to get both screens to render, we can save the old
  // location and pass it to Switch, so it will think the location
  // is still `/` even though its `/img/2`.
  previousLocation = this.props.location;

  componentDidUpdate(prevProps) {
    const { location, history } = this.props;
    // set previousLocation if props.location is not modal
    if (
      history.action !== "POP" &&
      (!location.state || !location.state.modal)
    ) {
      this.previousLocation = prevProps.location;
      console.log("Set previous location: ", this.previousLocation);
    }

    if (location.state && !!location.state.modal) {
      // if modal is open, we disable scrolling on the main content
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }

  render() {
    const { location, children, modal, modalPath } = this.props;
    const isModal = !!(
      location.state &&
      location.state.modal &&
      this.previousLocation !== location
    ); // not initial render

    console.log("Is modal: ", isModal);

    return (
      <Fragment>
        <Switch location={isModal ? this.previousLocation : location}>
          {children}
        </Switch>
        {isModal ? <Route path={modalPath} component={modal} /> : null}
      </Fragment>
    );
  }
}

export default withRouter(ModalSwitch);
