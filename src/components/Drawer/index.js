import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
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

  closeDrawer = () => {
    this.props.onClose();
  };

  render() {
    const { open, children, className } = this.props;
    return (
      <Fragment>
        <div
          className={`${className} drawer-component ${
            open ? "open" : "closed"
          }`}
        >
          {children}
        </div>

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
