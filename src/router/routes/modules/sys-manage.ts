import { DEFAULT_LAYOUT, PAGE_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const SysManage: AppRouteRecordRaw = {
  path: '/sys-manage',
  name: 'SysManage',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.sys-manage',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 0,
  },
  children: [
    {
      path: 'account',
      name: 'account',
      component: () => import('@/views/sys-manage/account/list/index.vue'),
      meta: {
        locale: 'menu.sys-manage.account',
        requiresAuth: true,
        icon: 'icon-user',
        order: 0,
      },
    },
    {
      path: 'role',
      name: 'role',
      component: () => import('@/views/sys-manage/role/list/index.vue'),
      meta: {
        locale: 'menu.sys-manage.role',
        requiresAuth: true,
        icon: 'icon-idcard',
        order: 0,
      },
    },
    {
      path: 'sys-dict',
      name: 'sys-dict',
      component: PAGE_LAYOUT,
      meta: {
        locale: 'menu.sys-manage.dict',
        requiresAuth: true,
        icon: 'icon-code-block',
        order: 0,
      },
      children: [
        {
          path: 'dict',
          name: 'dict',
          component: () => import('@/views/sys-manage/dict/list/index.vue'),
          meta: {
            locale: 'menu.sys-manage.dict.list',
            requiresAuth: true,
            order: 0,
          },
        },
        {
          path: 'dict-data',
          name: 'dict-data',
          component: () =>
            import('@/views/sys-manage/dict-data/list/index.vue'),
          meta: {
            locale: 'menu.sys-manage.dict.data',
            requiresAuth: true,
            order: 0,
          },
        },
      ],
    },
    // {
    //   path: 'perm',
    //   name: 'perm',
    //   meta: {
    //     locale: 'menu.sys.perm',
    //     requiresAuth: true,
    //     roles: ['*'],
    //     icon: 'icon-safe',
    //   },
    //   component: () => import('@/views/sys-manage/perm-manage/user/index.vue'),
    //   children: [
    //     {
    //       path: 'user',
    //       name: 'user',
    //       meta: {
    //         locale: 'menu.sys.perm.user',
    //         requiresAuth: true,
    //         roles: ['*'],
    //         icon: 'icon-idcard',
    //       },
    //       component: () =>
    //         import('@/views/sys-manage/perm-manage/user/index.vue'),
    //     },
    //   ],
    // },
  ],
};

export default SysManage;
