import React, {
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Location, useLocation, useNavigate } from "react-router-dom";
import {
  RoutingTabContextValue,
  RoutingTabsProps,
} from "./RoutingTabContext.types";
import { useTabRoutes } from "./hooks";
import { generateStableId, tabPrefix } from "../utils";

export const RoutingTabContext =
  createContext<RoutingTabContextValue<any>>(null);

/**
 * Component which wraps and defines the tab structure for the section.
 * Under the hood, this creates a context provider that allows the routing tabs to keep
 * track of the selection and routes.
 */
export const RoutingTabs = <T,>(
  props: PropsWithChildren<RoutingTabsProps<T>>
): JSX.Element | null => {
  const [selectedTabId, setSelectedTabId] = useState<string>("");
  const [childTabs, setChildTabs] = useState<HTMLAnchorElement[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const tabRoutes = useTabRoutes(props, childTabs);

  const assignChildTab = useCallback(
    (node: HTMLAnchorElement): void => {
      if (node && !node.id) {
        const id = generateStableId();
        node.id = tabPrefix + id;
        setChildTabs((currentTabs) => [...currentTabs, node]);
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

  // Get initial tab id from route
  useEffect(() => {
    if (tabRoutes.length < 1 || childTabs.length < 1 || !location.pathname)
      return;
    const pathSegments = location.pathname.split(
      props.useHashRouting ? "#" : "/"
    );
    // Go with 2nd-to-last segment if there's a trailing slash
    const finalPathSegment =
      pathSegments[pathSegments.length - 1] ||
      pathSegments[pathSegments.length - 2];

    const pathRouteIndex = tabRoutes.findIndex(
      (tabRoute) => finalPathSegment && tabRoute.includes(finalPathSegment)
    );
    if (pathRouteIndex === -1) {
      // no tab in route - go to selected tab or first tab
      changeRouteFromId(selectedTabId, true);
    } else {
      // make sure our index matches the tab in the route
      const pathRouteId = childTabs[pathRouteIndex]?.id;
      if (pathRouteId && selectedTabId !== pathRouteId) {
        setSelectedTabId(pathRouteId);
      }
    }
  }, [childTabs, location.pathname, tabRoutes, props.useHashRouting]);

  const changeTab = useCallback(
    (id: string): void => {
      setSelectedTabId(id);
      changeRouteFromId(id);
    },
    [childTabs, getNewLocation, navigate, tabRoutes]
  );

  const changeRouteFromId = useCallback(
    (id: string, replace = false): void => {
      const foundTabIndex = childTabs.findIndex(
        (childTab) => childTab.id === id
      );
      const newRouteIndex = foundTabIndex > -1 ? foundTabIndex : 0;
      const newId = id || childTabs[0].id;
      navigate(getNewLocation(tabRoutes[newRouteIndex]), {
        replace,
        state: {
          rrtId: newId.split("-")[1],
        },
      });
    },
    [childTabs, getNewLocation, navigate]
  );

  return (
    <RoutingTabContext.Provider
      value={{
        changeTab,
        changeRoute: changeRouteFromId,
        childTabs,
        config: props.config,
        data: props.data,
        selectedTabId,
        tabLabelKey: props.tabLabelKey,
        tabRef: assignChildTab,
        tabRoutes,
        useHashRouting: props.useHashRouting,
      }}
    >
      {props.children}
    </RoutingTabContext.Provider>
  );
};
