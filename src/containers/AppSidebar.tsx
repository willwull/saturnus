import React, { Component } from "react";
import { connect } from "react-redux";
import { closeSidebar } from "../actions/sidebar";
import Sidebar from "../components/Sidebar";
import { RootState } from "../reducers";
import { Dispatch } from "redux";

type StateProps = {
  open: boolean;
};

type DispatchProps = {
  onClose: () => void;
};

type Props = StateProps & DispatchProps;

class AppSidebar extends Component<Props, {}> {
  render() {
    return <Sidebar {...this.props} />;
  }
}

function mapStateToProps({ sidebar }: RootState): StateProps {
  return {
    open: sidebar.open,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onClose: () => {
      dispatch(closeSidebar());
    },
  };
}

export default connect<StateProps, DispatchProps, {}, RootState>(
  mapStateToProps,
  mapDispatchToProps,
)(AppSidebar);
