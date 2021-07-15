import React from "react";
import Drawer, { Props as DrawerProps } from "../Drawer";
import SubscriptionList from "../../containers/SubscriptionList";
import { Home, TrendingUp, List } from "react-feather";
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
        <Home size={20} />
        Home
      </SidebarLink>
      <SidebarLink to="/r/popular/">
        <TrendingUp size={20} />
        Popular
      </SidebarLink>
      <SidebarLink to="/r/all/">
        <List size={20} />
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
