import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  RoutingTabContextValue,
  RoutingTabsProps,
} from "./RoutingTabContext.types";
import { useTabRoutes } from "./hooks";

const defaultValue = {
  changeTab: () => {},
  data: undefined,
  selectedIndex: 0,
};

const RoutingTabContext =
  createContext<RoutingTabContextValue<any>>(defaultValue);

export const RoutingTabs = <T,>(
  props: PropsWithChildren<RoutingTabsProps<T>>
): JSX.Element | null => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const navigate = useNavigate();
  const tabRoutes = useTabRoutes(props);
  const { children, data } = props;

  // Get initial value from route

  const changeTab = (newIndex: number): void => {
    setSelectedIndex(newIndex);
    navigate(`../${tabRoutes[newIndex]}`);
  };

  return (
    <RoutingTabContext.Provider value={{ data, changeTab, selectedIndex }}>
      {children}
    </RoutingTabContext.Provider>
  );
};

export const useRoutingTabs = useContext(RoutingTabContext);
