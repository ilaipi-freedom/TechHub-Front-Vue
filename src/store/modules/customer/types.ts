import { Pagination } from '@/types/global';

export interface CustomerSearchState extends Pagination {
  q: string;
  status: string;
  firstMessageTime: string[];
  orderTime: string[];
  deliveryTime: string[];
}

export interface CustomerState {
  customer: string;
}
