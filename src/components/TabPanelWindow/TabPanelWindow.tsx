import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "./styles/tabpanelWindow.css";

interface TabPanelWindowProps {
  children?: ReactNode;
}

export const TabPanelWindow = ({ children }: TabPanelWindowProps) => {
  return (
    <div className="tabpanelWindow">
      {<Outlet />}

      {children}
    </div>
  );
};
