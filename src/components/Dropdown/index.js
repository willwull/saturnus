import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Dropdown.scss";

class Dropdown extends Component {
  static propTypes = {
    // what should show up when drop down is active
    overlay: PropTypes.node.isRequired,
    placement: PropTypes.oneOf(["bottomLeft", "bottomRight"]),
    children: PropTypes.node.isRequired,
  };

  static defaultProps = {
    placement: "bottomLeft",
  };

  state = {
    active: false,
  };

  dropdownRef = React.createRef();

  componentDidMount() {
    // touch for mobile devices
    document.addEventListener("click", this.clickHandler);
    document.addEventListener("touch", this.clickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickHandler);
    document.removeEventListener("touch", this.clickHandler);
  }

  clickHandler = event => {
    // if clicked on the trigger or overlay, don't hide overlay
    if (this.dropdownRef.current.contains(event.target)) {
      return;
    }

    // if clicked outside, hide the overlay
    this.hide();
  };

  toggle = () => {
    this.setState(state => ({
      active: !state.active,
    }));
  };

  hide = () => {
    this.setState({ active: false });
  };

  render() {
    let overlayClasses = `dropdown-overlay ${this.props.placement}`;
    if (this.state.active) overlayClasses += " active";

    return (
      <div className="dropdown-wrapper" ref={this.dropdownRef}>
        <button onClick={this.toggle}>{this.props.children}</button>
        <div className={overlayClasses}>{this.props.overlay}</div>
      </div>
    );
  }
}

export default Dropdown;
