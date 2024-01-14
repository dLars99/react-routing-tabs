export const mapChildRoutes = (childTabs: HTMLAnchorElement[]): string[] => {
  return childTabs.reduce(
    (
      childRoutes: string[],
      childTab: HTMLAnchorElement,
      _,
      allChildren: HTMLAnchorElement[]
    ) => {
      const hrefs = allChildren.map((anchor) => anchor.href);
      const fallbackRoute = hrefs.length === 0 ? [childTab.id] : [];
      const nextRoutes = [...childRoutes, ...hrefs, ...fallbackRoute];
      return nextRoutes;
    },
    []
  );
};
