import React from "react";
import Drawer, { Props as DrawerProps } from "../Drawer";
import SubscriptionList from "../../containers/SubscriptionList";
import Icon from "../Icon";
import FetchSubscriptionsBtn from "../../containers/FetchSubscriptionsBtn";
import { SectionTitle, SidebarLink } from "./styles";

type Props = {
  hasOpenedOnce: boolean;
} & DrawerProps;

function Sidebar(props: Props) {
  // We wait to render the subscription list because it can be slow to
  // render such a long list. We still render the sidebar as a whole
  // since the sliding in transition seems to be smoother if it's mounted.
  return (
    <Drawer {...props}>
      <SectionTitle>Reddit feeds</SectionTitle>
      <SidebarLink exact to="/">
        <Icon icon="far home" />
        Home
      </SidebarLink>
      <SidebarLink to="/r/popular/">
        <Icon icon="far chart-line" />
        Popular
      </SidebarLink>
      <SidebarLink to="/r/all/">
        <Icon icon="far infinity" />
        All
      </SidebarLink>

      <SectionTitle sticky>
        Subscriptions
        <FetchSubscriptionsBtn />
      </SectionTitle>
      {props.hasOpenedOnce && <SubscriptionList />}
    </Drawer>
  );
}

export default Sidebar;
export { SidebarLink };
