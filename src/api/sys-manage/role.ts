import qs from 'query-string';
import axios from 'axios';

export interface Role {
  id: string;
  name: string;
  perm: string;
  route: string;
  status: string;
}

export interface RoleListSearch {
  q?: string;
  status?: string;
}

export interface RoleParams extends Partial<RoleListSearch> {
  current: number;
  pageSize: number;
}

const baseApi = '/fdapi/role';

export function queryRoleList(params: RoleParams) {
  return axios.get(baseApi, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function queryRoleDetail(id: string) {
  return axios.get(`${baseApi}/${id}`);
}

export function updateRole(id: string, data: Partial<Role>) {
  return axios.put(`${baseApi}/${id}`, data);
}

export function createRole(data: Partial<Role>) {
  return axios.post(baseApi, data);
}
