export const ROUTE_SLUG_OPTIONS = {
  replacement: "-",
  lower: true,
  strict: true,
  trim: true,
};

export const uniqueTabRoute = (
  currentEntry: string,
  mappedRoutes: string[]
): string => {
  let uniqueCurrentEntry = currentEntry;
  let tabNumber = 1; // use letters?
  while (
    mappedRoutes.some((existingRoute) => existingRoute === uniqueCurrentEntry)
  ) {
    uniqueCurrentEntry = currentEntry + `-${tabNumber}`;
    tabNumber++;
  }
  return uniqueCurrentEntry;
};
