import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "./styles/tabpanelWindow.css";
interface TabPanelWindowProps {
  children?: ReactNode;
  isOutlet?: boolean;
}

export const TabPanelWindow = ({
  children,
  isOutlet = false,
}: TabPanelWindowProps) => {
  return (
    <div className="tabpanelWindow">
      {isOutlet ? <Outlet /> : null}

      {children}
    </div>
  );
};
