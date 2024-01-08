import React, { useId } from "react";
import { useRoutingTabs } from "../../context";
import "./styles/tab.css";
import { AnchorTab } from "./AnchorTab";
import { ButtonTab } from "./ButtonTab";
import { TabProps } from "./Tab.types";

/**
 * Component for an individual tab within the tab list
 */
export const Tab = (props: TabProps) => {
  const routingTabContext = useRoutingTabs();
  if (!routingTabContext)
    throw new Error("Tab must be wrapped in a RoutingTabs component");

  const { changeTab, tabRef } = routingTabContext;
  const id = useId();
  const isAnchor = "link" in props && typeof props.link === "string";
  const onClick = () => {
    changeTab(id);
  };

  return (
    <li onClick={onClick} ref={tabRef} className="tab" id={id} role="tab">
      {isAnchor ? <AnchorTab {...props} /> : <ButtonTab {...props} />}
    </li>
  );
};
