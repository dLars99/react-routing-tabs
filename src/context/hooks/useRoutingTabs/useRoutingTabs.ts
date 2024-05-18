import { useContext } from "react";
import { RoutingTabContextValue } from "../../RoutingTabContext.types";
import { RoutingTabContext } from "../../RoutingTabContext";

export const useRoutingTabs = <T>() =>
  useContext<RoutingTabContextValue<any>>(RoutingTabContext);
