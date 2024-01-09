import axios from 'axios';
import qs from 'query-string';

import { SysDict } from './sysDict';

export interface SysDictData {
  id: string;
  sort?: number;
  label: string;
  value: string;
  type: string;
  remark?: string;
  extra?: string;
  status: string;
  sysDict?: SysDict;
}

export interface SysDictDataListSearch {
  type?: string;
  q?: string;
  status?: string;
  pagination?: boolean;
}

export interface SysDictDataParams extends Partial<SysDictDataListSearch> {
  current?: number;
  pageSize?: number;
}

const baseApi = '/fdapi/sys-dict-data';

export function querySysDictData(params: Partial<SysDictDataParams>) {
  return axios.get(baseApi, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function querySysDictDataDetail(id: string) {
  return axios.get(`${baseApi}/${id}`);
}

export function updateSysDictData(id: string, data: Partial<SysDictData>) {
  return axios.put(`${baseApi}/${id}`, data);
}

export function createSysDictData(data: Partial<SysDictData>) {
  return axios.post(baseApi, data);
}
