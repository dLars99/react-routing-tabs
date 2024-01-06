import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AnchorTabProps } from "./Tab.types";

export const AnchorTab = ({ children, isNav, label, link }: AnchorTabProps) =>
  isNav ? (
    <NavLink className="tab__link" to={link}>
      {children ?? label}
    </NavLink>
  ) : (
    <Link className="tab__link" to={link}>
      {children ?? label}
    </Link>
  );
