import React, { PropsWithChildren } from "react";

export interface TabListProps {
  orientation?: "horizontal" | "vertical";
}
export const TabList = ({
  children,
  orientation = "horizontal",
}: PropsWithChildren<TabListProps>): JSX.Element => (
  <div role="tablist" aria-orientation={orientation}>
    {children}
  </div>
);
