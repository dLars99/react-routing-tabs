import React from "react";
import { ButtonTabProps } from "./Tab.types";
import { panelPrefix } from "../../utils";

export const ButtonTab = ({
  children,
  combinedRef,
  disabled,
  id,
  isSelected,
  label,
  onClick,
  tabId,
}: ButtonTabProps) => (
  <button
    aria-controls={panelPrefix + id}
    aria-selected={isSelected}
    className="tab__button"
    disabled={disabled}
    id={tabId}
    onClick={onClick}
    ref={combinedRef}
    role="tab"
    tabIndex={isSelected ? 0 : -1}
    type="button"
  >
    {children ?? label}
  </button>
);
