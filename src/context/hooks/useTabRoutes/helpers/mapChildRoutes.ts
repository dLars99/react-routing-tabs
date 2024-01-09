export const mapChildRoutes = (childTabs: HTMLLIElement[]): string[] => {
  return childTabs.map((childTab) => childTab.id);
};
