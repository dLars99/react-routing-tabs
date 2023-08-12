export type RoutingTabsConfig = {
  name: string;
  route?: string;
};

export interface RoutingTabsDataProps<T> {
  config?: never;
  data: T[];
  tabLabelKey?: keyof T;
}

export interface RoutingTabsConfigProps {
  config: RoutingTabsConfig[];
  data?: never;
  tabLabelKey?: never;
}

export type RoutingTabsProps<T> =
  | RoutingTabsDataProps<T>
  | RoutingTabsConfigProps;

export type RoutingTabContextValue<T> = {
  data: T[] | undefined;
  changeTab: (newIndex: number) => void;
  selectedIndex: number;
};
