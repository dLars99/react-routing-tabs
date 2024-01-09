import { MutableRefObject, Ref } from "react";

type KeySelectionType = "change" | "select" | "no-action";
type KeySelection = {
  type: KeySelectionType;
  value: number;
};

type GetNewIndexFromKey = (key: string, currentIndex: number) => KeySelection;

const getNextAvailableTab = (
  currentIndex: number,
  startIndex: number,
  childTabs: any
): number => {
  let newIndex = startIndex;
  while (childTabs[newIndex]?.disabled && newIndex < childTabs.length) {
    newIndex++;
  }
  return newIndex > childTabs.length - 1 ? currentIndex : newIndex;
};

const getPreviousAvailableTab = (
  currentIndex: number,
  startIndex: number,
  childTabs: any
): number => {
  let newIndex = startIndex;
  while (childTabs[newIndex]?.disabled && newIndex > -1) {
    newIndex--;
  }
  return newIndex < 0 ? currentIndex : newIndex;
};

export const useKeyboardNavigation =
  (
    orientation: "horizontal" | "vertical",
    childTabs: HTMLLIElement[]
  ): GetNewIndexFromKey =>
  (key, currentIndex) => {
    const childTabElements = childTabs;
    let value = currentIndex;
    let type: KeySelectionType = "no-action";

    if (
      (orientation === "horizontal" && key === "ArrowRight") ||
      (orientation === "vertical" && key === "ArrowDown")
    ) {
      type = "change";
      value = getNextAvailableTab(
        currentIndex,
        currentIndex + 1,
        childTabElements
      );
    }

    if (
      (orientation === "horizontal" && key === "ArrowLeft") ||
      (orientation === "vertical" && key === "ArrowUp")
    ) {
      type = "change";
      value = getPreviousAvailableTab(
        currentIndex,
        currentIndex - 1,
        childTabElements
      );
    }

    if (key === "Home") {
      type = "change";
      value = getNextAvailableTab(currentIndex, 0, childTabElements);
    }

    if (key === "End") {
      type = "change";
      value = getPreviousAvailableTab(
        currentIndex,
        childTabElements.length - 1,
        childTabElements
      );
    }

    if (key === "Enter" || key === " ") {
      type = "select";
    }

    return { type, value };
  };
