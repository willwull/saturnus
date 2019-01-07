import React, { Component, Fragment } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";

type Props = {
  children: React.ReactNode;
  modalPath: string;
  modal: any; // not sure why React.ReactNode doesn't work
} & RouteComponentProps;

// Inspired by https://reacttraining.com/react-router/web/example/modal-gallery
class ModalSwitch extends Component<Props, {}> {
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

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.location !== this.props.location;
  }

  componentDidUpdate(prevProps: Props) {
    const { location, history } = this.props;

    if (
      history.action !== "POP" &&
      location !== prevProps.location &&
      !location.pathname.includes("/comments/")
    ) {
      this.previousLocation = location;
    }

    if (location.state && location.state.modal) {
      // if modal is open, we disable scrolling on the main content
      console.log("adding no-scroll");
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

    console.log("Is modal:", isModal);

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
