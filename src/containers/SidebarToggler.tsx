import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { openSidebar } from "../actions/sidebar";

type Props = {
  children?: React.ReactNode;
};

function SidebarToggler({ children }: Props) {
  const dispatch = useDispatch();
  const onClick = useCallback(
    () => {
      dispatch(openSidebar());
    },
    [dispatch],
  );

  return <button onClick={onClick}>{children}</button>;
}

export default SidebarToggler;
