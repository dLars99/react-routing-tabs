import { RoutingTabContextValue } from "../context";

export const useContextError = <T>(
  component: String,
  routingTabContext: RoutingTabContextValue<T>
): void => {
  if (!routingTabContext) {
    const tabContextError = `${component} must be wrapped in a RoutingTabs component`;
    console.error(tabContextError);
    throw new Error(tabContextError);
  }
};
