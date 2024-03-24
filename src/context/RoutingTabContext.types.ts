export type RoutingTabsConfig = {
  name: string;
  route?: string;
};

export interface RoutingTabsBaseProps {
  /**
   * When true, route as a URL hash instead of appending to the path directly
   */
  useHashRouting?: boolean;
}

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

export type RoutingTabsOptionalProps<T> =
  | RoutingTabsDataProps<T>
  | RoutingTabsConfigProps
  | RoutingTabsDefaultProps;

export type RoutingTabsProps<T> = RoutingTabsBaseProps &
  RoutingTabsOptionalProps<T>;

export type RoutingTabContextValue<T> = {
  changeRoute: (toPath: string) => void;
  changeTab: (id: string) => void;
  childTabs: HTMLAnchorElement[];
  config: RoutingTabsConfig[] | undefined;
  data: T[] | undefined;
  selectedTabId: string;
  tabLabelKey: keyof T | undefined;
  tabRef: (node: HTMLAnchorElement) => void;
  tabRoutes: string[];
  useHashRouting: boolean | undefined;
} | null;
