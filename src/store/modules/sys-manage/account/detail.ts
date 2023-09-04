import { defineStore } from 'pinia';

import { AccountDetailState } from './types';

const useAccountDetailStore = defineStore('accountDetail', {
  state: (): AccountDetailState => ({
    id: '',
    visible: false,
  }),

  getters: {
    isVisible(state: AccountDetailState): boolean {
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

export default useAccountDetailStore;
