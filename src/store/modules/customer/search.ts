import { defineStore } from 'pinia';

import { CustomerSearchState } from './types';

const useCustomerSearchStore = defineStore('customerSearch', {
  state: (): Partial<CustomerSearchState> => ({
    current: 1,
    pageSize: 20,
  }),

  getters: {},

  actions: {
    updateSearch(params: Partial<CustomerSearchState>) {
      this.$patch(params);
    },
  },
});

export default useCustomerSearchStore;
