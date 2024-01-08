import React from "react";
import { ButtonTabProps } from "./Tab.types";

export const ButtonTab = ({ children, label }: ButtonTabProps) => (
  <button className="tab__button" type="button">
    {children ?? label}
  </button>
);
