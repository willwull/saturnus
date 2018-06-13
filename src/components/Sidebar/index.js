import React from "react";
import styled from "@marionebl/styled-components";
import { transparentize } from "polished";
import { NavLink } from "react-router-dom";
import Drawer from "components/Drawer";
import SubscriptionList from "containers/SubscriptionList";
import Icon from "../Icon";

export const SidebarLink = styled(NavLink)`
  display: block;
  padding: 15px;
  color: inherit;

  &:hover {
    background: ${props => props.theme.primary}
    color: white;
  }

  &.active {
    background: ${props => transparentize(0.85, props.theme.primary)};
    color: ${props => props.theme.primary};
    border-right: 5px solid ${props => props.theme.primary};

    &:hover {
      background: ${props => props.theme.primary}
      color: white;
    }
  }

  .icon {
    margin-right: 8px;
  }
`;

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
