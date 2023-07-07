import axios from 'axios';

import PaymentMethod from '@/types/PaymentType';

export interface CustomerPayment {
  id: string;
  payTime: string;
  amount: number;
  consumerId: string;
  accountId: string;
  orderId?: string;
  payMethod: PaymentMethod;
  extra: string;
}

export function queryCustomerPaymentList(customerId: string) {
  return axios.get('/fdapi/customer-payment/list', { params: customerId });
}

export function updateCustomerPayment(payload: Partial<CustomerPayment>) {
  return axios.put(`/fdapi/customer-payment/${payload.id}`, payload);
}

export function createCustomerPayment(payload: Partial<CustomerPayment>) {
  return axios.post(`/fdapi/customer-payment`, payload);
}
