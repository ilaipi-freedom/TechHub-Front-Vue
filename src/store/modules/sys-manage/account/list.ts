import { defineStore } from 'pinia';

import { AccountSearchState } from './types';

const useAccountSearchStore = defineStore('accountSearch', {
  state: (): Partial<AccountSearchState> => ({
    q: '',
    status: '',
    companyId: '',
    date: [],
    current: 1,
    pageSize: 20,
  }),

  getters: {},

  actions: {
    updateSearch(params: Partial<AccountSearchState>) {
      this.$patch(params);
    },
  },
});

export default useAccountSearchStore;
