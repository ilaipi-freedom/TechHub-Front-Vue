import { defineStore } from 'pinia';

import { SysDictDataSearchState } from './types';

const useSysDictDataSearchStore = defineStore('sysDictDataSearch', {
  state: (): Partial<SysDictDataSearchState> => ({
    q: '',
    status: '',
    current: 1,
    pageSize: 20,
  }),

  getters: {},

  actions: {
    updateSearch(params: Partial<SysDictDataSearchState>) {
      this.$patch(params);
    },
  },
});

export default useSysDictDataSearchStore;
