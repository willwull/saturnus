import React, { Component } from "react";
import styled from "styled-components";
import Dialog, { DialogProps } from "./Dialog";

// MARK: Event handler

class Events {
  listeners = new Map<string, ((...args: any[]) => void)[]>();

  on(eventName: string, callback: (...args: any[]) => void) {
    const callbacks = this.listeners.get(eventName) || [];
    callbacks.push(callback);
    this.listeners.set(eventName, callbacks);

    // Returns an unsubscribe function
    return () => {
      const callbacks = this.listeners.get(eventName)!;
      const idx = callbacks.indexOf(callback);
      callbacks.splice(idx, 1);
    };
  }

  emit(eventName: string, ...args: any[]) {
    const callbacks = this.listeners.get(eventName) || [];
    callbacks.forEach(callback => {
      callback(...args);
    });
  }
}

const events = new Events();

// MARK: Popovers

const Underlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
`;

type PopoverProps = DialogProps;

type State = {
  popoverOpen: boolean;
  popoverProps: PopoverProps | null;
};

class Popovers extends Component<{}, State> {
  state: State = {
    popoverOpen: false,
    popoverProps: null,
  };

  unsubscribe: (() => void) | null = null;

  componentDidMount() {
    this.unsubscribe = events.on("popover-open", (props: PopoverProps) => {
      this.openPopover(props);
    });

    window.addEventListener("keydown", this.keyListener);
  }

  componentDidUpdate(_: any, prevState: State) {
    const { popoverOpen } = this.state;
    if (popoverOpen !== prevState.popoverOpen) {
      // if popover is open, we disable scrolling on the main content
      if (popoverOpen) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe!();
    document.body.classList.remove("no-scroll");
    window.removeEventListener("keydown", this.keyListener);
  }

  keyListener = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      this.hidePopover();
    }
  };

  openPopover(popoverProps: PopoverProps) {
    this.setState({
      popoverOpen: true,
      popoverProps,
    });
  }

  hidePopover = () => {
    this.setState({
      popoverOpen: false,
    });
  };

  render() {
    const { popoverOpen, popoverProps } = this.state;

    if (!popoverOpen || !popoverProps) return null;

    return (
      <Underlay>
        <Dialog {...popoverProps} hideFunc={this.hidePopover} />
      </Underlay>
    );
  }
}

export default Popovers;

export function openDialog(props: DialogProps) {
  events.emit("popover-open", props);
}
