import React from "react";
import { NavLink } from "react-router-dom";
import Drawer from "components/Drawer";
import "./Sidebar.scss";
import Icon from "../Icon";

const SidebarLink = props => <NavLink {...props} className="sidebar-link" />;

function Sidebar(props) {
  return (
    <Drawer {...props} className="sidebar">
      <SidebarLink exact to="/">
        <Icon icon="far home" fixedWidth />
        Home
      </SidebarLink>
      <SidebarLink to="/r/popular">
        <Icon icon="far chart-line" fixedWidth />
        Popular
      </SidebarLink>
      <SidebarLink to="/r/all">
        <Icon icon="far infinity" fixedWidth />
        All
      </SidebarLink>
    </Drawer>
  );
}

export default Sidebar;
