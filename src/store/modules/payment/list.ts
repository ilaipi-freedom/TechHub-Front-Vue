import { defineStore } from 'pinia';

import { CustomerPaymentSearchState } from './types';

const useCustomerPaymentSearchStore = defineStore('scoreStreamListSearch', {
  state: (): CustomerPaymentSearchState => ({
    q: '',
    date: [],
    current: 1,
    pageSize: 20,
  }),

  getters: {},

  actions: {
    updateSearch(params: Partial<CustomerPaymentSearchState>) {
      this.$patch(params);
    },
  },
});

export default useCustomerPaymentSearchStore;
