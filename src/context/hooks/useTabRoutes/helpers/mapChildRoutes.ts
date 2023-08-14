// TODO: map children from correct data

import { MutableRefObject } from "react";

export const mapChildRoutes = (
  childTabs: MutableRefObject<HTMLLIElement[]>
): string[] => {
  return childTabs.current.map(
    (child: HTMLLIElement, index: number) => `tab-${index + 1}`
  );
};
