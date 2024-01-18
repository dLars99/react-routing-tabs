import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

interface TabPanelWindowProps {
  children: ReactNode;
}

export const TabPanelWindow = ({ children }: TabPanelWindowProps) => {
  return (
    <div>
      <Outlet />

      {children}
    </div>
  );
};
