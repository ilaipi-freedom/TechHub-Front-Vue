import axios from 'axios';

import PaymentMethod from '@/types/PaymentType';

export interface CustomerPayment {
  id: string;
  payTime: string;
  amount: string;
  order?: string;
  payMethod: PaymentMethod;
  extra: string;
  customer: string;
  account: string;
  project: string;
}

export function queryCustomerPaymentList(customerId: string) {
  return axios.get('/fdapi/customer-payment/list', { params: { customerId } });
}

export function updateCustomerPayment(payload: Partial<CustomerPayment>) {
  return axios.put(`/fdapi/customer-payment/${payload.id}`, payload);
}

export function createCustomerPayment(payload: Partial<CustomerPayment>) {
  return axios.post(`/fdapi/customer-payment`, payload);
}
