import React, { FC } from "react";
import { Tab } from "../../tabs";
import { useRoutingTabs } from "../../../context";

export interface ConfigTabsProps {}

export const ConfigTabs: FC<ConfigTabsProps> = ({}) => {
  const tabContext = useRoutingTabs();
  if (!tabContext) {
    return null;
  }
  const { config } = tabContext;

  return config && config.length
    ? config.map((configItem) => (
        <Tab label={configItem.name} link={configItem.route} />
      ))
    : null;
};
