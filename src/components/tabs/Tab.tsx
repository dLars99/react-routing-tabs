import React, {
  ForwardedRef,
  MouseEvent,
  forwardRef,
  useCallback,
  useId,
} from "react";
import "./styles/tab.css";
import { AnchorTab } from "./AnchorTab";
import { ButtonTab } from "./ButtonTab";
import { TabProps } from "./Tab.types";
import classNames from "classnames";
import { panelPrefix, tabPrefix } from "../../utils";
import { useRoutingTabs } from "../../context";

/**
 * Component for an individual tab within the tab list
 * Renders as a `li` tag and accepts an optional ref from the user
 * Inside the `li` tag, an `a` or a `button` will render, depending on whether or not a link
 * prop is provided
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
    // This looks redundant, but satisifes a possible undefined link coming through
    // in some dynamic scenarios
    const isAnchor = "link" in props && typeof props.link === "string";

    const onClick = (e: MouseEvent) => {
      if (!props.disabled) {
        e.preventDefault();
        changeTab(tabId);
      }
    };

    return (
      <li
        aria-controls={panelPrefix + id}
        aria-selected={isSelected}
        className={classNames(
          "tab",
          { tab__active: isSelected },
          { tab__disabled: props.disabled },
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
