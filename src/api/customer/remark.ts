import axios from 'axios';
import qs from 'query-string';

export interface CustomerRemark {
  id: string;
  title: string;
  content: string;
  customerId?: string;
  accountId?: string;
  projectId?: string;
}

export function queryCustomerRemarkList(customerId: string) {
  return axios.get('/fdapi/customer-remark/list', {
    params: { customerId },
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export function updateCustomerRemark(payload: Partial<CustomerRemark>) {
  return axios.put(`/fdapi/customer-remark/${payload.id}`, payload);
}

export function createCustomerRemark(payload: Partial<CustomerRemark>) {
  return axios.post(`/fdapi/customer-remark`, payload);
}
