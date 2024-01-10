import React, {
  ForwardedRef,
  MouseEvent,
  forwardRef,
  useCallback,
  useId,
} from "react";
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
    const tabContextError = "Tab must be wrapped in a RoutingTabs component";
    const routingTabContext = useRoutingTabs();
    if (!routingTabContext) {
      console.error(tabContextError);
      throw new Error(tabContextError);
    }

    const { changeTab, selectedTabId, tabRef } = routingTabContext;
    const combinedRef = useCallback((node: HTMLLIElement) => {
      tabRef(node);
      if (typeof outsideTabRef === "function") {
        outsideTabRef(node);
      } else if (outsideTabRef) {
        outsideTabRef.current = node;
      }
    }, []);

    const id = useId().replace(/:/g, "");
    const tabId = tabPrefix + id;
    const isSelected = tabId === selectedTabId;

    const onClick = (e: MouseEvent) => {
      e.preventDefault();
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
        {"link" in props ? <AnchorTab {...props} /> : <ButtonTab {...props} />}
      </li>
    );
  }
);
