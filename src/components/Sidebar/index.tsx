import React from "react";
import Drawer, { Props as DrawerProps } from "../Drawer";
import SubscriptionList from "../../containers/SubscriptionList";
import Icon from "../Icon";
import FetchSubscriptionsBtn from "../../containers/FetchSubscriptionsBtn";
import { SectionTitle, SidebarLink } from "./styles";

function Sidebar(props: DrawerProps) {
  return (
    <Drawer {...props}>
      <SectionTitle>Reddit feeds</SectionTitle>
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

      <SectionTitle>
        Subscriptions
        <FetchSubscriptionsBtn />
      </SectionTitle>
      <SubscriptionList />
    </Drawer>
  );
}

export default Sidebar;
export { SidebarLink };
