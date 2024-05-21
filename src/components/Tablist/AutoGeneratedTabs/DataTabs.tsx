import React from "react";
import { useRoutingTabs } from "../../../context";
import { Tab } from "../../Tabs";

export const DataTabs = <T,>() => {
  const tabContext = useRoutingTabs<T>();
  if (!tabContext) {
    return null;
  }
  const { data, tabLabelKey, tabRoutes } = tabContext;

  const dataIsPrimitive =
    data && (typeof data[0] === "string" || typeof data[0] === "number");
  const missingLabel =
    !tabLabelKey ||
    (!dataIsPrimitive &&
      data &&
      data.some((dataItem) => !dataItem[tabLabelKey]));
  if (missingLabel) {
    return null;
  }

  return data && data.length
    ? data.map((data, index) => (
        <Tab
          key={tabRoutes[index]}
          name={dataIsPrimitive ? String(data) : String(data[tabLabelKey])}
          route={tabRoutes[index]}
        />
      ))
    : null;
};
