import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "@marionebl/styled-components";
import "./Dropdown.scss";

const DropdownWrapper = styled.button`
  display: block;
  text-align: inherit;
  overflow: visible;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
`;

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
    document.addEventListener("touchstart", this.clickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickHandler);
    document.removeEventListener("touchstart", this.clickHandler);
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
        {/* The dropdown toggle */}
        <button onClick={this.toggle}>{this.props.children}</button>

        {/* The actual dropdown */}
        <DropdownWrapper className={overlayClasses} onClick={this.hide}>
          {this.props.overlay}
        </DropdownWrapper>
      </div>
    );
  }
}

export default Dropdown;
