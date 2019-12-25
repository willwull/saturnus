import React, { Component } from "react";
import styled from "styled-components";
import Dialog from "./Dialog";

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

type State = {
  popoverOpen: boolean;
};

class Popovers extends Component<{}, State> {
  state: State = {
    popoverOpen: false,
  };

  unsubscribe: (() => void) | null = null;

  componentDidMount() {
    this.unsubscribe = events.on("popover-open", (contents: string) => {
      this.openPopover(contents);
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  openPopover(contents: string) {
    this.setState({
      popoverOpen: true,
    });
  }

  hidePopover = () => {
    this.setState({
      popoverOpen: false,
    });
  };

  render() {
    const { popoverOpen } = this.state;
    if (!popoverOpen) return null;

    return (
      <Underlay role="presentation" onClick={this.hidePopover}>
        <Dialog
          title="Are you sure?"
          primaryLabel="Confirm"
          onCancel={this.hidePopover}
          onPrimary={this.hidePopover}
        >
          Hello this is a long text. Hello this is a long text. Hello this is a
          long
        </Dialog>
      </Underlay>
    );
  }
}

export default Popovers;

export function openDialog(contents: string) {
  events.emit("popover-open", contents);
}
