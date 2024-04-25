import React, {
  ComponentProps,
  ForwardedRef,
  PropsWithChildren,
  forwardRef,
} from "react";
import { useRoutingTabs } from "../../context";
import { useLocation } from "react-router-dom";
import { panelPrefix, tabPrefix } from "../../utils";
import { useContextError } from "../../utils/useContextError";

export interface TabpanelProps extends ComponentProps<"div"> {}

const componentName = "Tabpanel";

/**
 * Wrapper element for any tabpanel content to provide accessibility features.
 */
export const Tabpanel = forwardRef(
  (
    { children, ...props }: PropsWithChildren<TabpanelProps>,
    outsideTabPanelRef?: ForwardedRef<HTMLDivElement>
  ) => {
    const routingTabContext = useRoutingTabs();
    useContextError(componentName, routingTabContext);

    const location = useLocation();
    const rrtId = location?.state?.rrtId;
    if (!rrtId) {
      // Don't crash, but make this known
      console.warn(
        "Unable to get panel id from router state. This may affect the accessibility of this page. To fix this, make sure your Tabs and Tabpanel are inside a react-router-dom Router component."
      );
    }

    return (
      <div
        aria-labelledby={tabPrefix + rrtId}
        id={panelPrefix + rrtId}
        ref={outsideTabPanelRef}
        role="tabpanel"
        tabIndex={0}
        {...props}
      >
        {children}
      </div>
    );
  }
);
