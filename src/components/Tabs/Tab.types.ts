import { ComponentPropsWithRef, MouseEvent, ReactNode } from "react";

export interface TabProps extends ComponentPropsWithRef<"a"> {
  /**
   * Use children for custom content
   */
  children?: ReactNode;
  /**
   * Is this tab disabled, preventing user interaction?
   */
  disabled?: boolean;
  /**
   * Is this part of a true nav component?
   */
  isNav?: boolean;
  /**
   * Display text for the tab
   */
  label: string;
  /**
   * Destination link for the tab
   */
  link?: string;
}

export interface AnchorTabProps extends TabProps {
  combinedRef: (node: HTMLAnchorElement) => void;
  id: string;
  tabId: string;
  isSelected: boolean;
  onClick: (e: MouseEvent) => void;
}
