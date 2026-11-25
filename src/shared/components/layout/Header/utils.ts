export const isActiveLink = (pathname: string, href: string): boolean => {
  if (pathname === href) return true;
  return false;
};
