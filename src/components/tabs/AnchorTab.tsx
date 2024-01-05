import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AnchorTabProps } from "./Tab.types";
import { useRoutingTabs } from "../../context";

export const AnchorTab = ({
  children,
  isNav,
  label,
  link,
  tabIndex,
}: AnchorTabProps) => {
  const routingTabContext = useRoutingTabs();
  const changeTab = routingTabContext?.changeTab;

  const onClick = () => changeTab && changeTab(tabIndex);

  return isNav ? (
    <NavLink className="tab__link" onClick={onClick} to={link}>
      {children ?? label}
    </NavLink>
  ) : (
    <Link className="tab__link" onClick={onClick} to={link}>
      {children ?? label}
    </Link>
  );
};
