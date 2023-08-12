import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type RoutingTabContextValue<T> = {
  data: T[] | undefined;
  selectedIndex: number;
};

type RoutingTabsConfig = {
  name: string;
  route?: string;
};

interface RoutingTabsDataProps<T> {
  config?: never;
  data: T[];
  tabLabelKey?: keyof T;
}

interface RoutingTabsConfigProps {
  config: RoutingTabsConfig;
  data?: never;
  tabLabelKey?: never;
}

export type RoutingTabsProps<T> =
  | RoutingTabsDataProps<T>
  | RoutingTabsConfigProps;

const defaultValue = {
  data: undefined,
  selectedIndex: 0,
};

const RoutingTabContext =
  createContext<RoutingTabContextValue<any>>(defaultValue);

export const RoutingTabs = <T,>({
  children,
  config,
  data,
  tabLabelKey,
}: PropsWithChildren<RoutingTabsProps<T>>): JSX.Element | null => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  // Create route map from config or data or default (tab0, tab1, etc)

  // Get initial value from route

  const changeTab = (newIndex: number): void => {
    setSelectedIndex(newIndex);
    // Update route
  };

  return (
    <RoutingTabContext.Provider value={{ data, selectedIndex }}>
      {children}
    </RoutingTabContext.Provider>
  );
  return null;
};

export const useRoutingTabs = useContext(RoutingTabContext);
