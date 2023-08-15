import React from "react";
import { useRoutingTabs } from "../../context";

interface TabProps {
  /**
   * Is this part of a true nav component?
   */
  isNav?: boolean;
}

/**
 * Component for an individual tab within the tab list
 */
export const Tab = ({ isNav = false }: TabProps) => {
  const routingTabContext = useRoutingTabs();
  if (!routingTabContext)
    throw new Error("Tab must be wrapped in a RoutingTabs component");
  return <h1>{`Selected Tab Index: ${routingTabContext.selectedTabIndex}`}</h1>;
};
