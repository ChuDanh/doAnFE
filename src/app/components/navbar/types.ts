export type TNavItem = {
  icon: string;
  title: string;
  path: string;
  roles?: string[];
  children?: TNavItem[];
};
