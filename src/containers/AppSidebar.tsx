import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { closeSidebar } from "../actions/sidebar";
import Sidebar from "../components/Sidebar";
import { RootState } from "../reducers";
import { usePrevious } from "../utils";

function AppSidebar() {
  // Not sure why I need to cast it to a boolean...
  const isOpen = useSelector<RootState>(state => state.sidebar.open) as boolean;
  const hasOpenedOnce = useSelector<RootState>(
    state => state.sidebar.hasOpenedOnce,
  ) as boolean;

  const dispatch = useDispatch();
  const location = useLocation();
  const prevLocation = usePrevious(location);

  useEffect(
    () => {
      // Auto close the sidebar if the location changes.
      // Checks prevLocation first to avoid an unnecessary dispatch on mount
      if (prevLocation && location !== prevLocation) {
        dispatch(closeSidebar());
      }
    },
    [dispatch, prevLocation, location],
  );

  const close = useCallback(
    () => {
      dispatch(closeSidebar());
    },
    [dispatch],
  );

  return (
    <Sidebar hasOpenedOnce={hasOpenedOnce} open={isOpen} onClose={close} />
  );
}

export default AppSidebar;
