import qs from 'query-string';
import axios from 'axios';

export interface Account {
  id: string;
  name: string;
  phone: string;
  username: string;
  password: string;
  roleId: string;
  status: string;
  companyId?: string;
}

export interface AccountListSearch {
  q?: string;
  status?: string;
  companyId?: string;
  date?: string[];
}

export interface AccountParams extends Partial<AccountListSearch> {
  current: number;
  pageSize: number;
}

const baseApi = '/fdapi/account';

export function queryAccountList(params: AccountParams) {
  return axios.get(baseApi, {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function queryAccountDetail(id: string) {
  return axios.get(`${baseApi}/${id}`);
}

export function updateAccount(id: string, data: Partial<Account>) {
  return axios.put(`${baseApi}/${id}`, data);
}

export function createAccount(data: Partial<Account>) {
  return axios.post(baseApi, data);
}

export function resetPassword(id: string, password: string) {
  return axios.put(`${baseApi}/resetPassword/${id}`, { password });
}
