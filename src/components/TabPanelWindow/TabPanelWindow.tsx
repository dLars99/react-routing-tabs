import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface TabPanelWindowProps {
  children?: ReactNode;
  isOutlet?: boolean;
}

export const TabPanelWindow = ({
  children,
  isOutlet = false,
}: TabPanelWindowProps) => {
  return (
    <div>
      {isOutlet ? <Outlet /> : null}

      {children}
    </div>
  );
};
