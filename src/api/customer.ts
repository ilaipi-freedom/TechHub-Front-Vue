import axios from 'axios';
import qs from 'query-string';

export interface Customer {
  id: string;
  weixin: string;
  weixinId: string;
  xianyu: string;
  xianyuId: string;
  qq: string;
  qqNum: string;
}

export interface CustomerParams extends Partial<Customer> {
  current: number;
  pageSize: number;
}

export interface CustomerListRes {
  list: Customer[];
  total: number;
}

export function queryCustomerList(params: CustomerParams) {
  return axios.get<CustomerListRes>('/fdapi/customer/list', {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}
