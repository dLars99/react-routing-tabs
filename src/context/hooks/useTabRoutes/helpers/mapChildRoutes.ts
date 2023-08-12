// TODO: map children from correct data

export const mapChildRoutes = (
  tabChildren: unknown[] = ["a", "b", "c"]
): string[] => {
  return tabChildren.map((child: unknown, index: number) => `tab-${index + 1}`);
};
