import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./Drawer.scss";

class Drawer extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    onClose: () => {},
  };

  onUnderlayClick = () => {
    this.props.onClose();
  };

  render() {
    const { open, children } = this.props;
    return (
      <Fragment>
        <div className={`drawer-component ${open ? "open" : "closed"}`}>
          {children}
        </div>

        <div
          onClick={this.onUnderlayClick}
          role="presentation"
          className={`underlay ${open ? "open" : "closed"}`}
        />
      </Fragment>
    );
  }
}

export default Drawer;
