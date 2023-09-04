import { defineStore } from 'pinia';

import { SysDictDetailState } from './types';

const useSysDictDetailStore = defineStore('sysDictDetail', {
  state: (): SysDictDetailState => ({
    id: '',
    visible: false,
  }),

  getters: {
    isVisible(state: SysDictDetailState): boolean {
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

export default useSysDictDetailStore;
