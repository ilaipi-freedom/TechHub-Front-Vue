import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/sys',
  name: 'sys',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.sys',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
  },
  children: [
    {
      path: 'perm',
      name: 'perm',
      meta: {
        locale: 'menu.sys.perm',
        requiresAuth: true,
        roles: ['*'],
      },
      component: () => import('@/views/sys-manage/perm-manage/user/index.vue'),
      children: [
        {
          path: 'user',
          name: 'user',
          meta: {
            locale: 'menu.sys.perm.user',
            requiresAuth: true,
            roles: ['*'],
          },
          component: () =>
            import('@/views/sys-manage/perm-manage/user/index.vue'),
        },
      ],
    },
  ],
};

export default DASHBOARD;
