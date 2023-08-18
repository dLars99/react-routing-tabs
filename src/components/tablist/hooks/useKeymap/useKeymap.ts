import { useRoutingTabs } from "../../../../context";
import { TabListProps } from "../../TabList";

type KeySelectionType = "change" | "select" | "no-action";
type KeySelection = {
  type: KeySelectionType;
  value: number;
};

export const useKeymap = (
  key: string,
  orientation: "horizontal" | "vertical"
): KeySelection => {
  const tabContext = useRoutingTabs();
  if (!tabContext)
    throw new Error("Missing or misplaced RoutingTabs component");
  const { childTabs, selectedTabIndex } = tabContext;
  const finalIndex = childTabs.current.length - 1;

  let value = selectedTabIndex;
  let type: KeySelectionType = "no-action";

  if (
    (orientation === "horizontal" && key === "ArrowRight") ||
    (orientation === "vertical" && key === "ArrowDown")
  ) {
    type = "change";
    value = Math.min(selectedTabIndex + 1, finalIndex);
  }

  if (
    (orientation === "horizontal" && key === "ArrowLeft") ||
    (orientation === "vertical" && key === "ArrowUp")
  ) {
    type = "change";
    value = Math.max(selectedTabIndex - 1, 0);
  }

  if (key === "Home") {
    type = "change";
    value = 0;
  }

  if (key === "End") {
    type = "change";
    value = finalIndex;
  }

  if (key === "Enter" || key === " ") {
    type = "select";
  }

  return { type, value };
};
