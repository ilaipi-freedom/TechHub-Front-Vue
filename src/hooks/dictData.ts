import { ref } from 'vue';
import { keyBy } from 'lodash';

import { SysDictData, querySysDictData } from '@/api/sys-manage/sysDictData';

export default function useDictData(type: string) {
  const list = ref<SysDictData[]>([]);
  const map = ref<Record<string, SysDictData>>({});
  const fetch = async () => {
    const { data } = await querySysDictData({
      type,
      pagination: false,
    });
    list.value = data.list;
    map.value = keyBy(data.list, 'value');
  };
  fetch();
  return {
    list,
    map,
  };
}
