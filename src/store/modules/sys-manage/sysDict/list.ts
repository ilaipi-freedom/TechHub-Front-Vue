import { defineStore } from 'pinia';

import { SysDictSearchState } from './types';

const useSysDictSearchStore = defineStore('sysDictSearch', {
  state: (): Partial<SysDictSearchState> => ({
    q: '',
    status: '',
    current: 1,
    pageSize: 20,
  }),

  getters: {},

  actions: {
    updateSearch(params: Partial<SysDictSearchState>) {
      this.$patch(params);
    },
  },
});

export default useSysDictSearchStore;
