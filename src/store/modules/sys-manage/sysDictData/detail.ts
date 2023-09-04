import { defineStore } from 'pinia';

import { SysDictDataDetailState } from './types';

const useSysDictDataDetailStore = defineStore('sysDictDataDetail', {
  state: (): SysDictDataDetailState => ({
    id: '',
    visible: false,
  }),

  getters: {
    isVisible(state: SysDictDataDetailState): boolean {
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

export default useSysDictDataDetailStore;
