import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AnchorTabProps } from "./Tab.types";
import { useRoutingTabs } from "../../context";

export const AnchorTab = ({
  children,
  disabled = false,
  isNav = false,
  label,
  link,
}: AnchorTabProps) => {
  const routingTabContext = useRoutingTabs();
  if (!routingTabContext) return null;
  const { useHashRouting } = routingTabContext;
  const parsedLink = useHashRouting ? "#" + link : link;

  return isNav ? (
    <NavLink
      aria-disabled={disabled}
      className="tab__link"
      to={disabled ? "" : parsedLink}
    >
      {children ?? label}
    </NavLink>
  ) : (
    <Link
      aria-disabled={disabled}
      className="tab__link"
      to={disabled ? "" : parsedLink}
    >
      {children ?? label}
    </Link>
  );
};
