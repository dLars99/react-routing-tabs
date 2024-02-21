import React, {
  Children,
  ComponentProps,
  ForwardedRef,
  ReactNode,
  forwardRef,
  isValidElement,
  useMemo,
} from "react";
import { useRoutingTabs } from "../../context";
import { useLocation } from "react-router-dom";
import { panelPrefix, tabPrefix } from "../../utils";

export interface TabpanelProps extends ComponentProps<"div"> {
  children: ReactNode;
}

type ChildArray = Array<Exclude<ReactNode, boolean | null | undefined>>;

export const Tabpanel = forwardRef(
  (
    { children, ...props }: TabpanelProps,
    outsideTabPanelRef?: ForwardedRef<HTMLDivElement>
  ) => {
    const routingTabContext = useRoutingTabs();
    const tabContextError =
      "Tabpanels must be wrapped in a RoutingTabs component";
    if (!routingTabContext) {
      console.error(tabContextError);
      throw new Error(tabContextError);
    }

    const {
      state: { rrtId },
    } = useLocation();

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
