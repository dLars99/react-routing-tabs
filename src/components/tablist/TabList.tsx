import React, {
  ComponentPropsWithRef,
  KeyboardEvent,
  PropsWithChildren,
  Ref,
  forwardRef,
  useState,
} from "react";
import { useRoutingTabs } from "../../context";
import { useKeyboardNavigation } from "./hooks";
import classNames from "classnames";
import "./styles/tablist.css";

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
 * Element which acts as a container for the tabs.
 * Renders as a `ul` tag and accepts an optional ref from the user
 */
export const TabList = forwardRef(
  (
    {
      "aria-label": ariaLabel = "tablist",
      children,
      className,
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

    const getKey = useKeyboardNavigation(orientation, childTabs);

    const [focusedTabIndex, setFocusedTabIndex] = useState<number>(0);

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = getKey(e.key, focusedTabIndex);
      console.log(e.key, key); // temporary for testing
      if (key.type === "no-action") return;

      e.preventDefault();
      e.stopPropagation();
      setFocusedTabIndex(key.value);
      const nextTab = childTabs[key.value];
      nextTab.focus();
      if (selectionMethod === "automatic" || key.type === "select")
        changeTab(nextTab.id);
    };

    return (
      <ul
        aria-label={ariaLabel}
        aria-orientation={orientation}
        className={classNames(
          "tablist",
          { tablist__horizontal: orientation === "horizontal" },
          { tablist__vertical: orientation === "vertical" },
          className ? { [className]: className } : ""
        )}
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
