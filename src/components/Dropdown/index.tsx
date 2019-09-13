import React, { Component } from "react";
import { DropdownWrapper } from "./styles";
import "./Dropdown.scss";

type Props = {
  // what should show up when drop down is active
  overlay: React.ReactNode;
  placement: "bottomLeft" | "bottomRight";
  children: React.ReactNode;
};

type State = {
  active: boolean;
};

class Dropdown extends Component<Props, State> {
  static defaultProps = {
    placement: "bottomLeft",
  };

  state: State = {
    active: false,
  };

  dropdownRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    // touch for mobile devices
    document.addEventListener("click", this.clickHandler);
    document.addEventListener("touchstart", this.clickHandler);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.clickHandler);
    document.removeEventListener("touchstart", this.clickHandler);
  }

  clickHandler = (event: React.MouseEvent<HTMLButtonElement> | Event) => {
    // if clicked on the trigger or overlay, don't hide overlay
    if (
      this.dropdownRef.current &&
      this.dropdownRef.current.contains(event.target as Node)
    ) {
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
