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
 * track of the selection and routes.
 */
export const RoutingTabs = <T,>(
  props: PropsWithChildren<RoutingTabsProps<T>>
): JSX.Element | null => {
  const [selectedTabId, setSelectedTabId] = useState<string>("");
  const childTabs = useRef<HTMLLIElement[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  // const tabRoutes = useTabRoutes(props, childTabs);
  const tabRoutes: Record<string, string> = {
    id: "./abc",
  };

  const assignChildTab = useCallback(
    (node: HTMLLIElement): void => {
      const childTabIndex = childTabs.current.findIndex(
        (childTab: HTMLLIElement) => childTab?.id === node?.id
      );
      if (node && childTabIndex === -1) {
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
    if (Object.keys(tabRoutes).length < 1 || !location.pathname) return;
    const pathSegments = location.pathname.split(
      props.useHashRouting ? "#" : "/"
    );
    const finalPathSegment = pathSegments[pathSegments.length - 1];
    if (!tabRoutes[finalPathSegment]) {
      // no tab in route - go to selected tab
      // navigate(getNewLocation(tabRoutes[selectedTabId]), { replace: true });
    } else {
      // make sure our index matches the tab in the route
      const pathRouteId = tabRoutes[finalPathSegment];
      if (selectedTabId !== pathRouteId) {
        setSelectedTabId(pathRouteId);
      }
    }
  }, [location.pathname, tabRoutes, props.useHashRouting]);

  const changeTab = useCallback(
    (id: string): void => {
      setSelectedTabId(id);
      // navigate(getNewLocation(tabRoutes[newIndex]));
    },
    [getNewLocation, navigate, selectedTabId, tabRoutes]
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
        selectedTabId,
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
