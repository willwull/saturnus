import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ContentBox from "components/ContentBox";
import "./Drawer.scss";

class Drawer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: "",
    onClose: () => {},
  };

  componentDidUpdate(prevProps) {
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
    this.props.onClose();
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
