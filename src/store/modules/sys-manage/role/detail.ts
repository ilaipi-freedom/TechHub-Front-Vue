import { defineStore } from 'pinia';

import { RoleDetailState } from './types';

const useRoleDetailStore = defineStore('roleDetail', {
  state: (): RoleDetailState => ({
    id: '',
    visible: false,
  }),

  getters: {
    isVisible(state: RoleDetailState): boolean {
      return state.visible;
    },
  },

  actions: {
    setId(id: string) {
      this.id = id;
    },
    toggleVisible() {
      this.visible = !this.visible;
    },
  },
});

export default useRoleDetailStore;
