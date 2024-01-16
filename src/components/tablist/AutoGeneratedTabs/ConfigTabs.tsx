import React from "react";
import { Tab } from "../../tabs";
import { useRoutingTabs } from "../../../context";

export const ConfigTabs = () => {
  const tabContext = useRoutingTabs();
  if (!tabContext) {
    return null;
  }
  const { config } = tabContext;

  return config && config.length
    ? config.map((configItem) => (
        <Tab
          key={configItem.route}
          label={configItem.name}
          link={configItem.route}
        />
      ))
    : null;
};
