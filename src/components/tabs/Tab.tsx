import React, { ReactNode } from "react";
import { useRoutingTabs } from "../../context";
import { Link, NavLink } from "react-router-dom";
import "./styles/tab.css";

interface TabProps {
  /**
   * Use children for custom content
   */
  children?: ReactNode;
  /**
   * Is this part of a true nav component?
   */
  isNav?: boolean;
  /**
   * Display text for the tab
   */
  label: string;
  /**
   * Destination link for the tab
   */
  link?: string;
}

/**
 * Component for an individual tab within the tab list
 */
export const Tab = ({
  children,
  isNav = false,
  label = "Tab",
  link = "./",
}: TabProps) => {
  const routingTabContext = useRoutingTabs();
  if (!routingTabContext)
    throw new Error("Tab must be wrapped in a RoutingTabs component");
  return isNav ? (
    <NavLink className="tab" role="tab" to={link}>
      {children ?? label}
    </NavLink>
  ) : (
    <Link className="tab" role="tab" to={link}>
      {children ?? label}
    </Link>
  );
};
