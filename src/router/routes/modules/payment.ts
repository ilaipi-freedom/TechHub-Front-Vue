import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PAYMENT: AppRouteRecordRaw = {
  path: '/payment',
  name: 'payment',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.payment',
    requiresAuth: true,
    icon: 'icon-alipay-circle',
    order: 0,
  },
  children: [
    {
      path: 'list',
      name: 'PaymentList',
      meta: {
        locale: 'menu.payment.list',
        requiresAuth: true,
        roles: ['*'],
      },
      component: () => import('@/views/payment/index.vue'),
    },
  ],
};

export default PAYMENT;
