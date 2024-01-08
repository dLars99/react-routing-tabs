import React, { ForwardedRef, Ref, forwardRef, useId, useMemo } from "react";
import { useRoutingTabs } from "../../context";
import "./styles/tab.css";
import { AnchorTab } from "./AnchorTab";
import { ButtonTab } from "./ButtonTab";
import { TabProps } from "./Tab.types";

const tabPrefix = "rrtTab-";
/**
 * Component for an individual tab within the tab list
 */
export const Tab = forwardRef(
  (props: TabProps, outsideTabRef?: ForwardedRef<HTMLLIElement>) => {
    const routingTabContext = useRoutingTabs();
    if (!routingTabContext)
      throw new Error("Tab must be wrapped in a RoutingTabs component");

    const { changeTab, childTabs, selectedTabIndex, tabRef } =
      routingTabContext;
    const combinedRef = (node: HTMLLIElement) => {
      tabRef(node);
      if (typeof outsideTabRef === "function") {
        outsideTabRef(node);
      } else if (outsideTabRef) {
        outsideTabRef.current = node;
      }
    };

    const id = tabPrefix + useId();
    const isSelected = useMemo(() => {
      const thisTabIndex = childTabs.current.findIndex(
        (childId: HTMLLIElement) => childId?.id === id
      );
      return thisTabIndex === selectedTabIndex;
    }, [childTabs, selectedTabIndex]);
    const isAnchor = "link" in props && typeof props.link === "string";

    const onClick = () => {
      changeTab(id);
    };

    return (
      <li
        aria-controls={`rrtPanel-${id}`}
        aria-selected={isSelected}
        className="tab"
        id={id}
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
