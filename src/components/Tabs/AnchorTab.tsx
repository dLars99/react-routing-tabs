import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AnchorTabProps } from "./Tab.types";
import { useRoutingTabs } from "../../context";
import { panelPrefix } from "../../utils";

export const AnchorTab = ({
  children,
  combinedRef,
  disabled = false,
  isNav = false,
  isSelected,
  name,
  link = ".",
  onClick,
  tabId,
}: AnchorTabProps) => {
  const rawId = tabId?.split("-")[1];
  const routingTabContext = useRoutingTabs();
  if (!routingTabContext) return null;
  const { useHashRouting } = routingTabContext;
  const parsedLink = useHashRouting ? "#" + link : link;

  return isNav ? (
    <NavLink
      aria-controls={panelPrefix + rawId}
      aria-disabled={disabled}
      aria-selected={isSelected}
      className="tab__link"
      onClick={onClick}
      ref={combinedRef}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      to={disabled ? "" : parsedLink}
    >
      {children ?? name}
    </NavLink>
  ) : (
    <Link
      aria-controls={panelPrefix + rawId}
      aria-disabled={disabled}
      aria-selected={isSelected}
      className="tab__link"
      onClick={onClick}
      ref={combinedRef}
      role="tab"
      tabIndex={isSelected ? 0 : -1}
      to={disabled ? "." : parsedLink}
    >
      {children ?? name}
    </Link>
  );
};
