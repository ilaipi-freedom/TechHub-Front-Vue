import axios from 'axios';

export interface CustomerRemark {
  id: string;
  title: string;
  content: string;
}

export function queryCustomerRemarkList(customerId: string) {
  return axios.get('/fdapi/customer-remark/list', { params: customerId });
}

export function updateCustomerRemark(payload: Partial<CustomerRemark>) {
  return axios.put(`/fdapi/customer-remark/${payload.id}`, payload);
}

export function createCustomerRemark(payload: Partial<CustomerRemark>) {
  return axios.post(`/fdapi/customer-remark`, payload);
}
