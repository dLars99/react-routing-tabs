import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AnchorTabProps } from "./Tab.types";
import { useRoutingTabs } from "../../context";
import { panelPrefix } from "../../utils";

export const AnchorTab = ({
  children,
  combinedRef,
  disabled = false,
  id,
  isNav = false,
  isSelected,
  label,
  link = "/.",
  onClick,
  tabId,
}: AnchorTabProps) => {
  const routingTabContext = useRoutingTabs();
  if (!routingTabContext) return null;
  const { useHashRouting } = routingTabContext;
  const parsedLink = useHashRouting ? "#" + link : link;

  return isNav ? (
    <NavLink
      aria-controls={panelPrefix + id}
      aria-disabled={disabled}
      aria-selected={isSelected}
      className="tab__link"
      id={tabId}
      onClick={onClick}
      ref={combinedRef}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      to={disabled ? "" : parsedLink}
    >
      {children ?? label}
    </NavLink>
  ) : (
    <Link
      aria-controls={panelPrefix + id}
      aria-disabled={disabled}
      aria-selected={isSelected}
      className="tab__link"
      id={tabId}
      onClick={onClick}
      ref={combinedRef}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      to={disabled ? "/." : parsedLink}
    >
      {children ?? label}
    </Link>
  );
};
