import React, {
  Children,
  ComponentProps,
  ForwardedRef,
  PropsWithChildren,
  ReactNode,
  forwardRef,
  isValidElement,
  useMemo,
} from "react";
import { useRoutingTabs } from "../../context";
import { useLocation } from "react-router-dom";
import { panelPrefix, tabPrefix } from "../../utils";
import { useRouterError } from "../../utils/useRouterError";
import { useContextError } from "../../utils/useContextError";

export interface TabpanelProps extends ComponentProps<"div"> {}

type ChildArray = Array<Exclude<ReactNode, boolean | null | undefined>>;

const componentName = "Tabpanel";

export const Tabpanel = forwardRef(
  (
    { children, ...props }: PropsWithChildren<TabpanelProps>,
    outsideTabPanelRef?: ForwardedRef<HTMLDivElement>
  ) => {
    const routingTabContext = useRoutingTabs();
    useContextError(componentName, routingTabContext);
    useRouterError(componentName);

    const location = useLocation();

    const rrtId = location?.state?.rrtId;

    if (!rrtId) {
      // Don't crash, but make this known
      console.warn(
        "Unable to get panel id from router state. This may affect the accessibility of this page. To fix this, make sure your Tabs and Tabpanel are inside a react-router-dom Router component."
      );
    }

    // If there are no focusable children, the tabindex should be 0
    const hasFocusableChild = useMemo(() => {
      const findFocusableChild = (
        childArray: ChildArray
      ): ReactNode | undefined =>
        childArray.find((child) => {
          if (isValidElement(child)) {
            if ("focus" in child) {
              return true;
            } else if ("children" in child) {
              const grandchildren = Children.toArray(child.children);
              return findFocusableChild(grandchildren);
            }
          }
          return false;
        });
      const iterableChildren = Children.toArray(children);
      return !!findFocusableChild(iterableChildren);
    }, [children]);

    return (
      <div
        aria-labelledby={tabPrefix + rrtId}
        id={panelPrefix + rrtId}
        ref={outsideTabPanelRef}
        role="tabpanel"
        tabIndex={hasFocusableChild ? -1 : 0}
        {...props}
      >
        {children}
      </div>
    );
  }
);
