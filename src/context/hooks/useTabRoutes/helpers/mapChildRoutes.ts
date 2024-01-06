import { MutableRefObject } from "react";

export const mapChildRoutes = (
  childTabs: MutableRefObject<HTMLLIElement[]>
): string[] => {
  return childTabs.current.map((_, index: number) => `tab-${index + 1}`);
};
