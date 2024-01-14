import React, {
  ForwardedRef,
  MouseEvent,
  forwardRef,
  useCallback,
  useId,
} from "react";
import "./styles/tab.css";
import { AnchorTab } from "./AnchorTab";
import { TabProps } from "./Tab.types";
import classNames from "classnames";
import { tabPrefix } from "../../utils";
import { useRoutingTabs } from "../../context";

/**
 * Component for an individual tab within the tab list
 * Renders as a `li` tag and accepts an optional ref from the user
 * Inside the `li` tag, an `a` will render to provide the routing for the tab
 */
export const Tab = forwardRef(
  (props: TabProps, outsideTabRef?: ForwardedRef<HTMLAnchorElement>) => {
    const tabContextError = "Tab must be wrapped in a RoutingTabs component";
    const routingTabContext = useRoutingTabs();
    if (!routingTabContext) {
      console.error(tabContextError);
      throw new Error(tabContextError);
    }

    const { changeTab, selectedTabId, tabRef } = routingTabContext;
    const combinedRef = useCallback((node: HTMLAnchorElement) => {
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
      if (isSelected || !props.disabled) {
        changeTab(tabId);
      }
    };

    const extendedProps = {
      combinedRef,
      id,
      tabId,
      isSelected,
      onClick,
    };

    return (
      <li
        className={classNames(
          "tab",
          { tab__active: isSelected },
          { tab__disabled: props.disabled },
          props.className ? { [props.className]: props.className } : ""
        )}
        role="presentation"
      >
        <AnchorTab {...props} {...extendedProps} />
      </li>
    );
  }
);
