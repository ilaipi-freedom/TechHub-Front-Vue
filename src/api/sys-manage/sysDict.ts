import qs from 'query-string';
import axios from 'axios';

export interface SysDict {
  id: string;
  name: string;
  type: string;
  status: string;
  category: string;
  remark: string;
}

export interface SysDictListSearch {
  q?: string;
  status?: string;
}

export interface SysDictParams extends Partial<SysDictListSearch> {
  current: number;
  pageSize: number;
}

const baseApi = '/fdapi/sys-dict';

export function querySysDictList(params: SysDictParams) {
  return axios.get(baseApi, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function querySysDictDetail(id: string) {
  return axios.get(`${baseApi}/${id}`);
}

export function updateSysDict(id: string, data: Partial<SysDict>) {
  return axios.put(`${baseApi}/${id}`, data);
}

export function createSysDict(data: Partial<SysDict>) {
  return axios.post(baseApi, data);
}
