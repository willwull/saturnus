import React, { ErrorInfo } from "react";

type Props = {
  children: React.ReactNode;
  fallbackRender: (
    props: { error?: Error },
  ) => React.ReactElement<any, any> | null;
};

type State = {
  error: Error | null;
};

/**
 * Wrap this component around a component whose render might throw an error.
 * Note that in dev mode, CRA will always show an overlay for runtime errors,
 * even if the error in question is caught by this component.
 */
class ErrorBoundary extends React.Component<Props, State> {
  state = {
    error: null,
  };

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;

    if (error !== null) {
      return fallbackRender({ error: (error as unknown) as Error });
    }

    return children;
  }
}

export default ErrorBoundary;
