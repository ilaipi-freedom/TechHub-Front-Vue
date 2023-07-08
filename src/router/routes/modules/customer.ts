import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/customer',
  name: 'customer',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.customer',
    requiresAuth: true,
    icon: 'icon-user',
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
        icon: 'icon-user-group',
      },
      component: () => import('@/views/customer/list/index.vue'),
    },
    {
      path: 'detail',
      name: 'detail',
      meta: {
        requiresAuth: true,
        roles: ['*'],
        hideInMenu: true,
      },
      component: () => import('@/views/customer/detail/index.vue'),
      children: [
        {
          path: ':id',
          name: 'detail',
          component: () => import('@/views/customer/detail/index.vue'),
        },
      ],
    },
  ],
};

export default DASHBOARD;
