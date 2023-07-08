import { defineStore } from 'pinia';

import { CustomerState } from './types';

const useCustomerStore = defineStore('customer', {
  state: (): CustomerState => ({ customer: '' }),

  getters: {
    customerId(state: CustomerState): string {
      return state.customer as string;
    },
  },

  actions: {
    updateCustomerId(id: string) {
      this.customer = id;
    },
  },
});

export default useCustomerStore;
