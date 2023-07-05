import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/customer',
  name: 'customer',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.customer',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'list',
      name: 'list',
      meta: {
        locale: 'menu.customer.list',
        requiresAuth: true,
        roles: ['*'],
      },
      component: () => import('@/views/customer/list/index.vue'),
    },
  ],
};

export default DASHBOARD;
