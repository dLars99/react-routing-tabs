import { ReactNode } from "react";

interface TabBaseProps {
  /**
   * Use children for custom content
   */
  children?: ReactNode;
  /**
   * Display text for the tab
   */
  label: string;
  /**
   * Index for the tab within the tablist
   */
  tabIndex: number;
}

export type ButtonTabProps = TabBaseProps;

export interface AnchorTabProps extends TabBaseProps {
  /**
   * Is this part of a true nav component?
   */
  isNav: boolean;
  /**
   * Destination link for the tab
   */
  link: string;
}

export type TabProps = ButtonTabProps | AnchorTabProps;