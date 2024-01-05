import React from "react";
import { ButtonTabProps } from "./Tab.types";
import { useRoutingTabs } from "../../context";

export const ButtonTab = ({ children, label, tabIndex }: ButtonTabProps) => {
  const routingTabContext = useRoutingTabs();
  const changeTab = routingTabContext?.changeTab;

  const onClick = () => changeTab && changeTab(tabIndex);
  return (
    <button className="tab__button" onClick={onClick} type="button">
      {children ?? label}
    </button>
  );
};
