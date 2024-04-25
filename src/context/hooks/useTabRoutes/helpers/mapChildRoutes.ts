export const mapChildRoutes = (childTabs: HTMLAnchorElement[]): string[] =>
  childTabs.map((childTab: HTMLAnchorElement) => {
    const href = childTab.attributes.getNamedItem("href");
    const path = href?.value || childTab.id;
    return path;
  });
