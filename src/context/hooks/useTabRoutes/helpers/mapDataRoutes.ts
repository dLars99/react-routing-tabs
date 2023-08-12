import slugify from "slugify";
import { ROUTE_SLUG_OPTIONS, uniqueTabRoute } from "./utils";

export const mapDataRoutes = <T>(
  data: T[],
  tabLabelKey: keyof T | undefined
): string[] => {
  let mappedRoutes: string[] = [];
  const firstElement = data[0];
  if (typeof firstElement === "string" || typeof firstElement === "number") {
    // primitive array - make route directly from item
    mappedRoutes = data.reduce((cur: string[], item: T) => {
      const currentEntry = slugify(String(item), ROUTE_SLUG_OPTIONS);
      cur.push(uniqueTabRoute(currentEntry, cur));
      return cur;
    }, []);
  } else if (tabLabelKey) {
    // Object with key to use as name, indicated by user
    mappedRoutes = data.reduce((cur: string[], item: T) => {
      if (!item[tabLabelKey]) {
        throw new Error(
          "RoutingTabs data item missing property named by tabLabelKey"
        );
      }
      const currentEntry = slugify(
        String(item[tabLabelKey]),
        ROUTE_SLUG_OPTIONS
      );
      cur.push(uniqueTabRoute(currentEntry, cur));
      return cur;
    }, []);
  }
  return mappedRoutes;
};
