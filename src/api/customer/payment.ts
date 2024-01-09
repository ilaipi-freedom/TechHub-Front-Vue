import axios from 'axios';

import PaymentMethod from '@/types/PaymentType';

export interface CustomerPayment {
  id: string;
  payTime: string;
  amount: string;
  order?: string;
  payMethod: PaymentMethod;
  extra: string;
  customerId?: string;
  accountId?: string;
  projectId?: string;
}

export interface CustomerPaymentListSearch {
  q?: string;
  customerId?: string;
  date?: string[];
}

export interface CustomerPaymentParams
  extends Partial<CustomerPaymentListSearch> {
  current?: number;
  pageSize?: number;
  isAll?: boolean;
}

export function queryCustomerPaymentList(params: CustomerPaymentParams) {
  return axios.get('/fdapi/customer-payment/list', { params });
}

export function updateCustomerPayment(payload: Partial<CustomerPayment>) {
  return axios.put(`/fdapi/customer-payment/${payload.id}`, payload);
}

export function createCustomerPayment(payload: Partial<CustomerPayment>) {
  return axios.post(`/fdapi/customer-payment`, payload);
}
