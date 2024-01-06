import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import {
  RoutingTabContextValue,
  RoutingTabsProps,
} from "./RoutingTabContext.types";
import { useTabRoutes } from "./hooks";

const RoutingTabContext = createContext<RoutingTabContextValue<any>>(null);

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

  const assignChildTab = useCallback(
    (node: HTMLLIElement): void => {
      const childTabIndex = childTabs.current.findIndex(
        (childTab) => childTab?.id === node?.id
      );
      if (childTabIndex === -1) {
        childTabs.current.push(node);
      }
    },
    [childTabs]
  );

  const getNewLocation = useCallback(
    (destination: string): string | Location =>
      props.useHashRouting
        ? {
            ...location,
            hash: destination,
          }
        : destination,
    [location, props.useHashRouting]
  );

  // Get initial index from route
  useEffect(() => {
    if (tabRoutes.length < 1 || !location.pathname) return;
    const pathSegments = location.pathname.split(
      props.useHashRouting ? "#" : "/"
    );
    const finalPathSegment = pathSegments[pathSegments.length - 1];
    if (!tabRoutes.includes(finalPathSegment)) {
      // no tab in route - go to selected tab
      navigate(getNewLocation(tabRoutes[selectedTabIndex]), { replace: true });
    } else {
      // make sure our index matches the tab in the route
      const pathRouteIndex = tabRoutes.findIndex(
        (route) => route === finalPathSegment
      );
      if (selectedTabIndex !== pathRouteIndex) {
        setSelectedTabIndex(pathRouteIndex);
      }
    }
  }, [location.pathname, tabRoutes, props.useHashRouting]);

  const changeTab = useCallback(
    (id: string): void => {
      const newIndex = childTabs.current.findIndex((tab) => tab.id === id);
      if (newIndex === selectedTabIndex) return;
      setSelectedTabIndex(newIndex);
      navigate(getNewLocation(tabRoutes[newIndex]));
    },
    [getNewLocation, navigate, selectedTabIndex, tabRoutes]
  );

  // Optional -- this may fit better in the tab itself
  const changeRoute = useCallback(
    (toPath: string): void => {
      navigate(getNewLocation(toPath));
    },
    [getNewLocation, navigate]
  );

  return (
    <RoutingTabContext.Provider
      value={{
        changeTab,
        changeRoute,
        childTabs,
        data: props.data,
        selectedTabIndex,
        tabRef: assignChildTab,
      }}
    >
      {props.children}
    </RoutingTabContext.Provider>
  );
};

export const useRoutingTabs = <T,>() =>
  useContext<RoutingTabContextValue<T>>(RoutingTabContext);

// We might want both config AND data
// If so, add a 'useDataRoutes' prop (in options? config?) to use values from data

// Option 3: don't use those for routes. Just use value passed from 'to' in tab itself
// (how to update on initial load?)
