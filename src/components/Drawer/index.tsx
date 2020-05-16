import React, { Component, Fragment } from "react";
import ContentBox from "../ContentBox";
import "./Drawer.scss";

export type Props = {
  open: boolean;
  onClose?: Function;
  className?: string;
  children?: React.ReactNode;
};

class Drawer extends Component<Props, {}> {
  static defaultProps = {
    className: "",
    onClose: () => null,
  };

  componentDidUpdate(prevProps: Props) {
    const { open } = this.props;
    if (open !== prevProps.open) {
      // if drawer is open, we disable scrolling on the main content
      if (open) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }
  }

  closeDrawer = () => {
    this.props.onClose!();
  };

  render() {
    const { open, children, className } = this.props;
    return (
      <Fragment>
        <ContentBox
          className={`${className} drawer-component ${
            open ? "open" : "closed"
          }`}
        >
          {children}
        </ContentBox>

        <div
          onClick={this.closeDrawer}
          role="presentation"
          className={`underlay ${open ? "open" : "closed"}`}
        />
      </Fragment>
    );
  }
}

export default Drawer;
