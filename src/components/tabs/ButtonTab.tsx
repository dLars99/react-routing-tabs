import React from "react";
import { ButtonTabProps } from "./Tab.types";

export const ButtonTab = ({ children, disabled, label }: ButtonTabProps) => (
  <button className="tab__button" disabled={disabled} type="button">
    {children ?? label}
  </button>
);
