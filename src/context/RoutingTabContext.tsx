import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RoutingTabContextValue,
  RoutingTabsProps,
} from "./RoutingTabContext.types";
import { useTabRoutes } from "./hooks";

const defaultValue = {
  changeRoute: () => {},
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
  const location = useLocation();
  const tabRoutes = useTabRoutes(props);
  const { children, data } = props;

  // Get initial value from route
  useEffect(() => {
    if (tabRoutes.length < 1 || !location.pathname) return;
    const pathSegments = location.pathname.split("/");
    const finalPathSegment = pathSegments[pathSegments.length - 1];
    if (!tabRoutes.includes(finalPathSegment)) {
      navigate(tabRoutes[0], { replace: true });
    } else {
      const pathRouteIndex = tabRoutes.findIndex(
        (route) => route === finalPathSegment
      );
      if (selectedIndex !== pathRouteIndex) {
        setSelectedIndex(pathRouteIndex);
      }
    }
  }, [location.pathname, tabRoutes]);

  const changeTab = (newIndex: number): void => {
    if (newIndex === selectedIndex) return;
    setSelectedIndex(newIndex);
    navigate(`../${tabRoutes[newIndex]}`); // TODO: allow for hash nav
  };

  // Optional -- this may fit better in the tab itself
  const changeRoute = (toPath: string): void => {
    navigate(toPath); // TODO: allow for hash nav
  };

  return (
    <RoutingTabContext.Provider
      value={{ changeTab, changeRoute, data, selectedIndex }}
    >
      {children}
    </RoutingTabContext.Provider>
  );
};

export const useRoutingTabs = useContext(RoutingTabContext);

// We might want both config AND data
// If so, add a 'useDataRoutes' prop (in options? config?) to use values from data

// Option 3: don't use those for routes. Just use value passed from 'to' in tab itself
// (how to update on initial load?)
