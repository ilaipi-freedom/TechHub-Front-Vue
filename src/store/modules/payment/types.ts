import { Pagination } from '@/types/global';

export interface CustomerPaymentSearchState extends Pagination {
  q?: string;
  date: string[];
}
