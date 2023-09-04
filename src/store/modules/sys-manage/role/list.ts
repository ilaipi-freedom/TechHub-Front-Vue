import { defineStore } from 'pinia';

import { RoleSearchState } from './types';

const useRoleSearchStore = defineStore('roleSearch', {
  state: (): Partial<RoleSearchState> => ({
    q: '',
    status: '',
    current: 1,
    pageSize: 20,
  }),

  getters: {},

  actions: {
    updateSearch(params: Partial<RoleSearchState>) {
      this.$patch(params);
    },
  },
});

export default useRoleSearchStore;
