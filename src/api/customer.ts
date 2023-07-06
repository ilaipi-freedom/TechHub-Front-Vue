import axios from 'axios';
import qs from 'query-string';

export interface Customer {
  id: string;
  weixin: string;
  weixinId: string;
  xianyu: string;
  qq: string;
  qqNum: string;
  firstMessageTime: string;
}

export interface CustomerParams extends Partial<Customer> {
  current: number;
  pageSize: number;
}

export interface CustomerListRes {
  list: Customer[];
  total: number;
}

export function queryCustomerList(
  params: CustomerParams
): Promise<CustomerListRes> {
  return axios.get('/fdapi/customer/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function getCustomer(id: string): Promise<Customer> {
  return axios.get(`/fdapi/customer/${id}`);
}

export function updateCustomer(payload: Partial<Customer>) {
  return axios.put(`/fdapi/customer/${payload.id}`, payload);
}

export function createCustomer(payload: Partial<Customer>) {
  return axios.post(`/fdapi/customer`, payload);
}
