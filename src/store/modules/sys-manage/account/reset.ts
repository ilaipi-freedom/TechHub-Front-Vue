import { defineStore } from 'pinia';

import { AccountResetState } from './types';

const useAccountResetStore = defineStore('accountReset', {
  state: (): AccountResetState => ({
    id: '',
    visible: false,
  }),

  getters: {
    isVisible(state: AccountResetState): boolean {
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

export default useAccountResetStore;
