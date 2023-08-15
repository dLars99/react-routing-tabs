import { MutableRefObject } from "react";

export type RoutingTabsConfig = {
  name: string;
  route?: string;
};

export interface RoutingTabsDataProps<T> {
  /**
   * Optional configuration object to define the tab names and routes
   */
  config?: never;
  /**
   * Optional data array to be passed to each tab panel
   */
  data: T[];
  /**
   * If names / routes come directly from data, this prop defines the key holding that info.
   * Requires 'data'
   */
  tabLabelKey?: keyof T;
}

export interface RoutingTabsConfigProps {
  /**
   * Optional configuration object to define the tab names and routes
   */
  config: RoutingTabsConfig[];
  /**
   * Optional data array to be passed to each tab panel
   */
  data?: never;
  /**
   * If names / routes come directly from data, this prop defines the key holding that info.
   * Requires 'data'
   */
  tabLabelKey?: never;
}

export interface RoutingTabsDefaultProps {
  /**
   * Optional configuration object to define the tab names and routes
   */
  config?: never;
  /**
   * Optional data array to be passed to each tab panel
   */
  data?: never;
  /**
   * If names / routes come directly from data, this prop defines the key holding that info.
   * Requires 'data'
   */
  tabLabelKey?: never;
}

export type RoutingTabsProps<T> =
  | RoutingTabsDataProps<T>
  | RoutingTabsConfigProps
  | RoutingTabsDefaultProps;

export type RoutingTabContextValue<T> = {
  changeRoute: (toPath: string) => void;
  changeTab: (newIndex: number) => void;
  childTabs: MutableRefObject<HTMLLIElement[]>;
  data: T[] | undefined;
  selectedTabIndex: number;
} | null;
