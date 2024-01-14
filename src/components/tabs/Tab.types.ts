import { ComponentPropsWithRef, MouseEvent, ReactNode } from "react";

interface TabBaseProps {
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

export interface ButtonTabBaseProps
  extends ComponentPropsWithRef<"button">,
    TabBaseProps {}

export interface AnchorTabBaseProps
  extends ComponentPropsWithRef<"a">,
    TabBaseProps {
  /**
   * Is this part of a true nav component?
   */
  isNav?: boolean;
  /**
   * Destination link for the tab
   */
  link: string;
}

export type TabProps = ButtonTabBaseProps | AnchorTabBaseProps;

export type ExtendedTabProps = {
  id: string;
  tabId: string;
  isSelected: boolean;
  onClick: (e: MouseEvent) => void;
};

export type AnchorCombinedRef = {
  combinedRef: (node: HTMLAnchorElement) => void;
};
export type ButtonCombinedRef = {
  combinedRef: (node: HTMLButtonElement) => void;
};

export type ButtonTabProps = ButtonTabBaseProps &
  ExtendedTabProps &
  ButtonCombinedRef;
export type AnchorTabProps = AnchorTabBaseProps &
  ExtendedTabProps &
  AnchorCombinedRef;
