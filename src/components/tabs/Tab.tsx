import React, { ForwardedRef, Ref, forwardRef, useId, useMemo } from "react";
import { useRoutingTabs } from "../../context";
import "./styles/tab.css";
import { AnchorTab } from "./AnchorTab";
import { ButtonTab } from "./ButtonTab";
import { TabProps } from "./Tab.types";
import classNames from "classnames";
import { panelPrefix, tabPrefix } from "../../utils";

/**
 * Component for an individual tab within the tab list
 */
export const Tab = forwardRef(
  (props: TabProps, outsideTabRef?: ForwardedRef<HTMLLIElement>) => {
    const routingTabContext = useRoutingTabs();
    if (!routingTabContext)
      throw new Error("Tab must be wrapped in a RoutingTabs component");

    const { changeTab, childTabs, selectedTabId, tabRef } = routingTabContext;
    const combinedRef = (node: HTMLLIElement) => {
      tabRef(node);
      if (typeof outsideTabRef === "function") {
        outsideTabRef(node);
      } else if (outsideTabRef) {
        outsideTabRef.current = node;
      }
    };
    const id = useId();
    const tabId = tabPrefix + id;
    const isSelected = tabId === selectedTabId;
    const isAnchor = "link" in props && typeof props.link === "string";

    const onClick = () => {
      changeTab(tabId);
    };

    return (
      <li
        aria-controls={panelPrefix + id}
        aria-selected={isSelected}
        className={classNames(
          "tab",
          { active: isSelected },
          props.className ? { [props.className]: props.className } : ""
        )}
        id={tabId}
        onClick={onClick}
        ref={combinedRef}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
      >
        {isAnchor ? <AnchorTab {...props} /> : <ButtonTab {...props} />}
      </li>
    );
  }
);
