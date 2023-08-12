import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import {
  RoutingTabContextValue,
  RoutingTabsProps,
} from "./RoutingTabContext.types";

const defaultValue = {
  changeTab: () => {},
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
    <RoutingTabContext.Provider value={{ data, changeTab, selectedIndex }}>
      {children}
    </RoutingTabContext.Provider>
  );
};

export const useRoutingTabs = useContext(RoutingTabContext);
