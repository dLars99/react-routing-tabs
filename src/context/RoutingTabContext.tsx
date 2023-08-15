import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useRef,
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
  childTabs: { current: [] },
  data: undefined,
  selectedTabIndex: 0,
};

const RoutingTabContext =
  createContext<RoutingTabContextValue<any>>(defaultValue);

/**
 * Component which wraps and defines the tab structure for the section.
 * Under the hood, this creates a context provider that allows the routing tabs to keep
 * track of the current selection and routes.
 */
export const RoutingTabs = <T,>(
  props: PropsWithChildren<RoutingTabsProps<T>>
): JSX.Element | null => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0);
  const childTabs = useRef<HTMLLIElement[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const tabRoutes = useTabRoutes(props, childTabs);

  // Get initial index from route
  useEffect(() => {
    if (tabRoutes.length < 1 || !location.pathname) return;
    const pathSegments = location.pathname.split("/"); // TODO: allow for hash nav
    const finalPathSegment = pathSegments[pathSegments.length - 1];
    if (!tabRoutes.includes(finalPathSegment)) {
      navigate(tabRoutes[0], { replace: true });
    } else {
      const pathRouteIndex = tabRoutes.findIndex(
        (route) => route === finalPathSegment
      );
      if (selectedTabIndex !== pathRouteIndex) {
        setSelectedTabIndex(pathRouteIndex);
      }
    }
  }, [location.pathname, tabRoutes]);

  const changeTab = (newIndex: number): void => {
    if (newIndex === selectedTabIndex) return;
    setSelectedTabIndex(newIndex);
    navigate(`../${tabRoutes[newIndex]}`); // TODO: allow for hash nav
  };

  // Optional -- this may fit better in the tab itself
  const changeRoute = (toPath: string): void => {
    navigate(toPath); // TODO: allow for hash nav
  };

  return (
    <RoutingTabContext.Provider
      value={{
        changeTab,
        changeRoute,
        childTabs,
        data: props.data,
        selectedTabIndex,
      }}
    >
      {props.children}
    </RoutingTabContext.Provider>
  );
};

console.log({ RoutingTabContext });
export const useRoutingTabs = <T,>() =>
  useContext<RoutingTabContextValue<T>>(RoutingTabContext);

// We might want both config AND data
// If so, add a 'useDataRoutes' prop (in options? config?) to use values from data

// Option 3: don't use those for routes. Just use value passed from 'to' in tab itself
// (how to update on initial load?)
