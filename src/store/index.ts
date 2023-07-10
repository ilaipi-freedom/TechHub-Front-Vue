import { createPinia } from 'pinia';
import useAppStore from './modules/app';
import useUserStore from './modules/user';
import useTabBarStore from './modules/tab-bar';
import useCustomerStore from './modules/customer';
import useCustomerSearchStore from './modules/customer/search';

const pinia = createPinia();

export {
  useAppStore,
  useUserStore,
  useTabBarStore,
  useCustomerStore,
  useCustomerSearchStore,
};
export default pinia;
