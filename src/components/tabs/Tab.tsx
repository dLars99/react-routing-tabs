import React from "react";

interface TabProps {
  /**
   * Is this part of a true nav component?
   */
  isNav?: boolean;
}

/**
 * Component for an individual tab within the tab list
 */
export const Tab = ({ isNav = false }: TabProps) => <h1>Hey there</h1>;
