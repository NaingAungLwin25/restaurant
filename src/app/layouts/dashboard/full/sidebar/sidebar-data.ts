import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'Category',
    iconName: 'solar:tablet-line-duotone',
    route: '/admin/category',
  },
  {
    displayName: 'Products',
    iconName: 'solar:file-text-line-duotone',
    route: '/admin/products',
  },
  {
    displayName: 'Users',
    iconName: 'solar:file-text-line-duotone',
    route: '/admin/users',
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
