import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'Products',
    iconName: 'solar:file-text-line-duotone',
    route: '/admin/products',
  },
  {
    displayName: 'Category',
    iconName: 'solar:tablet-line-duotone',
    route: '/admin/category',
  },
  {
    displayName: 'Login',
    iconName: 'solar:login-3-line-duotone',
    route: 'admin/auth/login',
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: 'admin/auth/register',
  },
];
