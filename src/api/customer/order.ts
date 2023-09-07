import axios from 'axios';

import { OrderFrom, OrderStatus } from '@/types/OrderType';

export interface CustomerOrder {
  id: string;
  firstMessageTime: string;
  orderTime: string;
  deliveryTime: string;
  from: OrderFrom;
  status: OrderStatus;
  content: string;
  detail: string;
  extra: string;
  industry: string;
  industryDetail: string;
  repo: string;
  customerId?: string;
  accountId?: string;
  projectId?: string;
}

export function queryCustomerOrderList(customerId: string) {
  return axios.get('/fdapi/customer-order/list', { params: { customerId } });
}

export function updateCustomerOrder(payload: Partial<CustomerOrder>) {
  return axios.put(`/fdapi/customer-order/${payload.id}`, payload);
}

export function createCustomerOrder(payload: Partial<CustomerOrder>) {
  return axios.post(`/fdapi/customer-order`, payload);
}
