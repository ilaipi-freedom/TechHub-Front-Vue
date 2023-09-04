import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useCustomerStore from './modules/customer';
import useCustomerSearchStore from './modules/customer/search';
import useAccountSearchStore from './modules/sys-manage/account/list';
import useAccountDetailStore from './modules/sys-manage/account/detail';
import useAccountResetStore from './modules/sys-manage/account/reset';
import useRoleDetailStore from './modules/sys-manage/role/detail';
import useRoleSearchStore from './modules/sys-manage/role/list';
import useSysDictDetailStore from './modules/sys-manage/sysDict/detail';
import useSysDictSearchStore from './modules/sys-manage/sysDict/list';
import useSysDictDataDetailStore from './modules/sys-manage/sysDictData/detail';
import useSysDictDataSearchStore from './modules/sys-manage/sysDictData/list';

const pinia = createPinia();

export {
  useAppStore,
  useUserStore,
  useTabBarStore,
  useCustomerStore,
  useCustomerSearchStore,
  useAccountDetailStore,
  useAccountSearchStore,
  useAccountResetStore,
  useRoleSearchStore,
  useRoleDetailStore,
  useSysDictSearchStore,
  useSysDictDetailStore,
  useSysDictDataSearchStore,
  useSysDictDataDetailStore,
};
export default pinia;
