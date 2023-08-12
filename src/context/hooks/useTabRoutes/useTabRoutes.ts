import { PropsWithChildren, ReactNode, useMemo } from "react";
import { RoutingTabsProps } from "../../RoutingTabContext.types";
import { mapChildRoutes, mapConfigRoutes, mapDataRoutes } from "../../helpers";

export const useTabRoutes = <T>({
  children,
  config,
  data,
  tabLabelKey,
}: PropsWithChildren<RoutingTabsProps<T>>): string[] => {
  const tabRoutes = useMemo(() => {
    let mappedRoutes: string[] = [];
    if (Array.isArray(config)) {
      mappedRoutes = mapConfigRoutes(config);
    }

    if (Array.isArray(data)) {
      mappedRoutes = mapDataRoutes(data, tabLabelKey);
    }

    return mappedRoutes.length > 0 ? mappedRoutes : mapChildRoutes();
  }, [config, data]);

  return tabRoutes;
};
