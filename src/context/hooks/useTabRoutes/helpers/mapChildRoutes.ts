export const mapChildRoutes = (childTabs: HTMLAnchorElement[]): string[] => {
  return childTabs.reduce(
    (childRoutes: string[], childTab: HTMLAnchorElement) => {
      const href = childTab.href || childTab.id;
      const nextRoutes = [...childRoutes, href];
      return nextRoutes;
    },
    []
  );
};
