import axios from 'axios';

export interface CustomerProject {
  id: string;
  title: string;
  description: string;
  begin: string;
  end: string;
  content: string;
  extra: string;
  customer: string;
  account: string;
}

export function queryCustomerProjectList(customerId: string) {
  return axios.get('/fdapi/customer-project/list', { params: { customerId } });
}

export function updateCustomerProject(payload: Partial<CustomerProject>) {
  return axios.put(`/fdapi/customer-project/${payload.id}`, payload);
}

export function createCustomerProject(payload: Partial<CustomerProject>) {
  return axios.post(`/fdapi/customer-project`, payload);
}
