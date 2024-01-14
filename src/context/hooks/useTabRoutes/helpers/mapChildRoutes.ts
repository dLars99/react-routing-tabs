export const mapChildRoutes = (
  childTabs: (HTMLAnchorElement | HTMLButtonElement)[]
): string[] => {
  return childTabs.reduce(
    (
      childRoutes: string[],
      childTab: HTMLAnchorElement | HTMLButtonElement
    ) => {
      const anchorChildren = Array.from(childTab.children).filter(
        (child) => "href" in child
      );
      const hrefs = anchorChildren.map(
        (anchor) => (anchor as HTMLAnchorElement).href
      );
      const fallbackRoute = hrefs.length === 0 ? [childTab.id] : [];
      const nextRoutes = [...childRoutes, ...hrefs, ...fallbackRoute];
      return nextRoutes;
    },
    []
  );
};
