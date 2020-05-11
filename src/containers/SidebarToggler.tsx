import React, { Component, useCallback } from "react";
import { connect, useDispatch } from "react-redux";
import { openSidebar } from "../actions/sidebar";
import { DispatchType, RootState } from "../reducers";

type Props = {
  children?: React.ReactNode;
};

function SidebarToggler({ children }: Props) {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    dispatch(openSidebar());
  }, []);

  return <button onClick={onClick}>{children}</button>;
}

export default SidebarToggler;
