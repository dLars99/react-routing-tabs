import { ComponentPropsWithRef, ReactNode } from "react";

interface TabBaseProps extends ComponentPropsWithRef<"li"> {
  /**
   * Use children for custom content
   */
  children?: ReactNode;
  /**
   * Is this tab disabled, preventing user interaction?
   */
  disabled?: boolean;
  /**
   * Display text for the tab
   */
  label: string;
}

export interface ButtonTabProps extends TabBaseProps {}

export interface AnchorTabProps extends TabBaseProps {
  /**
   * Is this part of a true nav component?
   */
  isNav?: boolean;
  /**
   * Destination link for the tab
   */
  link: string;
}

export type TabProps = ButtonTabProps | AnchorTabProps;
