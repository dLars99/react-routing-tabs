import slugify from "slugify";
import { RoutingTabsConfig } from "../../../RoutingTabContext.types";
import { ROUTE_SLUG_OPTIONS, uniqueTabRoute } from "./utils";

export const mapConfigRoutes = (config: RoutingTabsConfig[]): string[] => {
  const mappedRoutes = config.reduce(
    (cur: string[], configEntry: RoutingTabsConfig) => {
      if (!configEntry.route && !configEntry.name) {
        throw new Error("Missing required properties in RoutingTabs config");
      }
      const currentEntry = configEntry.route
        ? slugify(configEntry.route, ROUTE_SLUG_OPTIONS)
        : slugify(configEntry.name, ROUTE_SLUG_OPTIONS);
      cur.push(uniqueTabRoute(currentEntry, cur));
      return cur;
    },
    []
  );
  return mappedRoutes;
};
