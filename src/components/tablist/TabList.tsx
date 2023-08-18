import React, {
  ComponentPropsWithRef,
  KeyboardEvent,
  PropsWithChildren,
  Ref,
  forwardRef,
} from "react";
import { useRoutingTabs } from "../../context";
import { useKeymap } from "./hooks";

export interface TabListProps extends ComponentPropsWithRef<"ul"> {
  /**
   * Which direction do the tabs read? Corresponds to the aria-orientation attribute
   */
  orientation?: "horizontal" | "vertical";
  /**
   * Will the tab open its corresponding panel when the user arrows to it, or
   * will the user be required to hit 'space' or 'enter'?
   */
  selectionMethod?: "automatic" | "manual";
}

/**
 * Element which acts as a container for the tabs
 * Renders as a <ul> tag and accepts an optional ref from the user
 */
export const TabList = forwardRef(
  (
    {
      children,
      orientation = "horizontal",
      selectionMethod = "automatic",
      ...rest
    }: PropsWithChildren<TabListProps>,
    outsideListRef?: Ref<HTMLUListElement>
  ): JSX.Element => {
    const tabListContextError =
      "TabList should be wrapped in a RoutingTabs component";
    const tabContext = useRoutingTabs();
    if (!tabContext) {
      console.error(tabListContextError);
      throw new Error(tabListContextError);
    }
    const { changeTab, childTabs } = tabContext;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = useKeymap(e.key, orientation);
      if (key.type === "no-action") return;
      childTabs.current[key.value].focus();
      if (selectionMethod === "automatic" || key.type === "select")
        changeTab(key.value);
    };

    return (
      <ul
        aria-label="PLACEHOLDER"
        aria-orientation={orientation}
        onKeyDown={handleKeyDown}
        ref={outsideListRef}
        role="tablist"
        {...rest}
      >
        {children}
      </ul>
    );
  }
);
