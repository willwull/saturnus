import React from "react";
import { NavLink } from "react-router-dom";
import Drawer from "components/Drawer";
import SubscriptionList from "containers/SubscriptionList";
import Icon from "../Icon";
import "./Sidebar.scss";

export const SidebarLink = props => (
  <NavLink {...props} className="sidebar-link" />
);

function Sidebar(props) {
  return (
    <Drawer {...props} className="sidebar">
      <SidebarLink exact to="/">
        <Icon icon="far home" fixedWidth />
        Home
      </SidebarLink>
      <SidebarLink to="/r/popular/">
        <Icon icon="far chart-line" fixedWidth />
        Popular
      </SidebarLink>
      <SidebarLink to="/r/all/">
        <Icon icon="far infinity" fixedWidth />
        All
      </SidebarLink>

      <SubscriptionList />
    </Drawer>
  );
}

export default Sidebar;
