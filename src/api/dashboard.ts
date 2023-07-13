import axios from 'axios';
import type { TableData } from '@arco-design/web-vue/es/table/interface';

export interface ContentDataRecord {
  month: string;
  totalAmount: number;
}

export function queryContentData() {
  return axios.get<ContentDataRecord[]>(
    '/fdapi/customer-payment/sumAmountByMonth'
  );
}

export interface PopularRecord {
  key: number;
  clickNumber: string;
  title: string;
  increases: number;
}

export function queryPopularList(params: { type: string }) {
  return axios.get<TableData[]>('/api/popular/list', { params });
}

export function groupByPeriod() {
  return axios.get('/fdapi/customer/statistics/groupByPeriod');
}
